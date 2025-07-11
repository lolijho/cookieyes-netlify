import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../db';
import { AuthManager } from '../../../../lib/auth';

// GET /api/admin/plans - Ottieni tutti i piani
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

    const plansResult = await db.execute(`
      SELECT 
        p.*,
        COUNT(u.id) as user_count,
        COUNT(CASE WHEN u.is_active = 1 THEN 1 END) as active_user_count
      FROM plans p
      LEFT JOIN users u ON p.id = u.plan_id
      GROUP BY p.id, p.name, p.display_name, p.max_projects, p.price, p.currency, p.features, p.is_active, p.created_at, p.updated_at
      ORDER BY p.price ASC
    `);

    const plans = plansResult.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      displayName: row.display_name,
      maxProjects: row.max_projects,
      price: row.price,
      currency: row.currency,
      features: row.features ? JSON.parse(row.features) : [],
      isActive: Boolean(row.is_active),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      userCount: row.user_count || 0,
      activeUserCount: row.active_user_count || 0
    }));

    return NextResponse.json({ plans });

  } catch (error) {
    console.error('❌ Errore ottenimento piani:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

// POST /api/admin/plans - Crea nuovo piano
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

    const body = await request.json();
    const { name, displayName, maxProjects, price, currency = 'EUR', features = [], isActive = true } = body;

    console.log('👑 Admin crea nuovo piano:', name);

    // Validazione
    if (!name || !displayName || typeof maxProjects !== 'number' || typeof price !== 'number') {
      return NextResponse.json(
        { error: 'Nome, nome visualizzato, max progetti e prezzo sono richiesti' },
        { status: 400 }
      );
    }

    // Verifica che il nome piano non esista già
    const existingPlan = await db.execute({
      sql: 'SELECT id FROM plans WHERE name = ?',
      args: [name.toLowerCase()]
    });

    if (existingPlan.rows.length > 0) {
      return NextResponse.json(
        { error: 'Nome piano già esistente' },
        { status: 400 }
      );
    }

    const planId = name.toLowerCase().replace(/[^a-z0-9]/g, '_');

    // Crea piano
    await db.execute({
      sql: `INSERT INTO plans (
        id, name, display_name, max_projects, price, currency, features, is_active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        planId,
        name.toLowerCase(),
        displayName,
        maxProjects,
        price,
        currency,
        JSON.stringify(features),
        isActive ? 1 : 0,
        new Date().toISOString(),
        new Date().toISOString()
      ]
    });

    // Log dell'azione
    await db.execute({
      sql: `INSERT INTO audit_logs (user_id, action, resource, resource_id, details, ip_address, user_agent, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        admin.id,
        'create_plan',
        'plan',
        planId,
        JSON.stringify({ 
          name, 
          displayName, 
          maxProjects, 
          price, 
          currency,
          createdBy: admin.email 
        }),
        request.headers.get('x-forwarded-for') || 'unknown',
        request.headers.get('user-agent') || 'unknown',
        new Date().toISOString()
      ]
    });

    console.log('✅ Piano creato con successo:', name);

    return NextResponse.json({
      success: true,
      planId,
      message: 'Piano creato con successo'
    }, { status: 201 });

  } catch (error) {
    console.error('❌ Errore creazione piano:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
} 