import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';
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

    const sql = postgres(process.env.DATABASE_URL || 'postgresql://localhost:5432/cookieyes');

    // Cerca l'utente nel database
    const userResult = await sql`
      SELECT * FROM users 
      WHERE email = ${email.toLowerCase()} 
      AND is_active = true
    `;

    if (userResult.length === 0) {
      await sql.end();
      return NextResponse.json(
        { success: false, error: 'Credenziali non valide' },
        { status: 401 }
      );
    }

    const user = userResult[0];

    // Verifica password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      // Log tentativo login fallito
      await sql`
        INSERT INTO audit_logs (user_id, action, resource, details, ip_address, user_agent) 
        VALUES (${user.id}, 'login_failed', 'auth', ${JSON.stringify({ reason: 'invalid_password' })}, 
                ${request.headers.get('x-forwarded-for') || 'unknown'}, 
                ${request.headers.get('user-agent') || 'unknown'})
      `;

      await sql.end();
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
    await sql`
      INSERT INTO sessions (id, user_id, expires_at, ip_address, user_agent) 
      VALUES (${sessionId}, ${user.id}, ${expiresAt}, 
              ${request.headers.get('x-forwarded-for') || 'unknown'}, 
              ${request.headers.get('user-agent') || 'unknown'})
    `;

    // Aggiorna ultimo login
    await sql`
      UPDATE users SET last_login = ${new Date()} WHERE id = ${user.id}
    `;

    // Log login riuscito
    await sql`
      INSERT INTO audit_logs (user_id, action, resource, details, ip_address, user_agent) 
      VALUES (${user.id}, 'login_success', 'auth', ${JSON.stringify({ session_id: sessionId })}, 
              ${request.headers.get('x-forwarded-for') || 'unknown'}, 
              ${request.headers.get('user-agent') || 'unknown'})
    `;

    await sql.end();

    // Prepara risposta senza password
    const { password_hash, ...userWithoutPassword } = user;

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