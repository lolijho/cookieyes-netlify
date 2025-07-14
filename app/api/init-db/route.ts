import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

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

    console.log('🚀 Inizializzazione database PostgreSQL...');
    
    const sql = postgres(process.env.DATABASE_URL || 'postgresql://localhost:5432/cookieyes');
    
    // Tabella piani
    await sql`
      CREATE TABLE IF NOT EXISTS plans (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        display_name TEXT NOT NULL,
        max_projects INTEGER NOT NULL,
        price INTEGER NOT NULL,
        currency TEXT DEFAULT 'EUR',
        features TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Tabella plans creata');
    
    // Tabella utenti
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        first_name TEXT,
        last_name TEXT,
        company TEXT,
        role TEXT DEFAULT 'client',
        plan_id TEXT REFERENCES plans(id),
        is_active BOOLEAN DEFAULT true,
        email_verified BOOLEAN DEFAULT false,
        last_login TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        projects_used INTEGER DEFAULT 0,
        api_calls_this_month INTEGER DEFAULT 0,
        last_api_reset TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_by TEXT,
        notes TEXT
      )
    `;
    console.log('✅ Tabella users creata');

    // Tabella sessioni
    await sql`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        expires_at TIMESTAMP NOT NULL,
        ip_address TEXT,
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Tabella sessions creata');

    // Tabella progetti
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        domain TEXT NOT NULL,
        language TEXT DEFAULT 'it',
        banner_config TEXT NOT NULL,
        total_views INTEGER DEFAULT 0,
        total_consents INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Tabella projects creata');

    // Tabella consensi
    await sql`
      CREATE TABLE IF NOT EXISTS consents (
        id SERIAL PRIMARY KEY,
        project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        session_id TEXT NOT NULL,
        ip_address TEXT,
        user_agent TEXT,
        domain TEXT,
        necessary BOOLEAN DEFAULT true,
        analytics BOOLEAN DEFAULT false,
        marketing BOOLEAN DEFAULT false,
        preferences BOOLEAN DEFAULT false,
        timestamp TEXT,
        browser_language TEXT,
        screen_resolution TEXT,
        timezone TEXT,
        referrer TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Tabella consents creata');

    // Tabella audit logs
    await sql`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id SERIAL PRIMARY KEY,
        user_id TEXT REFERENCES users(id),
        action TEXT NOT NULL,
        resource TEXT,
        resource_id TEXT,
        details TEXT,
        ip_address TEXT,
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Tabella audit_logs creata');

    // Indici per performance
    await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users (email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_users_role ON users (role)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions (user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects (user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_consents_project_id ON consents (project_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs (user_id)`;
    
    console.log('✅ Indici creati');

    // Inizializza dati predefiniti
    await initDefaultData(sql);

    // Chiudi connessione
    await sql.end();

    return NextResponse.json({
      message: 'Database PostgreSQL inizializzato con successo',
      status: 'success'
    });

  } catch (error) {
    console.error('❌ Errore durante l\'inizializzazione:', error);
    return NextResponse.json(
      { message: 'Errore durante l\'inizializzazione del database', error: error.message },
      { status: 500 }
    );
  }
}

// Inizializza dati predefiniti
async function initDefaultData(sql: any) {
  try {
    // Verifica se esistono piani
    const existingPlans = await sql`SELECT COUNT(*) as count FROM plans`;
    
    if (existingPlans[0].count == 0) {
      console.log('📋 Creazione piani predefiniti...');
      
      await sql`INSERT INTO plans (id, name, display_name, max_projects, price, features) VALUES 
        ('starter', 'starter', 'Piano Starter', 1, 0, '["Fino a 1 progetto", "Banner personalizzabile", "Analytics base"]'),
        ('professional', 'professional', 'Piano Professional', 2, 2900, '["Fino a 2 progetti", "Analytics avanzate", "Supporto prioritario"]'),
        ('business', 'business', 'Piano Business', 5, 4900, '["Fino a 5 progetti", "API avanzate", "Supporto dedicato"]')`;
      
      console.log('✅ Piani predefiniti creati');
    }
    
    // Verifica se esiste admin
    const existingAdmin = await sql`SELECT COUNT(*) as count FROM users WHERE email = 'lorecucchini@gmail.com'`;
    
    if (existingAdmin[0].count == 0) {
      console.log('👑 Creazione amministratore...');
      
      const bcrypt = require('bcryptjs');
      const passwordHash = await bcrypt.hash('admin123', 10);
      
      await sql`INSERT INTO users (
        id, email, password_hash, first_name, last_name, role, plan_id, is_active, email_verified
      ) VALUES (
        ${'admin_' + Date.now()}, 'lorecucchini@gmail.com', ${passwordHash}, 'Lorenzo', 'Cucchini', 'admin', 'business', true, true
      )`;
      
      console.log('✅ Amministratore creato');
      console.log('📧 Email: lorecucchini@gmail.com');
      console.log('🔑 Password: admin123');
    }
    
  } catch (error) {
    console.error('❌ Errore inizializzazione dati:', error);
    throw error;
  }
} 