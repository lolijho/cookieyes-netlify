import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Configurazione client database PostgreSQL
const client = postgres(process.env.DATABASE_URL || 'postgresql://localhost:5432/cookieyes');

// Istanza database con schema
export const db = drizzle(client, { schema });

// Esporta il client per operazioni avanzate se necessario
export { client };

// Esporta lo schema per facilità d'uso
export * from './schema';

