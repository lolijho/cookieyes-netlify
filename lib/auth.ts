import { NextRequest } from 'next/server';
import { db, type User, type Session } from '../db';

export interface AuthenticatedUser extends Omit<User, 'password_hash'> {
  session: Session;
}

export class AuthManager {
  // Verifica se una sessione è valida
  static async validateSession(sessionId: string): Promise<AuthenticatedUser | null> {
    try {
      if (!sessionId) {
        return null;
      }

      // Query per ottenere sessione e utente
      const result = await db.execute({
        sql: `
          SELECT 
            s.*,
            u.id as user_id,
            u.email,
            u.first_name,
            u.last_name,
            u.company,
            u.role,
            u.plan_id,
            u.is_active,
            u.email_verified,
            u.last_login,
            u.created_at as user_created_at,
            u.updated_at as user_updated_at,
            u.projects_used,
            u.api_calls_this_month,
            u.last_api_reset,
            u.created_by,
            u.notes
          FROM sessions s
          JOIN users u ON s.user_id = u.id
          WHERE s.id = ? AND s.expires_at > ? AND u.is_active = 1
        `,
        args: [sessionId, new Date().toISOString()]
      });

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0] as any;

      const user: AuthenticatedUser = {
        id: row.user_id,
        email: row.email,
        first_name: row.first_name,
        last_name: row.last_name,
        company: row.company,
        role: row.role as 'admin' | 'client',
        plan_id: row.plan_id,
        is_active: Boolean(row.is_active),
        email_verified: Boolean(row.email_verified),
        last_login: row.last_login,
        created_at: row.user_created_at,
        updated_at: row.user_updated_at,
        projects_used: row.projects_used || 0,
        api_calls_this_month: row.api_calls_this_month || 0,
        last_api_reset: row.last_api_reset,
        created_by: row.created_by,
        notes: row.notes,
        session: {
          id: row.id,
          user_id: row.user_id,
          expires_at: row.expires_at,
          ip_address: row.ip_address,
          user_agent: row.user_agent,
          created_at: row.created_at
        }
      };

      return user;
    } catch (error) {
      console.error('❌ Errore validazione sessione:', error);
      return null;
    }
  }

  // Estrae utente autenticato dalla richiesta
  static async getAuthenticatedUser(request: NextRequest): Promise<AuthenticatedUser | null> {
    const sessionId = request.cookies.get('session_id')?.value;
    if (!sessionId) {
      return null;
    }

    return await this.validateSession(sessionId);
  }

  // Verifica se l'utente è amministratore
  static isAdmin(user: AuthenticatedUser | null): boolean {
    return user?.role === 'admin';
  }

  // Verifica se l'utente può accedere a un progetto specifico
  static async canAccessProject(user: AuthenticatedUser, projectId: string): Promise<boolean> {
    if (this.isAdmin(user)) {
      return true; // Gli admin possono accedere a tutti i progetti
    }

    try {
      const result = await db.execute({
        sql: 'SELECT id FROM projects WHERE id = ? AND user_id = ? AND is_active = 1',
        args: [projectId, user.id]
      });

      return result.rows.length > 0;
    } catch (error) {
      console.error('❌ Errore verifica accesso progetto:', error);
      return false;
    }
  }

  // Verifica se l'utente ha raggiunto il limite di progetti
  static async hasReachedProjectLimit(user: AuthenticatedUser): Promise<boolean> {
    if (this.isAdmin(user)) {
      return false; // Gli admin non hanno limiti
    }

    try {
      // Ottieni il piano dell'utente
      const planResult = await db.execute({
        sql: 'SELECT max_projects FROM plans WHERE id = ?',
        args: [user.plan_id]
      });

      if (planResult.rows.length === 0) {
        return true; // Se non ha un piano, non può creare progetti
      }

      const maxProjects = planResult.rows[0].max_projects as number;

      // Conta i progetti attivi dell'utente
      const projectsResult = await db.execute({
        sql: 'SELECT COUNT(*) as count FROM projects WHERE user_id = ? AND is_active = 1',
        args: [user.id]
      });

      const currentProjects = projectsResult.rows[0]?.count as number || 0;

      return currentProjects >= maxProjects;
    } catch (error) {
      console.error('❌ Errore verifica limite progetti:', error);
      return true; // In caso di errore, blocca la creazione
    }
  }

  // Pulisce sessioni scadute
  static async cleanExpiredSessions(): Promise<void> {
    try {
      await db.execute({
        sql: 'DELETE FROM sessions WHERE expires_at < ?',
        args: [new Date().toISOString()]
      });
      console.log('🧹 Sessioni scadute pulite');
    } catch (error) {
      console.error('❌ Errore pulizia sessioni:', error);
    }
  }

  // Ottieni statistiche utente per admin
  static async getUserStats(userId: string): Promise<any> {
    try {
      const [userResult, projectsResult, consentsResult] = await Promise.all([
        db.execute({
          sql: `
            SELECT u.*, p.display_name as plan_name, p.max_projects 
            FROM users u 
            LEFT JOIN plans p ON u.plan_id = p.id 
            WHERE u.id = ?
          `,
          args: [userId]
        }),
        db.execute({
          sql: 'SELECT COUNT(*) as count FROM projects WHERE user_id = ? AND is_active = 1',
          args: [userId]
        }),
        db.execute({
          sql: `
            SELECT COUNT(*) as count 
            FROM consents c 
            JOIN projects p ON c.project_id = p.id 
            WHERE p.user_id = ?
          `,
          args: [userId]
        })
      ]);

      if (userResult.rows.length === 0) {
        return null;
      }

      const user = userResult.rows[0] as any;
      const projectCount = projectsResult.rows[0]?.count as number || 0;
      const consentCount = consentsResult.rows[0]?.count as number || 0;

      return {
        ...user,
        project_count: projectCount,
        consent_count: consentCount
      };
    } catch (error) {
      console.error('❌ Errore ottenimento statistiche utente:', error);
      return null;
    }
  }
} 