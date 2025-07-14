import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import * as schema from './schema';
import bcrypt from 'bcryptjs';

// Connessione al database PostgreSQL (Netlify DB)
const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/cookieyes';
const client = postgres(connectionString);
export const db = drizzle(client, { schema });

// Schema del database aggiornato per sistema multi-utente PostgreSQL
export const initDatabase = async () => {
  console.log('🚀 Inizializzazione database PostgreSQL...');
  
  try {
    // Le tabelle vengono create automaticamente da Drizzle con le migrazioni
    // Per ora creiamo manualmente per compatibilità
    
    console.log('✅ Database multi-utente PostgreSQL inizializzato');
    
    // Inizializza dati predefiniti
    await initDefaultData();
  } catch (error) {
    console.error('❌ Errore inizializzazione database:', error);
    throw error;
  }
};

// Inizializza piani e amministratore predefiniti
export const initDefaultData = async () => {
  try {
    // Controlla se esistono già piani
    const existingPlans = await db.select().from(schema.plans).limit(1);
    
    if (existingPlans.length === 0) {
      console.log('📋 Creazione piani predefiniti...');
      
      // Piano Starter (1 progetto)
      await db.insert(schema.plans).values({
        id: 'starter',
        name: 'starter',
        displayName: 'Piano Starter',
        maxProjects: 1,
        price: 0, // Gratuito
        features: JSON.stringify([
          'Fino a 1 progetto',
          'Banner cookie personalizzabile',
          'Analytics di base',
          'Export CSV',
          'Supporto email'
        ])
      });
      
      // Piano Professional (2 progetti)
      await db.insert(schema.plans).values({
        id: 'professional',
        name: 'professional',
        displayName: 'Piano Professional',
        maxProjects: 2,
        price: 2900, // €29.00
        features: JSON.stringify([
          'Fino a 2 progetti',
          'Banner cookie personalizzabile',
          'Analytics avanzate',
          'Export CSV',
          'Cookie scanner automatico',
          'Supporto prioritario'
        ])
      });
      
      // Piano Business (5 progetti)
      await db.insert(schema.plans).values({
        id: 'business',
        name: 'business',
        displayName: 'Piano Business',
        maxProjects: 5,
        price: 4900, // €49.00
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
      });
      
      console.log('✅ Piani predefiniti creati');
    }
    
    // Controlla se esiste l'amministratore
    const existingAdmin = await db.select().from(schema.users).where(eq(schema.users.email, 'lorecucchini@gmail.com')).limit(1);
    
    if (existingAdmin.length === 0) {
      console.log('👑 Creazione amministratore predefinito...');
      
      // Hash password predefinita "admin123" (DA CAMBIARE)
      const defaultPasswordHash = await bcrypt.hash('admin123', 10);
      
      await db.insert(schema.users).values({
        id: 'admin_' + Date.now(),
        email: 'lorecucchini@gmail.com',
        passwordHash: defaultPasswordHash,
        firstName: 'Lorenzo',
        lastName: 'Cucchini',
        role: 'admin',
        planId: 'business', // Piano business per l'admin
        isActive: true,
        emailVerified: true,
      });
      
      console.log('✅ Amministratore predefinito creato');
      console.log('📧 Email: lorecucchini@gmail.com');
      console.log('🔑 Password temporanea: admin123 (CAMBIARE IMMEDIATAMENTE!)');
      
      // Log dell'azione
      await db.insert(schema.auditLogs).values({
        action: 'create_admin',
        resource: 'users',
        details: 'Amministratore predefinito creato durante inizializzazione',
      });
    }
    
  } catch (error) {
    console.error('❌ Errore inizializzazione dati predefiniti:', error);
    throw error;
  }
};

// Export delle interfacce per compatibilità
export type { Plan, User, Session, Project, Consent, AuditLog, BannerConfig } from './schema';

// Interfacce aggiuntive per le API
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: Omit<schema.User, 'passwordHash'>;
  session?: schema.Session;
  error?: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  planId: string;
  notes?: string;
}

