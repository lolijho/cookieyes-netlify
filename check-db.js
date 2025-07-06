const { createClient } = require('@libsql/client');

const db = createClient({
  url: 'file:./local.db',
});

async function checkDatabase() {
  try {
    console.log('Controllo struttura database...');
    
    // Controlla le tabelle esistenti
    const tables = await db.execute("SELECT name FROM sqlite_master WHERE type='table'");
    console.log('Tabelle esistenti:');
    tables.rows.forEach(row => console.log('-', row.name));
    
    // Controlla la struttura della tabella consents
    const consentsSchema = await db.execute("PRAGMA table_info(consents)");
    console.log('\nStruttura tabella consents:');
    consentsSchema.rows.forEach(row => {
      console.log(`- ${row.name}: ${row.type} (nullable: ${row.notnull === 0})`);
    });
    
  } catch (error) {
    console.error('Errore:', error);
  }
}

checkDatabase();

