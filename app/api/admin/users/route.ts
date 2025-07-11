import { NextRequest, NextResponse } from 'next/server';
import { db, type CreateUserRequest } from '../../../../db';
import { AuthManager } from '../../../../lib/auth';
import bcrypt from 'bcryptjs';

// GET /api/admin/users - Lista tutti gli utenti
export async function GET(request: NextRequest) {
  try {
    // Verifica che l'utente sia amministratore
    const admin = await AuthManager.getAuthenticatedUser(request);
    if (!admin || !AuthManager.isAdmin(admin)) {
      return NextResponse.json(
        { error: 'Accesso amministratore richiesto' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';
    const planId = searchParams.get('plan') || '';

    let whereClause = 'WHERE 1=1';
    const queryParams: any[] = [];

    // Filtro ricerca
    if (search) {
      whereClause += ` AND (u.email LIKE ? OR u.first_name LIKE ? OR u.last_name LIKE ? OR u.company LIKE ?)`;
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    // Filtro ruolo
    if (role) {
      whereClause += ` AND u.role = ?`;
      queryParams.push(role);
    }

    // Filtro piano
    if (planId) {
      whereClause += ` AND u.plan_id = ?`;
      queryParams.push(planId);
    }

    // Query per ottenere gli utenti con informazioni piano
    const usersQuery = `
      SELECT 
        u.id,
        u.email,
        u.first_name,
        u.last_name,
        u.company,
        u.role,
        u.plan_id,
        u.is_active,
        u.email_verified,
        u.last_login,
        u.created_at,
        u.updated_at,
        u.projects_used,
        u.api_calls_this_month,
        u.created_by,
        u.notes,
        p.display_name as plan_name,
        p.max_projects,
        p.price as plan_price,
        (SELECT COUNT(*) FROM projects WHERE user_id = u.id AND is_active = 1) as active_projects,
        (SELECT COUNT(*) FROM consents c JOIN projects pr ON c.project_id = pr.id WHERE pr.user_id = u.id) as total_consents
      FROM users u
      LEFT JOIN plans p ON u.plan_id = p.id
      ${whereClause}
      ORDER BY u.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const offset = (page - 1) * limit;
    const usersResult = await db.execute({
      sql: usersQuery,
      args: [...queryParams, limit, offset]
    });

    // Query per contare il totale
    const countQuery = `SELECT COUNT(*) as total FROM users u ${whereClause}`;
    const countResult = await db.execute({
      sql: countQuery,
      args: queryParams
    });

    const total = countResult.rows[0]?.total as number || 0;
    const totalPages = Math.ceil(total / limit);

    const users = usersResult.rows.map((row: any) => ({
      id: row.id,
      email: row.email,
      firstName: row.first_name,
      lastName: row.last_name,
      company: row.company,
      role: row.role,
      planId: row.plan_id,
      planName: row.plan_name,
      maxProjects: row.max_projects,
      planPrice: row.plan_price,
      isActive: Boolean(row.is_active),
      emailVerified: Boolean(row.email_verified),
      lastLogin: row.last_login,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      projectsUsed: row.projects_used || 0,
      activeProjects: row.active_projects || 0,
      apiCallsThisMonth: row.api_calls_this_month || 0,
      totalConsents: row.total_consents || 0,
      createdBy: row.created_by,
      notes: row.notes
    }));

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages
      }
    });

  } catch (error) {
    console.error('❌ Errore ottenimento utenti:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

// POST /api/admin/users - Crea nuovo utente
export async function POST(request: NextRequest) {
  try {
    // Verifica che l'utente sia amministratore
    const admin = await AuthManager.getAuthenticatedUser(request);
    if (!admin || !AuthManager.isAdmin(admin)) {
      return NextResponse.json(
        { error: 'Accesso amministratore richiesto' },
        { status: 403 }
      );
    }

    const body: CreateUserRequest = await request.json();
    const { email, password, firstName, lastName, company, planId, notes } = body;

    console.log('👑 Admin crea nuovo utente:', email);

    // Validazione
    if (!email || !password || !planId) {
      return NextResponse.json(
        { error: 'Email, password e piano sono richiesti' },
        { status: 400 }
      );
    }

    // Verifica che l'email non esista già
    const existingUser = await db.execute({
      sql: 'SELECT id FROM users WHERE email = ?',
      args: [email.toLowerCase()]
    });

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'Email già esistente' },
        { status: 400 }
      );
    }

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

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);

    // Crea utente
    await db.execute({
      sql: `INSERT INTO users (
        id, email, password_hash, first_name, last_name, company, 
        role, plan_id, is_active, email_verified, created_by, notes, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        userId,
        email.toLowerCase(),
        passwordHash,
        firstName || null,
        lastName || null,
        company || null,
        'client',
        planId,
        1, // is_active
        0, // email_verified
        admin.id,
        notes || null,
        new Date().toISOString()
      ]
    });

    // Log dell'azione
    await db.execute({
      sql: `INSERT INTO audit_logs (user_id, action, resource, resource_id, details, ip_address, user_agent, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        admin.id,
        'create_user',
        'user',
        userId,
        JSON.stringify({ 
          email, 
          planId, 
          firstName, 
          lastName, 
          company,
          createdBy: admin.email 
        }),
        request.headers.get('x-forwarded-for') || 'unknown',
        request.headers.get('user-agent') || 'unknown',
        new Date().toISOString()
      ]
    });

    console.log('✅ Utente creato con successo:', email);

    return NextResponse.json({
      success: true,
      userId,
      message: 'Utente creato con successo'
    }, { status: 201 });

  } catch (error) {
    console.error('❌ Errore creazione utente:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
} 