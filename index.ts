import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

// Configurazione client database
const client = createClient({
  url: process.env.DATABASE_URL || 'file:./local.db',
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

// Istanza database con schema
export const db = drizzle(client, { schema });

// Esporta il client per operazioni avanzate se necessario
export { client };

// Esporta lo schema per facilità d'uso
export * from './schema';

