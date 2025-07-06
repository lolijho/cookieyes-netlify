import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, real } from 'drizzle-orm/sqlite-core';

// Tabella utenti
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

// Tabella progetti
export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  domain: text('domain').notNull(),
  language: text('language').default('it'),
  
  // Configurazione banner
  bannerPosition: text('banner_position').default('bottom'), // 'top' | 'bottom'
  bannerTitle: text('banner_title').default('Utilizziamo i cookie'),
  bannerDescription: text('banner_description').default('Questo sito utilizza cookie per migliorare la tua esperienza di navigazione.'),
  bannerAcceptText: text('banner_accept_text').default('Accetta tutti'),
  bannerRejectText: text('banner_reject_text').default('Rifiuta'),
  bannerCustomizeText: text('banner_customize_text').default('Personalizza'),
  
  // Colori banner
  bannerBgColor: text('banner_bg_color').default('#ffffff'),
  bannerTextColor: text('banner_text_color').default('#333333'),
  bannerAcceptBgColor: text('banner_accept_bg_color').default('#4f46e5'),
  bannerAcceptTextColor: text('banner_accept_text_color').default('#ffffff'),
  bannerRejectBgColor: text('banner_reject_bg_color').default('#6b7280'),
  bannerRejectTextColor: text('banner_reject_text_color').default('#ffffff'),
  
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

// Tabella categorie cookie
export const cookieCategories = sqliteTable('cookie_categories', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  name: text('name').notNull(), // 'necessary', 'analytics', 'marketing', 'preferences'
  displayName: text('display_name').notNull(),
  description: text('description'),
  isRequired: integer('is_required', { mode: 'boolean' }).default(false),
  isEnabled: integer('is_enabled', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

// Tabella consensi
export const consents = sqliteTable('consents', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  sessionId: text('session_id').notNull(), // Hash anonimo per identificare la sessione
  ipHash: text('ip_hash'), // Hash dell'IP per privacy
  userAgent: text('user_agent'),
  domain: text('domain'),
  
  // Consensi per categoria
  necessary: integer('necessary', { mode: 'boolean' }).default(true),
  analytics: integer('analytics', { mode: 'boolean' }).default(false),
  marketing: integer('marketing', { mode: 'boolean' }).default(false),
  preferences: integer('preferences', { mode: 'boolean' }).default(false),
  
  // Metadati
  consentTimestamp: integer('consent_timestamp', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

// Tabella script tracciamento
export const trackingScripts = sqliteTable('tracking_scripts', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  name: text('name').notNull(), // es. "Google Analytics", "Facebook Pixel"
  category: text('category').notNull(), // 'analytics', 'marketing', 'preferences'
  scriptCode: text('script_code').notNull(),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

// Tipi TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export type CookieCategory = typeof cookieCategories.$inferSelect;
export type NewCookieCategory = typeof cookieCategories.$inferInsert;

export type Consent = typeof consents.$inferSelect;
export type NewConsent = typeof consents.$inferInsert;

export type TrackingScript = typeof trackingScripts.$inferSelect;
export type NewTrackingScript = typeof trackingScripts.$inferInsert;

