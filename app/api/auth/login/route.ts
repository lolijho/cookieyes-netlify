import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../db';
import * as schema from '../../../../schema';
import { eq, and } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('🔐 Tentativo login per:', email);

    // Validazione input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email e password sono richiesti' },
        { status: 400 }
      );
    }

    // Cerca l'utente nel database
    const userResult = await db
      .select()
      .from(schema.users)
      .where(
        and(
          eq(schema.users.email, email.toLowerCase()),
          eq(schema.users.isActive, true)
        )
      )
      .limit(1);

    if (userResult.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Credenziali non valide' },
        { status: 401 }
      );
    }

    const user = userResult[0];

    // Verifica password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      // Log tentativo login fallito
      await db.insert(schema.auditLogs).values({
        userId: user.id,
        action: 'login_failed',
        resource: 'auth',
        details: JSON.stringify({ reason: 'invalid_password' }),
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      });

      return NextResponse.json(
        { success: false, error: 'Credenziali non valide' },
        { status: 401 }
      );
    }

    // Genera sessione
    const sessionId = generateSessionId();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Sessione valida 7 giorni

    // Salva sessione nel database
    await db.insert(schema.sessions).values({
      id: sessionId,
      userId: user.id,
      expiresAt: expiresAt,
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    });

    // Aggiorna ultimo login
    await db
      .update(schema.users)
      .set({ lastLogin: new Date() })
      .where(eq(schema.users.id, user.id));

    // Log login riuscito
    await db.insert(schema.auditLogs).values({
      userId: user.id,
      action: 'login_success',
      resource: 'auth',
      details: JSON.stringify({ session_id: sessionId }),
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    });

    // Prepara risposta senza password
    const { passwordHash, ...userWithoutPassword } = user;

    const response = {
      success: true,
      user: userWithoutPassword,
      session: {
        id: sessionId,
        user_id: user.id,
        expires_at: expiresAt.toISOString(),
        ip_address: request.headers.get('x-forwarded-for') || 'unknown',
        user_agent: request.headers.get('user-agent') || 'unknown',
        created_at: new Date().toISOString()
      }
    };

    console.log('✅ Login riuscito per:', email, 'Ruolo:', user.role);

    // Crea risposta con cookie di sessione
    const jsonResponse = NextResponse.json(response);
    
    // Imposta cookie di sessione
    jsonResponse.cookies.set('session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt
    });

    return jsonResponse;

  } catch (error) {
    console.error('❌ Errore login:', error);
    return NextResponse.json(
      { success: false, error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

// Genera ID sessione sicuro
function generateSessionId(): string {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2);
  const extra = Math.random().toString(36).substring(2);
  return `sess_${timestamp}_${random}_${extra}`;
} 