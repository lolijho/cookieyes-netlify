import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../db';

export async function POST(request: NextRequest) {
  try {
    // Ottieni session ID dai cookie
    const sessionId = request.cookies.get('session_id')?.value;

    if (!sessionId) {
      return NextResponse.json(
        { success: true, message: 'Nessuna sessione attiva' },
        { status: 200 }
      );
    }

    console.log('🔓 Logout per sessione:', sessionId);

    // Cerca la sessione nel database
    const sessionResult = await db.execute({
      sql: 'SELECT user_id FROM sessions WHERE id = ?',
      args: [sessionId]
    });

    let userId = null;
    if (sessionResult.rows.length > 0) {
      userId = sessionResult.rows[0].user_id as string;
    }

    // Elimina la sessione dal database
    await db.execute({
      sql: 'DELETE FROM sessions WHERE id = ?',
      args: [sessionId]
    });

    // Log logout
    if (userId) {
      await db.execute({
        sql: `INSERT INTO audit_logs (user_id, action, resource, details, ip_address, user_agent, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [
          userId,
          'logout',
          'auth',
          JSON.stringify({ session_id: sessionId }),
          request.headers.get('x-forwarded-for') || 'unknown',
          request.headers.get('user-agent') || 'unknown',
          new Date().toISOString()
        ]
      });
    }

    console.log('✅ Logout completato per sessione:', sessionId);

    // Crea risposta e rimuovi cookie
    const response = NextResponse.json({
      success: true,
      message: 'Logout effettuato con successo'
    });

    // Rimuovi cookie di sessione
    response.cookies.set('session_id', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(0) // Scade immediatamente
    });

    return response;

  } catch (error) {
    console.error('❌ Errore logout:', error);
    return NextResponse.json(
      { success: false, error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

// Endpoint per logout di tutte le sessioni di un utente
export async function DELETE(request: NextRequest) {
  try {
    // Ottieni session ID dai cookie
    const sessionId = request.cookies.get('session_id')?.value;

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Sessione non valida' },
        { status: 401 }
      );
    }

    // Trova l'utente dalla sessione corrente
    const sessionResult = await db.execute({
      sql: 'SELECT user_id FROM sessions WHERE id = ?',
      args: [sessionId]
    });

    if (sessionResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Sessione non valida' },
        { status: 401 }
      );
    }

    const userId = sessionResult.rows[0].user_id as string;

    console.log('🔓 Logout di tutte le sessioni per utente:', userId);

    // Elimina tutte le sessioni dell'utente
    await db.execute({
      sql: 'DELETE FROM sessions WHERE user_id = ?',
      args: [userId]
    });

    // Log logout globale
    await db.execute({
      sql: `INSERT INTO audit_logs (user_id, action, resource, details, ip_address, user_agent, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [
        userId,
        'logout_all',
        'auth',
        JSON.stringify({ reason: 'user_requested' }),
        request.headers.get('x-forwarded-for') || 'unknown',
        request.headers.get('user-agent') || 'unknown',
        new Date().toISOString()
      ]
    });

    console.log('✅ Logout globale completato per utente:', userId);

    // Crea risposta e rimuovi cookie
    const response = NextResponse.json({
      success: true,
      message: 'Disconnesso da tutti i dispositivi'
    });

    // Rimuovi cookie di sessione
    response.cookies.set('session_id', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(0)
    });

    return response;

  } catch (error) {
    console.error('❌ Errore logout globale:', error);
    return NextResponse.json(
      { success: false, error: 'Errore interno del server' },
      { status: 500 }
    );
  }
} 