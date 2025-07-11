const { createClient } = require('@libsql/client');
const bcrypt = require('bcryptjs');

const db = createClient({
  url: process.env.TURSO_DATABASE_URL || 'file:./local.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function migrateToMultiUser() {
  console.log('🚀 Inizio migrazione a sistema multi-utente...');

  try {
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

    // 2. Aggiorna tabella utenti
    console.log('👥 Aggiornamento tabella utenti...');
    
    // Aggiungi nuove colonne se non esistono
    const newUserColumns = [
      'ALTER TABLE users ADD COLUMN first_name TEXT',
      'ALTER TABLE users ADD COLUMN last_name TEXT', 
      'ALTER TABLE users ADD COLUMN company TEXT',
      'ALTER TABLE users ADD COLUMN role TEXT DEFAULT "client"',
      'ALTER TABLE users ADD COLUMN plan_id TEXT REFERENCES plans(id)',
      'ALTER TABLE users ADD COLUMN is_active INTEGER DEFAULT 1',
      'ALTER TABLE users ADD COLUMN email_verified INTEGER DEFAULT 0',
      'ALTER TABLE users ADD COLUMN last_login DATETIME',
      'ALTER TABLE users ADD COLUMN projects_used INTEGER DEFAULT 0',
      'ALTER TABLE users ADD COLUMN api_calls_this_month INTEGER DEFAULT 0',
      'ALTER TABLE users ADD COLUMN last_api_reset DATETIME DEFAULT CURRENT_TIMESTAMP',
      'ALTER TABLE users ADD COLUMN created_by TEXT',
      'ALTER TABLE users ADD COLUMN notes TEXT'
    ];

    for (const sql of newUserColumns) {
      try {
        await db.execute(sql);
      } catch (error) {
        // Ignora errori se la colonna esiste già
        if (!error.message.includes('duplicate column name')) {
          console.warn('Avviso:', error.message);
        }
      }
    }

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

    // 4. Aggiorna tabella progetti
    console.log('📊 Aggiornamento tabella progetti...');
    
    const newProjectColumns = [
      'ALTER TABLE projects ADD COLUMN total_views INTEGER DEFAULT 0',
      'ALTER TABLE projects ADD COLUMN total_consents INTEGER DEFAULT 0',
      'ALTER TABLE projects ADD COLUMN is_active INTEGER DEFAULT 1'
    ];

    for (const sql of newProjectColumns) {
      try {
        await db.execute(sql);
      } catch (error) {
        if (!error.message.includes('duplicate column name')) {
          console.warn('Avviso:', error.message);
        }
      }
    }

    // 5. Aggiorna tabella consensi
    console.log('📝 Aggiornamento tabella consensi...');
    
    const newConsentColumns = [
      'ALTER TABLE consents ADD COLUMN browser_language TEXT',
      'ALTER TABLE consents ADD COLUMN screen_resolution TEXT',
      'ALTER TABLE consents ADD COLUMN timezone TEXT',
      'ALTER TABLE consents ADD COLUMN referrer TEXT'
    ];

    for (const sql of newConsentColumns) {
      try {
        await db.execute(sql);
      } catch (error) {
        if (!error.message.includes('duplicate column name')) {
          console.warn('Avviso:', error.message);
        }
      }
    }

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

    // 9. Crea amministratore predefinito
    console.log('👑 Creazione amministratore predefinito...');
    
    const adminEmail = 'lorecucchini@gmail.com';
    const adminPassword = 'admin123'; // DA CAMBIARE IMMEDIATAMENTE
    
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

      console.log('✅ Amministratore creato:');
      console.log('   📧 Email:', adminEmail);
      console.log('   🔑 Password temporanea:', adminPassword);
      console.log('   ⚠️  CAMBIARE LA PASSWORD IMMEDIATAMENTE!');

      // Log dell'azione
      await db.execute({
        sql: `INSERT INTO audit_logs (action, resource, details, created_at) VALUES (?, ?, ?, ?)`,
        args: [
          'create_admin',
          'user',
          JSON.stringify({ email: adminEmail, reason: 'Migration setup' }),
          new Date().toISOString()
        ]
      });
    } else {
      console.log('✅ Amministratore già esistente');
    }

    console.log('🎉 Migrazione completata con successo!');
    console.log('');
    console.log('📋 Riassunto:');
    console.log('   ✅ Tabelle create/aggiornate');
    console.log('   ✅ Indici creati'); 
    console.log('   ✅ Piani inseriti (Starter/Professional/Business)');
    console.log('   ✅ Amministratore configurato');
    console.log('');
    console.log('🔗 Prossimi passi:');
    console.log('   1. Accedi con lorecucchini@gmail.com / admin123');
    console.log('   2. Cambia immediatamente la password');
    console.log('   3. Crea i tuoi primi clienti dalla dashboard admin');

  } catch (error) {
    console.error('❌ Errore durante la migrazione:', error);
    process.exit(1);
  }
}

// Esegui migrazione
migrateToMultiUser()
  .then(() => {
    console.log('✅ Migrazione completata');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migrazione fallita:', error);
    process.exit(1);
  }); 