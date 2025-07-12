import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../db';
import { v4 as uuidv4 } from 'uuid';

// GET - Ottieni tutti i piani
export async function GET(request: NextRequest) {
  try {
    const plansResult = await db.execute({
      sql: 'SELECT * FROM plans WHERE is_active = 1 ORDER BY price ASC',
      args: []
    });

    const plans = plansResult.rows.map(plan => {
      // Parse delle features se è una stringa JSON
      let features = [];
      try {
        if (plan.features && typeof plan.features === 'string') {
          features = JSON.parse(plan.features);
        }
      } catch (e) {
        console.warn('Errore parsing features piano:', e);
      }

      return {
        id: plan.id,
        name: plan.name,
        display_name: plan.display_name,
        max_projects: plan.max_projects,
        price: plan.price,
        currency: plan.currency || 'EUR',
        features: features,
        is_active: Boolean(plan.is_active),
        created_at: plan.created_at,
        updated_at: plan.updated_at
      };
    });

    return NextResponse.json(plans);

  } catch (error) {
    console.error('Errore recupero piani:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

// POST - Crea nuovo piano (solo admin)
export async function POST(request: NextRequest) {
  try {
    // Verifica autenticazione admin
    const sessionId = request.cookies.get('session_id')?.value;
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Accesso non autorizzato' },
        { status: 401 }
      );
    }

    // Verifica che l'utente sia admin
    const sessionResult = await db.execute({
      sql: `
        SELECT u.role 
        FROM sessions s 
        JOIN users u ON s.user_id = u.id 
        WHERE s.id = ? AND s.expires_at > datetime('now')
      `,
      args: [sessionId]
    });

    if (sessionResult.rows.length === 0 || sessionResult.rows[0].role !== 'admin') {
      return NextResponse.json(
        { error: 'Accesso negato - Solo amministratori' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { 
      name, 
      display_name, 
      max_projects, 
      price, 
      currency = 'EUR', 
      features = [] 
    } = body;

    // Validazione
    if (!name || !display_name || max_projects === undefined || price === undefined) {
      return NextResponse.json(
        { error: 'Campi obbligatori mancanti: name, display_name, max_projects, price' },
        { status: 400 }
      );
    }

    // Verifica che il nome non esista già
    const existingPlan = await db.execute({
      sql: 'SELECT id FROM plans WHERE name = ?',
      args: [name]
    });

    if (existingPlan.rows.length > 0) {
      return NextResponse.json(
        { error: 'Un piano con questo nome esiste già' },
        { status: 400 }
      );
    }

    const planId = uuidv4();
    const now = new Date().toISOString();

    // Crea il nuovo piano
    await db.execute({
      sql: `
        INSERT INTO plans (
          id, name, display_name, max_projects, price, currency, features, 
          is_active, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        planId,
        name,
        display_name,
        max_projects,
        price,
        currency,
        JSON.stringify(features),
        1, // is_active
        now,
        now
      ]
    });

    // Log audit
    await db.execute({
      sql: `
        INSERT INTO audit_logs (user_id, action, resource, resource_id, details, created_at) 
        VALUES ((SELECT user_id FROM sessions WHERE id = ?), ?, ?, ?, ?, ?)
      `,
      args: [
        sessionId,
        'create_plan',
        'plans',
        planId,
        JSON.stringify({ name, display_name, max_projects, price }),
        now
      ]
    });

    return NextResponse.json({
      id: planId,
      name,
      display_name,
      max_projects,
      price,
      currency,
      features,
      is_active: true,
      created_at: now,
      updated_at: now
    }, { status: 201 });

  } catch (error) {
    console.error('Errore creazione piano:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
} 