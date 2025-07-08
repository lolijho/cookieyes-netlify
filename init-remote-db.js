const { createClient } = require('@libsql/client');

// Usa le variabili d'ambiente per il database remoto
const db = createClient({
  url: process.env.TURSO_DATABASE_URL || 'file:./local.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function initRemoteDatabase() {
  try {
    console.log('Inizializzazione database remoto...');
    console.log('URL:', process.env.TURSO_DATABASE_URL || 'file:./local.db');
    
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

    // Inserisco un utente di test
    await db.execute(`
      INSERT OR IGNORE INTO users (id, email, password_hash) 
      VALUES ('test-user-1', 'test@example.com', 'hash123')
    `);
    console.log('✅ Utente di test inserito');

    // Verifico le tabelle create
    const tables = await db.execute("SELECT name FROM sqlite_master WHERE type='table'");
    console.log('\nTabelle create:');
    tables.rows.forEach(row => console.log('-', row.name));

    console.log('🎉 Database remoto inizializzato con successo!');
    
  } catch (error) {
    console.error('❌ Errore durante l\'inizializzazione:', error);
  }
}

initRemoteDatabase(); 