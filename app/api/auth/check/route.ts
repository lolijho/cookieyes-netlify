import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../db';

export async function GET(request: NextRequest) {
  try {
    // Ottieni session ID dai cookie
    const sessionId = request.cookies.get('session_id')?.value;

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Nessuna sessione attiva' },
        { status: 401 }
      );
    }

    // Verifica la sessione nel database
    const sessionResult = await db.execute({
      sql: `
        SELECT s.*, u.* 
        FROM sessions s 
        JOIN users u ON s.user_id = u.id 
        WHERE s.id = ? AND s.expires_at > datetime('now')
      `,
      args: [sessionId]
    });

    if (sessionResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Sessione non valida o scaduta' },
        { status: 401 }
      );
    }

    const userData = sessionResult.rows[0];

    // Rimuovi password hash dalla risposta
    const { password_hash, ...user } = userData;

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        company: user.company,
        role: user.role,
        plan_id: user.plan_id,
        email_verified: Boolean(user.email_verified),
        projects_used: user.projects_used || 0,
        api_calls_this_month: user.api_calls_this_month || 0,
        last_login: user.last_login,
        created_at: user.created_at
      }
    });

  } catch (error) {
    console.error('Errore controllo autenticazione:', error);
    return NextResponse.json(
      { success: false, error: 'Errore interno del server' },
      { status: 500 }
    );
  }
} 