import { createClient } from '@libsql/client';

export const db = createClient({
  url: process.env.STORAGE_TURSO_DATABASE_URL || process.env.TURSO_DATABASE_URL || 'file:./local.db',
  authToken: process.env.STORAGE_TURSO_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN,
});

// Schema del database
export const initDatabase = async () => {
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

  // Tabella progetti
  await db.execute(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      domain TEXT NOT NULL,
      language TEXT DEFAULT 'it',
      banner_config TEXT NOT NULL, -- JSON con configurazione banner
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

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

  // Indici per performance
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects (user_id)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_consents_project_id ON consents (project_id)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_consents_created_at ON consents (created_at)`);
};

// Tipi TypeScript
export interface User {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  domain: string;
  language: string;
  banner_config: string;
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
  created_at: string;
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

