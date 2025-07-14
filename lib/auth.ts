import { NextRequest } from 'next/server';
import { db, type User, type Session } from '../db';
import * as schema from '../schema';
import { eq, and, gt, lt, count } from 'drizzle-orm';

export interface AuthenticatedUser extends Omit<User, 'passwordHash'> {
  session: Session;
}

export class AuthManager {
  // Verifica se una sessione è valida
  static async validateSession(sessionId: string): Promise<AuthenticatedUser | null> {
    try {
      if (!sessionId) {
        return null;
      }

      // Query per ottenere sessione e utente con Drizzle ORM
      const result = await db
        .select({
          session: schema.sessions,
          user: schema.users,
        })
        .from(schema.sessions)
        .innerJoin(schema.users, eq(schema.sessions.userId, schema.users.id))
        .where(
          and(
            eq(schema.sessions.id, sessionId),
            gt(schema.sessions.expiresAt, new Date()),
            eq(schema.users.isActive, true)
          )
        )
        .limit(1);

      if (result.length === 0) {
        return null;
      }

      const { user, session } = result[0];

      // Rimuovi passwordHash dall'utente
      const { passwordHash, ...userWithoutPassword } = user;

      const authenticatedUser: AuthenticatedUser = {
        ...userWithoutPassword,
        session
      };

      return authenticatedUser;
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
      const result = await db
        .select()
        .from(schema.projects)
        .where(
          and(
            eq(schema.projects.id, projectId),
            eq(schema.projects.userId, user.id),
            eq(schema.projects.isActive, true)
          )
        )
        .limit(1);

      return result.length > 0;
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
      const planResult = await db
        .select({ maxProjects: schema.plans.maxProjects })
        .from(schema.plans)
        .where(eq(schema.plans.id, user.planId || ''))
        .limit(1);

      if (planResult.length === 0) {
        return true; // Se non ha un piano, non può creare progetti
      }

      const maxProjects = planResult[0].maxProjects;

      // Conta i progetti attivi dell'utente
      const projectsResult = await db
        .select({ count: count() })
        .from(schema.projects)
        .where(
          and(
            eq(schema.projects.userId, user.id),
            eq(schema.projects.isActive, true)
          )
        );

      const currentProjects = projectsResult[0]?.count || 0;

      return currentProjects >= maxProjects;
    } catch (error) {
      console.error('❌ Errore verifica limite progetti:', error);
      return true; // In caso di errore, blocca la creazione
    }
  }

  // Pulisce sessioni scadute
  static async cleanExpiredSessions(): Promise<void> {
    try {
      await db
        .delete(schema.sessions)
        .where(lt(schema.sessions.expiresAt, new Date()));
      
      console.log('🧹 Sessioni scadute pulite');
    } catch (error) {
      console.error('❌ Errore pulizia sessioni:', error);
    }
  }

  // Ottieni statistiche utente per admin
  static async getUserStats(userId: string): Promise<any> {
    try {
      // Ottieni utente con piano
      const userResult = await db
        .select({
          user: schema.users,
          planName: schema.plans.displayName,
          maxProjects: schema.plans.maxProjects,
        })
        .from(schema.users)
        .leftJoin(schema.plans, eq(schema.users.planId, schema.plans.id))
        .where(eq(schema.users.id, userId))
        .limit(1);

      if (userResult.length === 0) {
        return null;
      }

      // Conta progetti attivi
      const projectsResult = await db
        .select({ count: count() })
        .from(schema.projects)
        .where(
          and(
            eq(schema.projects.userId, userId),
            eq(schema.projects.isActive, true)
          )
        );

      // Conta consensi
      const consentsResult = await db
        .select({ count: count() })
        .from(schema.consents)
        .innerJoin(schema.projects, eq(schema.consents.projectId, schema.projects.id))
        .where(eq(schema.projects.userId, userId));

      const { user, planName, maxProjects } = userResult[0];
      const projectCount = projectsResult[0]?.count || 0;
      const consentCount = consentsResult[0]?.count || 0;

      // Rimuovi passwordHash
      const { passwordHash, ...userWithoutPassword } = user;

      return {
        ...userWithoutPassword,
        plan_name: planName,
        max_projects: maxProjects,
        project_count: projectCount,
        consent_count: consentCount
      };
    } catch (error) {
      console.error('❌ Errore ottenimento statistiche utente:', error);
      return null;
    }
  }
} 