import { createClient } from '@libsql/client';

export const db = createClient({
  url: process.env.STORAGE_TURSO_DATABASE_URL || process.env.TURSO_DATABASE_URL || 'file:./local.db',
  authToken: process.env.STORAGE_TURSO_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN,
});

// Schema del database aggiornato per sistema multi-utente
export const initDatabase = async () => {
  // Tabella piani di sottoscrizione
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

  // Tabella utenti aggiornata con sistema ruoli e piani
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

  // Tabella sessioni per autenticazione
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

  // Tabella progetti aggiornata per multi-utente
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

  // Tabella consensi aggiornata
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

  // Tabella audit log per amministrazione
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

  // Indici per performance
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_users_email ON users (email)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_users_role ON users (role)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_users_plan_id ON users (plan_id)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions (user_id)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions (expires_at)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects (user_id)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_consents_project_id ON consents (project_id)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_consents_created_at ON consents (created_at)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs (user_id)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs (action)`);
  
  console.log('✅ Database multi-utente inizializzato');
  
  // Inizializza dati predefiniti
  await initDefaultData();
};

// Inizializza piani e amministratore predefiniti
export const initDefaultData = async () => {
  try {
    // Controlla se esistono già piani
    const existingPlans = await db.execute('SELECT COUNT(*) as count FROM plans');
    const planCount = existingPlans.rows[0]?.count as number;
    
    if (planCount === 0) {
      console.log('📋 Creazione piani predefiniti...');
      
      // Piano Starter (1 progetto)
      await db.execute({
        sql: `INSERT INTO plans (id, name, display_name, max_projects, price, features) VALUES (?, ?, ?, ?, ?, ?)`,
        args: [
          'starter',
          'starter',
          'Piano Starter',
          1,
          0, // Gratuito
          JSON.stringify([
            'Fino a 1 progetto',
            'Banner cookie personalizzabile',
            'Analytics di base',
            'Export CSV',
            'Supporto email'
          ])
        ]
      });
      
      // Piano Professional (2 progetti)
      await db.execute({
        sql: `INSERT INTO plans (id, name, display_name, max_projects, price, features) VALUES (?, ?, ?, ?, ?, ?)`,
        args: [
          'professional',
          'professional',
          'Piano Professional',
          2,
          2900, // €29.00
          JSON.stringify([
            'Fino a 2 progetti',
            'Banner cookie personalizzabile',
            'Analytics avanzate',
            'Export CSV',
            'Cookie scanner automatico',
            'Supporto prioritario'
          ])
        ]
      });
      
      // Piano Business (5 progetti)
      await db.execute({
        sql: `INSERT INTO plans (id, name, display_name, max_projects, price, features) VALUES (?, ?, ?, ?, ?, ?)`,
        args: [
          'business',
          'business',
          'Piano Business',
          5,
          4900, // €49.00
          JSON.stringify([
            'Fino a 5 progetti',
            'Banner cookie personalizzabile',
            'Analytics complete',
            'Export CSV',
            'Cookie scanner automatico',
            'API avanzate',
            'Audit log completo',
            'Supporto dedicato'
          ])
        ]
      });
      
      console.log('✅ Piani predefiniti creati');
    }
    
    // Controlla se esiste l'amministratore
    const existingAdmin = await db.execute({
      sql: 'SELECT COUNT(*) as count FROM users WHERE email = ?',
      args: ['lorecucchini@gmail.com']
    });
    const adminCount = existingAdmin.rows[0]?.count as number;
    
    if (adminCount === 0) {
      console.log('👑 Creazione amministratore predefinito...');
      
      // Hash password predefinita "admin123" (DA CAMBIARE)
      const bcrypt = require('bcryptjs');
      const defaultPasswordHash = await bcrypt.hash('admin123', 10);
      
      await db.execute({
        sql: `INSERT INTO users (
          id, email, password_hash, first_name, last_name, 
          role, plan_id, is_active, email_verified, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          'admin_' + Date.now(),
          'lorecucchini@gmail.com',
          defaultPasswordHash,
          'Lorenzo',
          'Cucchini',
          'admin',
          'business', // Piano business per l'admin
          1,
          1,
          new Date().toISOString()
        ]
      });
      
      console.log('✅ Amministratore predefinito creato');
      console.log('📧 Email: lorecucchini@gmail.com');
      console.log('🔑 Password temporanea: admin123 (CAMBIARE IMMEDIATAMENTE!)');
      
      // Log dell'azione
      await db.execute({
        sql: `INSERT INTO audit_logs (action, resource, details, created_at) VALUES (?, ?, ?, ?)`,
        args: [
          'create_admin',
          'user',
          JSON.stringify({ email: 'lorecucchini@gmail.com', reason: 'Initial setup' }),
          new Date().toISOString()
        ]
      });
    }
  } catch (error) {
    console.error('❌ Errore inizializzazione dati predefiniti:', error);
  }
};

// === TIPI TYPESCRIPT AGGIORNATI ===

export interface Plan {
  id: string;
  name: string;
  display_name: string;
  max_projects: number;
  price: number;
  currency: string;
  features?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  role: 'admin' | 'client';
  plan_id?: string;
  is_active: boolean;
  email_verified: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
  projects_used: number;
  api_calls_this_month: number;
  last_api_reset: string;
  created_by?: string;
  notes?: string;
}

export interface Session {
  id: string;
  user_id: string;
  expires_at: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  domain: string;
  language: string;
  banner_config: string;
  total_views: number;
  total_consents: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Consent {
  id: number;
  project_id: string;
  session_id: string;
  ip_address?: string;
  user_agent?: string;
  domain?: string;
  necessary: number;
  analytics: number;
  marketing: number;
  preferences: number;
  timestamp?: string;
  browser_language?: string;
  screen_resolution?: string;
  timezone?: string;
  referrer?: string;
  created_at: string;
}

export interface AuditLog {
  id: number;
  user_id?: string;
  action: string;
  resource?: string;
  resource_id?: string;
  details?: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

// Tipi per autenticazione
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: Omit<User, 'password_hash'>;
  session?: Session;
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

export interface BannerConfig {
  layout: 'bottom' | 'top' | 'center' | 'corner';
  colors: {
    background: string;
    text: string;
    button_accept: string;
    button_reject: string;
    button_settings: string;
  };
  texts: {
    title: string;
    description: string;
    accept_all: string;
    reject_all: string;
    settings: string;
    save_preferences: string;
  };
  categories: {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
    preferences: boolean;
  };
}

