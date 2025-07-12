import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../../../db';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
        SELECT u.id, u.role 
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

    const adminId = sessionResult.rows[0].id as string;
    const userId = params.id;

    // Verifica che l'utente esista
    const userResult = await db.execute({
      sql: 'SELECT id, email, email_verified FROM users WHERE id = ?',
      args: [userId]
    });

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Utente non trovato' },
        { status: 404 }
      );
    }

    const user = userResult.rows[0];

    if (user.email_verified) {
      return NextResponse.json(
        { error: 'Utente già verificato' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    try {
      // Prova prima con verified_at
      await db.execute({
        sql: 'UPDATE users SET email_verified = 1, verified_at = ?, updated_at = ? WHERE id = ?',
        args: [now, now, userId]
      });
    } catch (verifiedAtError) {
      console.log('Campo verified_at non esiste, uso solo email_verified:', verifiedAtError);
      // Fallback senza verified_at
      await db.execute({
        sql: 'UPDATE users SET email_verified = 1, updated_at = ? WHERE id = ?',
        args: [now, userId]
      });
    }

    // Prova a inserire il log audit (opzionale)
    try {
      await db.execute({
        sql: `
          INSERT INTO audit_logs (user_id, action, resource, resource_id, details, ip_address, user_agent, created_at) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        args: [
          adminId,
          'verify_user',
          'users',
          userId,
          JSON.stringify({ email: user.email, verified_by: 'admin' }),
          request.headers.get('x-forwarded-for') || 'unknown',
          request.headers.get('user-agent') || 'unknown',
          now
        ]
      });
    } catch (auditError) {
      console.log('Tabella audit_logs non disponibile, continuo senza logging:', auditError);
    }

    console.log(`✅ Utente ${user.email} verificato dall'admin ${adminId}`);

    return NextResponse.json({
      success: true,
      message: 'Utente verificato con successo',
      user: {
        id: userId,
        email: user.email,
        verified_at: now
      }
    });

  } catch (error) {
    console.error('Errore verifica utente:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

// PATCH - Toggle verifica utente
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
        SELECT u.id, u.role 
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

    const adminId = sessionResult.rows[0].id as string;
    const userId = params.id;

    // Ottieni stato attuale utente
    const userResult = await db.execute({
      sql: 'SELECT id, email, email_verified FROM users WHERE id = ?',
      args: [userId]
    });

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Utente non trovato' },
        { status: 404 }
      );
    }

    const user = userResult.rows[0];
    const currentVerified = Boolean(user.email_verified);
    const newVerified = !currentVerified;
    const now = new Date().toISOString();

    try {
      // Prova prima con verified_at
      await db.execute({
        sql: `
          UPDATE users 
          SET email_verified = ?, verified_at = ?, updated_at = ? 
          WHERE id = ?
        `,
        args: [
          newVerified ? 1 : 0,
          newVerified ? now : null,
          now,
          userId
        ]
      });
    } catch (verifiedAtError) {
      console.log('Campo verified_at non esiste, uso solo email_verified:', verifiedAtError);
      // Fallback senza verified_at
      await db.execute({
        sql: `
          UPDATE users 
          SET email_verified = ?, updated_at = ? 
          WHERE id = ?
        `,
        args: [
          newVerified ? 1 : 0,
          now,
          userId
        ]
      });
    }

    // Prova a inserire il log audit (opzionale)
    try {
      await db.execute({
        sql: `
          INSERT INTO audit_logs (user_id, action, resource, resource_id, details, ip_address, user_agent, created_at) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        args: [
          adminId,
          newVerified ? 'verify_user' : 'unverify_user',
          'users',
          userId,
          JSON.stringify({ 
            email: user.email, 
            action: newVerified ? 'verified' : 'unverified',
            by: 'admin' 
          }),
          request.headers.get('x-forwarded-for') || 'unknown',
          request.headers.get('user-agent') || 'unknown',
          now
        ]
      });
    } catch (auditError) {
      console.log('Tabella audit_logs non disponibile, continuo senza logging:', auditError);
    }

    console.log(`${newVerified ? '✅' : '❌'} Utente ${user.email} ${newVerified ? 'verificato' : 'non verificato'} dall'admin`);

    return NextResponse.json({
      success: true,
      message: `Utente ${newVerified ? 'verificato' : 'non verificato'} con successo`,
      user: {
        id: userId,
        email: user.email,
        email_verified: newVerified,
        verified_at: newVerified ? now : null
      }
    });

  } catch (error) {
    console.error('Errore toggle verifica utente:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
} 