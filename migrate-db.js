const { createClient } = require('@libsql/client');

const db = createClient({
  url: 'file:./local.db',
});

async function migrateDatabase() {
  try {
    console.log('Migrazione database...');
    
    // Elimina la vecchia tabella consents
    await db.execute('DROP TABLE IF EXISTS consents');
    console.log('Vecchia tabella consents eliminata');
    
    // Crea la nuova tabella consents con la struttura aggiornata
    await db.execute(`
      CREATE TABLE consents (
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
    console.log('Nuova tabella consents creata');
    
    // Crea gli indici
    await db.execute('CREATE INDEX IF NOT EXISTS idx_consents_project_id ON consents (project_id)');
    await db.execute('CREATE INDEX IF NOT EXISTS idx_consents_created_at ON consents (created_at)');
    console.log('Indici creati');
    
    console.log('Migrazione completata con successo!');
    
  } catch (error) {
    console.error('Errore durante la migrazione:', error);
  }
}

migrateDatabase();

