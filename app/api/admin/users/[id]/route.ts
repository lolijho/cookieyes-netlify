import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../../db';
import { AuthManager } from '../../../../../lib/auth';
import bcrypt from 'bcryptjs';

// GET /api/admin/users/[id] - Ottieni dettagli utente specifico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verifica che l'utente sia amministratore
    const admin = await AuthManager.getAuthenticatedUser(request);
    if (!admin || !AuthManager.isAdmin(admin)) {
      return NextResponse.json(
        { error: 'Accesso amministratore richiesto' },
        { status: 403 }
      );
    }

    const userId = params.id;

    // Query per ottenere dettagli completi utente
    const userResult = await db.execute({
      sql: `
        SELECT 
          u.*,
          p.display_name as plan_name,
          p.max_projects,
          p.price as plan_price,
          (SELECT COUNT(*) FROM projects WHERE user_id = u.id AND is_active = 1) as active_projects,
          (SELECT COUNT(*) FROM consents c JOIN projects pr ON c.project_id = pr.id WHERE pr.user_id = u.id) as total_consents,
          (SELECT COUNT(*) FROM sessions WHERE user_id = u.id AND expires_at > ?) as active_sessions
        FROM users u
        LEFT JOIN plans p ON u.plan_id = p.id
        WHERE u.id = ?
      `,
      args: [new Date().toISOString(), userId]
    });

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Utente non trovato' },
        { status: 404 }
      );
    }

    const user = userResult.rows[0] as any;

    // Ottieni progetti dell'utente
    const projectsResult = await db.execute({
      sql: 'SELECT id, name, domain, created_at, total_views, total_consents FROM projects WHERE user_id = ? ORDER BY created_at DESC',
      args: [userId]
    });

    // Ottieni audit log recente per questo utente
    const auditResult = await db.execute({
      sql: 'SELECT * FROM audit_logs WHERE user_id = ? ORDER BY created_at DESC LIMIT 10',
      args: [userId]
    });

    const userDetails = {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      company: user.company,
      role: user.role,
      planId: user.plan_id,
      planName: user.plan_name,
      maxProjects: user.max_projects,
      planPrice: user.plan_price,
      isActive: Boolean(user.is_active),
      emailVerified: Boolean(user.email_verified),
      lastLogin: user.last_login,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      projectsUsed: user.projects_used || 0,
      activeProjects: user.active_projects || 0,
      apiCallsThisMonth: user.api_calls_this_month || 0,
      totalConsents: user.total_consents || 0,
      activeSessions: user.active_sessions || 0,
      createdBy: user.created_by,
      notes: user.notes,
      projects: projectsResult.rows,
      recentActivity: auditResult.rows
    };

    return NextResponse.json(userDetails);

  } catch (error) {
    console.error('❌ Errore ottenimento dettagli utente:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/users/[id] - Aggiorna utente
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verifica che l'utente sia amministratore
    const admin = await AuthManager.getAuthenticatedUser(request);
    if (!admin || !AuthManager.isAdmin(admin)) {
      return NextResponse.json(
        { error: 'Accesso amministratore richiesto' },
        { status: 403 }
      );
    }

    const userId = params.id;
    const body = await request.json();
    const { 
      firstName, 
      lastName, 
      company, 
      planId, 
      isActive, 
      emailVerified, 
      notes,
      newPassword 
    } = body;

    console.log('👑 Admin aggiorna utente:', userId);

    // Verifica che l'utente esista
    const existingUser = await db.execute({
      sql: 'SELECT id, email FROM users WHERE id = ?',
      args: [userId]
    });

    if (existingUser.rows.length === 0) {
      return NextResponse.json(
        { error: 'Utente non trovato' },
        { status: 404 }
      );
    }

    const user = existingUser.rows[0] as any;

    // Costruisci query di aggiornamento dinamica
    const updates: string[] = [];
    const values: any[] = [];

    if (firstName !== undefined) {
      updates.push('first_name = ?');
      values.push(firstName || null);
    }

    if (lastName !== undefined) {
      updates.push('last_name = ?');
      values.push(lastName || null);
    }

    if (company !== undefined) {
      updates.push('company = ?');
      values.push(company || null);
    }

    if (planId !== undefined) {
      // Verifica che il piano esista
      const planResult = await db.execute({
        sql: 'SELECT id FROM plans WHERE id = ? AND is_active = 1',
        args: [planId]
      });

      if (planResult.rows.length === 0) {
        return NextResponse.json(
          { error: 'Piano non valido' },
          { status: 400 }
        );
      }

      updates.push('plan_id = ?');
      values.push(planId);
    }

    if (isActive !== undefined) {
      updates.push('is_active = ?');
      values.push(isActive ? 1 : 0);
    }

    if (emailVerified !== undefined) {
      updates.push('email_verified = ?');
      values.push(emailVerified ? 1 : 0);
    }

    if (notes !== undefined) {
      updates.push('notes = ?');
      values.push(notes || null);
    }

    if (newPassword) {
      const passwordHash = await bcrypt.hash(newPassword, 10);
      updates.push('password_hash = ?');
      values.push(passwordHash);
    }

    // Aggiungi sempre updated_at
    updates.push('updated_at = ?');
    values.push(new Date().toISOString());

    if (updates.length === 1) { // Solo updated_at
      return NextResponse.json(
        { error: 'Nessun campo da aggiornare' },
        { status: 400 }
      );
    }

    // Esegui aggiornamento
    values.push(userId);
    await db.execute({
      sql: `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      args: values
    });

    // Se l'utente è stato disattivato, elimina le sue sessioni
    if (isActive === false) {
      await db.execute({
        sql: 'DELETE FROM sessions WHERE user_id = ?',
        args: [userId]
      });
    }

    // Log dell'azione
    await db.execute({
      sql: `INSERT INTO audit_logs (user_id, action, resource, resource_id, details, ip_address, user_agent, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        admin.id,
        'update_user',
        'user',
        userId,
        JSON.stringify({ 
          updatedFields: Object.keys(body),
          targetUser: user.email,
          updatedBy: admin.email 
        }),
        request.headers.get('x-forwarded-for') || 'unknown',
        request.headers.get('user-agent') || 'unknown',
        new Date().toISOString()
      ]
    });

    console.log('✅ Utente aggiornato con successo:', userId);

    return NextResponse.json({
      success: true,
      message: 'Utente aggiornato con successo'
    });

  } catch (error) {
    console.error('❌ Errore aggiornamento utente:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users/[id] - Elimina utente
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verifica che l'utente sia amministratore
    const admin = await AuthManager.getAuthenticatedUser(request);
    if (!admin || !AuthManager.isAdmin(admin)) {
      return NextResponse.json(
        { error: 'Accesso amministratore richiesto' },
        { status: 403 }
      );
    }

    const userId = params.id;

    console.log('👑 Admin elimina utente:', userId);

    // Verifica che l'utente esista e non sia admin
    const userResult = await db.execute({
      sql: 'SELECT id, email, role FROM users WHERE id = ?',
      args: [userId]
    });

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Utente non trovato' },
        { status: 404 }
      );
    }

    const user = userResult.rows[0] as any;

    // Non permettere di eliminare amministratori
    if (user.role === 'admin') {
      return NextResponse.json(
        { error: 'Non è possibile eliminare un amministratore' },
        { status: 400 }
      );
    }

    // Non permettere di eliminare se stesso
    if (userId === admin.id) {
      return NextResponse.json(
        { error: 'Non è possibile eliminare il proprio account' },
        { status: 400 }
      );
    }

    // Log dell'azione prima dell'eliminazione
    await db.execute({
      sql: `INSERT INTO audit_logs (user_id, action, resource, resource_id, details, ip_address, user_agent, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        admin.id,
        'delete_user',
        'user',
        userId,
        JSON.stringify({ 
          deletedUser: user.email,
          deletedBy: admin.email,
          reason: 'Admin deletion'
        }),
        request.headers.get('x-forwarded-for') || 'unknown',
        request.headers.get('user-agent') || 'unknown',
        new Date().toISOString()
      ]
    });

    // Elimina utente (cascade eliminerà automaticamente progetti, sessioni, ecc.)
    await db.execute({
      sql: 'DELETE FROM users WHERE id = ?',
      args: [userId]
    });

    console.log('✅ Utente eliminato con successo:', user.email);

    return NextResponse.json({
      success: true,
      message: 'Utente eliminato con successo'
    });

  } catch (error) {
    console.error('❌ Errore eliminazione utente:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
} 