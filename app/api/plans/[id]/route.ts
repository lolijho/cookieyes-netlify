import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const planId = params.id;

    // Ottieni dettagli del piano
    const planResult = await db.execute({
      sql: 'SELECT * FROM plans WHERE id = ?',
      args: [planId]
    });

    if (planResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Piano non trovato' },
        { status: 404 }
      );
    }

    const plan = planResult.rows[0];

    // Parse delle features se è una stringa JSON
    let features = [];
    try {
      if (plan.features && typeof plan.features === 'string') {
        features = JSON.parse(plan.features);
      }
    } catch (e) {
      console.warn('Errore parsing features piano:', e);
    }

    return NextResponse.json({
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
    });

  } catch (error) {
    console.error('Errore recupero piano:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
} 