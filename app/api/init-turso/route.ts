import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    
    // Protezione con parametro segreto
    if (secret !== 'init-turso-secret-2024') {
      return NextResponse.json(
        { error: 'Accesso negato' },
        { status: 401 }
      );
    }

    console.log('🚀 Inizializzazione database Turso remoto...');

    // Test connessione
    console.log('🔍 Test connessione...');
    await db.execute('SELECT 1 as test');
    console.log('✅ Connessione riuscita');

    // 1. Crea tabella piani
    console.log('📋 Creazione tabella piani...');
    await db.execute(`
      CREATE TABLE IF NOT EXISTS plans (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        display_name TEXT NOT NULL,
        max_projects INTEGER NOT NULL,
        price INTEGER NOT NULL,
        currency TEXT DEFAULT 'EUR',
        features TEXT,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Crea tabella utenti
    console.log('👥 Creazione tabella utenti...');
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        first_name TEXT,
        last_name TEXT,
        company TEXT,
        role TEXT DEFAULT 'client',
        plan_id TEXT REFERENCES plans(id),
        is_active INTEGER DEFAULT 1,
        email_verified INTEGER DEFAULT 0,
        last_login DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        projects_used INTEGER DEFAULT 0,
        api_calls_this_month INTEGER DEFAULT 0,
        last_api_reset DATETIME DEFAULT CURRENT_TIMESTAMP,
        created_by TEXT,
        notes TEXT
      )
    `);

    // 3. Crea tabella sessioni
    console.log('🔐 Creazione tabella sessioni...');
    await db.execute(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        expires_at DATETIME NOT NULL,
        ip_address TEXT,
        user_agent TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 4. Crea tabella progetti
    console.log('📊 Creazione tabella progetti...');
    await db.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        domain TEXT NOT NULL,
        language TEXT DEFAULT 'it',
        banner_config TEXT NOT NULL,
        total_views INTEGER DEFAULT 0,
        total_consents INTEGER DEFAULT 0,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 5. Crea tabella consensi
    console.log('📝 Creazione tabella consensi...');
    await db.execute(`
      CREATE TABLE IF NOT EXISTS consents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        session_id TEXT NOT NULL,
        ip_address TEXT,
        user_agent TEXT,
        domain TEXT,
        necessary INTEGER DEFAULT 1,
        analytics INTEGER DEFAULT 0,
        marketing INTEGER DEFAULT 0,
        preferences INTEGER DEFAULT 0,
        timestamp TEXT,
        browser_language TEXT,
        screen_resolution TEXT,
        timezone TEXT,
        referrer TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(project_id, session_id)
      )
    `);

    // 6. Crea tabella audit log
    console.log('📋 Creazione tabella audit log...');
    await db.execute(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT REFERENCES users(id),
        action TEXT NOT NULL,
        resource TEXT,
        resource_id TEXT,
        details TEXT,
        ip_address TEXT,
        user_agent TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 7. Crea indici
    console.log('🔍 Creazione indici...');
    const indices = [
      'CREATE INDEX IF NOT EXISTS idx_users_email ON users (email)',
      'CREATE INDEX IF NOT EXISTS idx_users_role ON users (role)',
      'CREATE INDEX IF NOT EXISTS idx_users_plan_id ON users (plan_id)',
      'CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions (user_id)',
      'CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions (expires_at)',
      'CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects (user_id)',
      'CREATE INDEX IF NOT EXISTS idx_consents_project_id ON consents (project_id)',
      'CREATE INDEX IF NOT EXISTS idx_consents_created_at ON consents (created_at)',
      'CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs (user_id)',
      'CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs (action)'
    ];

    for (const sql of indices) {
      await db.execute(sql);
    }

    // 8. Inserisci piani predefiniti
    console.log('💰 Inserimento piani predefiniti...');
    const plans = [
      {
        id: 'starter',
        name: 'starter',
        display_name: 'Piano Starter',
        max_projects: 1,
        price: 0,
        features: JSON.stringify([
          'Fino a 1 progetto',
          'Banner cookie personalizzabile',
          'Analytics di base',
          'Export CSV',
          'Supporto email'
        ])
      },
      {
        id: 'professional',
        name: 'professional',
        display_name: 'Piano Professional',
        max_projects: 2,
        price: 2900,
        features: JSON.stringify([
          'Fino a 2 progetti',
          'Banner cookie personalizzabile',
          'Analytics avanzate',
          'Export CSV',
          'Cookie scanner automatico',
          'Supporto prioritario'
        ])
      },
      {
        id: 'business',
        name: 'business',
        display_name: 'Piano Business',
        max_projects: 5,
        price: 4900,
        features: JSON.stringify([
          'Fino a 5 progetti',
          'Banner cookie personalizzabile',
          'Analytics complete',
          'Export CSV',
          'Cookie scanner automatico',
          'API avanzate',
          'Audit log completo',
          'Supporto dedicato'
        ])
      }
    ];

    for (const plan of plans) {
      try {
        await db.execute({
          sql: `INSERT OR IGNORE INTO plans (id, name, display_name, max_projects, price, features) VALUES (?, ?, ?, ?, ?, ?)`,
          args: [plan.id, plan.name, plan.display_name, plan.max_projects, plan.price, plan.features]
        });
      } catch (error) {
        console.warn('Piano già esistente:', plan.id);
      }
    }

    // 9. Crea amministratore
    console.log('👑 Creazione amministratore...');
    const adminEmail = 'lorecucchini@gmail.com';
    const adminPassword = 'admin123';
    
    const existingAdmin = await db.execute({
      sql: 'SELECT id FROM users WHERE email = ?',
      args: [adminEmail]
    });

    if (existingAdmin.rows.length === 0) {
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      const adminId = 'admin_' + Date.now();
      
      await db.execute({
        sql: `INSERT INTO users (
          id, email, password_hash, first_name, last_name, role, plan_id, 
          is_active, email_verified, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          adminId,
          adminEmail,
          passwordHash,
          'Lorenzo',
          'Cucchini',
          'admin',
          'business',
          1,
          1,
          new Date().toISOString()
        ]
      });

      console.log('✅ Amministratore creato:', adminEmail);
    } else {
      console.log('✅ Amministratore già esistente');
    }

    // 10. Crea utente demo
    console.log('👤 Creazione utente demo...');
    const demoEmail = 'demo@cliente.com';
    const demoPassword = 'demo123';
    
    const existingDemo = await db.execute({
      sql: 'SELECT id FROM users WHERE email = ?',
      args: [demoEmail]
    });

    if (existingDemo.rows.length === 0) {
      const demoPasswordHash = await bcrypt.hash(demoPassword, 10);
      const demoId = 'demo_' + Date.now();
      
      await db.execute({
        sql: `INSERT INTO users (
          id, email, password_hash, first_name, last_name, company, role, plan_id, 
          is_active, email_verified, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          demoId,
          demoEmail,
          demoPasswordHash,
          'Mario',
          'Rossi',
          'Demo S.r.l.',
          'client',
          'professional',
          1,
          1,
          new Date().toISOString()
        ]
      });

      console.log('✅ Utente demo creato:', demoEmail);
    } else {
      console.log('✅ Utente demo già esistente');
    }

    console.log('🎉 Inizializzazione Turso completata!');

    return NextResponse.json({
      success: true,
      message: 'Database Turso inizializzato con successo',
      credentials: {
        admin: 'lorecucchini@gmail.com / admin123',
        demo: 'demo@cliente.com / demo123'
      }
    });

  } catch (error) {
    console.error('❌ Errore inizializzazione:', error);
    return NextResponse.json(
      { error: 'Errore durante l\'inizializzazione del database' },
      { status: 500 }
    );
  }
} 