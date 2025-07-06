const { createClient } = require('@libsql/client');

const db = createClient({
  url: 'file:./local.db',
});

async function insertTestData() {
  try {
    console.log('Inserimento dati di test...');
    
    // Ottieni l'ID del progetto esistente
    const projects = await db.execute('SELECT id FROM projects LIMIT 1');
    if (projects.rows.length === 0) {
      console.log('Nessun progetto trovato');
      return;
    }
    
    const projectId = projects.rows[0].id;
    console.log('Progetto ID:', projectId);
    
    // Inserisci alcuni consensi di test
    const testConsents = [
      {
        session_id: 'test_session_1',
        ip_address: '192.168.1.0',
        user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        domain: 'test.esempio.com',
        analytics: 1,
        marketing: 0,
        preferences: 1,
        timestamp: new Date(Date.now() - 86400000).toISOString() // Ieri
      },
      {
        session_id: 'test_session_2',
        ip_address: '192.168.1.0',
        user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        domain: 'test.esempio.com',
        analytics: 1,
        marketing: 1,
        preferences: 0,
        timestamp: new Date(Date.now() - 43200000).toISOString() // 12 ore fa
      },
      {
        session_id: 'test_session_3',
        ip_address: '192.168.1.0',
        user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)',
        domain: 'test.esempio.com',
        analytics: 0,
        marketing: 0,
        preferences: 0,
        timestamp: new Date(Date.now() - 21600000).toISOString() // 6 ore fa
      },
      {
        session_id: 'test_session_4',
        ip_address: '192.168.1.0',
        user_agent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
        domain: 'test.esempio.com',
        analytics: 1,
        marketing: 1,
        preferences: 1,
        timestamp: new Date().toISOString() // Ora
      }
    ];
    
    for (const consent of testConsents) {
      await db.execute({
        sql: `INSERT OR REPLACE INTO consents 
              (project_id, session_id, ip_address, user_agent, domain, 
               necessary, analytics, marketing, preferences, timestamp, created_at) 
              VALUES (?, ?, ?, ?, ?, 1, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
        args: [
          projectId,
          consent.session_id,
          consent.ip_address,
          consent.user_agent,
          consent.domain,
          consent.analytics,
          consent.marketing,
          consent.preferences,
          consent.timestamp
        ]
      });
    }
    
    console.log('Dati di test inseriti con successo!');
    
    // Verifica i dati inseriti
    const result = await db.execute({
      sql: 'SELECT COUNT(*) as count FROM consents WHERE project_id = ?',
      args: [projectId]
    });
    
    console.log('Consensi totali nel database:', result.rows[0].count);
    
  } catch (error) {
    console.error('Errore:', error);
  }
}

insertTestData();

