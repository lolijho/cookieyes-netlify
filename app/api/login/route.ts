import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createClient } from '@libsql/client';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email e password sono richiesti' },
        { status: 400 }
      );
    }

    // Inizializza client Turso
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    });

    // Cerca l'utente nel database
    const result = await client.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [email]
    });

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: 'Credenziali non valide' },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // Verifica la password
    const isValidPassword = await bcrypt.compare(password, user.password as string);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Credenziali non valide' },
        { status: 401 }
      );
    }

    // Login successful
    return NextResponse.json(
      { 
        message: 'Login effettuato con successo',
        user: { id: user.id, email: user.email, name: user.name }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Errore durante il login:', error);
    return NextResponse.json(
      { message: 'Errore interno del server' },
      { status: 500 }
    );
  }
} 