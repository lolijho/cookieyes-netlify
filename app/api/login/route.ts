import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createClient } from '@libsql/client';

export async function POST(request: NextRequest) {
  try {
    console.log('🔐 API Login chiamata');
    
    const { email, password } = await request.json();
    console.log('📧 Email ricevuta:', email);

    if (!email || !password) {
      console.log('❌ Email o password mancanti');
      return NextResponse.json(
        { message: 'Email e password sono richiesti' },
        { status: 400 }
      );
    }

    // Verifica variabili d'ambiente
    if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
      console.error('❌ Variabili d\'ambiente Turso mancanti');
      console.error('TURSO_DATABASE_URL:', !!process.env.TURSO_DATABASE_URL);
      console.error('TURSO_AUTH_TOKEN:', !!process.env.TURSO_AUTH_TOKEN);
      return NextResponse.json(
        { message: 'Configurazione database non trovata' },
        { status: 500 }
      );
    }

    console.log('🗄️ Connessione al database Turso...');
    
    // Inizializza client Turso
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    });

    console.log('🔍 Ricerca utente nel database...');

    // Cerca l'utente nel database
    const result = await client.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [email]
    });

    console.log('📊 Risultati query:', result.rows.length, 'utenti trovati');

    if (result.rows.length === 0) {
      console.log('❌ Utente non trovato');
      return NextResponse.json(
        { message: 'Credenziali non valide' },
        { status: 401 }
      );
    }

    const user = result.rows[0];
    console.log('👤 Utente trovato:', user.email);

    // CORREZIONE PRINCIPALE: Cast esplicito a string
    const passwordHash = user.password_hash as string;
    
    // Verifica che la password esista
    if (!passwordHash || typeof passwordHash !== 'string') {
      console.log('❌ Password hash non valido');
      return NextResponse.json(
        { message: 'Credenziali non valide' },
        { status: 401 }
      );
    }

    console.log('🔒 Verifica password...');
    // Verifica la password con cast esplicito
    const isValidPassword = await bcrypt.compare(password, passwordHash);
    console.log('✅ Password valida:', isValidPassword);

    if (!isValidPassword) {
      console.log('❌ Password non corretta');
      return NextResponse.json(
        { message: 'Credenziali non valide' },
        { status: 401 }
      );
    }

    console.log('🎉 Login riuscito!');
    // Login successful
    return NextResponse.json(
      { 
        message: 'Login effettuato con successo',
        user: { id: user.id, email: user.email }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('💥 Errore durante il login:', error);
    return NextResponse.json(
      { message: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

