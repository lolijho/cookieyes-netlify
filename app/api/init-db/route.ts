import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../db';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    
    // Semplice protezione con un parametro segreto
    if (secret !== 'init-db-secret-2024') {
      return NextResponse.json(
        { message: 'Accesso negato' },
        { status: 401 }
      );
    }

    console.log('Inizializzazione database remoto...');
    
    // Tabella utenti
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabella users creata');

    // Tabella progetti
    await db.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        name TEXT NOT NULL,
        domain TEXT NOT NULL,
        language TEXT DEFAULT 'it',
        banner_config TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )
    `);
    console.log('✅ Tabella projects creata');

    // Tabella consensi
    await db.execute(`
      CREATE TABLE IF NOT EXISTS consents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id TEXT NOT NULL,
        session_id TEXT NOT NULL,
        ip_address TEXT,
        user_agent TEXT,
        domain TEXT,
        necessary INTEGER DEFAULT 1,
        analytics INTEGER DEFAULT 0,
        marketing INTEGER DEFAULT 0,
        preferences INTEGER DEFAULT 0,
        timestamp TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE,
        UNIQUE(project_id, session_id)
      )
    `);
    console.log('✅ Tabella consents creata');

    // Indici per performance
    await db.execute(`CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects (user_id)`);
    await db.execute(`CREATE INDEX IF NOT EXISTS idx_consents_project_id ON consents (project_id)`);
    await db.execute(`CREATE INDEX IF NOT EXISTS idx_consents_created_at ON consents (created_at)`);
    
    console.log('✅ Indici creati');

    // Verifica finale
    const result = await db.execute("SELECT name FROM sqlite_master WHERE type='table'");
    console.log('✅ Database inizializzato con successo');
    console.log('📋 Tabelle create:', result.rows.map(r => r.name));

    return NextResponse.json({
      message: 'Database inizializzato con successo',
      tables: result.rows.map(r => r.name)
    });

  } catch (error) {
    console.error('❌ Errore durante l\'inizializzazione:', error);
    return NextResponse.json(
      { message: 'Errore durante l\'inizializzazione del database' },
      { status: 500 }
    );
  }
} 