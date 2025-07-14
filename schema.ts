import { sql } from 'drizzle-orm';
import { pgTable, uuid, varchar, text, timestamp, boolean, integer, jsonb, serial } from 'drizzle-orm/pg-core';

// Tabella piani
export const plans = pgTable('plans', {
  id: varchar('id', { length: 50 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  displayName: varchar('display_name', { length: 200 }).notNull(),
  maxProjects: integer('max_projects').notNull().default(1),
  price: integer('price').notNull().default(0), // In centesimi
  features: jsonb('features'), // Array di feature in JSON
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Tabella utenti (aggiornata per sistema multi-utente)
export const users = pgTable('users', {
  id: varchar('id', { length: 100 }).primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  company: varchar('company', { length: 200 }),
  role: varchar('role', { length: 20 }).notNull().default('client'), // 'admin' | 'client'
  planId: varchar('plan_id', { length: 50 }).references(() => plans.id),
  isActive: boolean('is_active').default(true),
  emailVerified: boolean('email_verified').default(false),
  lastLogin: timestamp('last_login'),
  projectsUsed: integer('projects_used').default(0),
  apiCallsThisMonth: integer('api_calls_this_month').default(0),
  lastApiReset: timestamp('last_api_reset'),
  createdBy: varchar('created_by', { length: 100 }).references(() => users.id),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Tabella sessioni
export const sessions = pgTable('sessions', {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: varchar('user_id', { length: 100 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at').notNull(),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Tabella progetti (aggiornata)
export const projects = pgTable('projects', {
  id: varchar('id', { length: 100 }).primaryKey(),
  userId: varchar('user_id', { length: 100 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 200 }).notNull(),
  domain: varchar('domain', { length: 255 }).notNull(),
  language: varchar('language', { length: 5 }).default('it'),
  isActive: boolean('is_active').default(true),
  
  // Configurazione banner
  bannerPosition: varchar('banner_position', { length: 20 }).default('bottom'),
  bannerTitle: varchar('banner_title', { length: 200 }).default('Utilizziamo i cookie'),
  bannerDescription: text('banner_description').default('Questo sito utilizza cookie per migliorare la tua esperienza di navigazione.'),
  bannerAcceptText: varchar('banner_accept_text', { length: 100 }).default('Accetta tutti'),
  bannerRejectText: varchar('banner_reject_text', { length: 100 }).default('Rifiuta'),
  bannerCustomizeText: varchar('banner_customize_text', { length: 100 }).default('Personalizza'),
  
  // Colori banner
  bannerBgColor: varchar('banner_bg_color', { length: 7 }).default('#ffffff'),
  bannerTextColor: varchar('banner_text_color', { length: 7 }).default('#333333'),
  bannerAcceptBgColor: varchar('banner_accept_bg_color', { length: 7 }).default('#4f46e5'),
  bannerAcceptTextColor: varchar('banner_accept_text_color', { length: 7 }).default('#ffffff'),
  bannerRejectBgColor: varchar('banner_reject_bg_color', { length: 7 }).default('#6b7280'),
  bannerRejectTextColor: varchar('banner_reject_text_color', { length: 7 }).default('#ffffff'),
  
  // Configurazione iconcina persistente
  floatingIconEnabled: boolean('floating_icon_enabled').default(true),
  floatingIconPosition: varchar('floating_icon_position', { length: 20 }).default('bottom-right'),
  floatingIconText: varchar('floating_icon_text', { length: 10 }).default('🍪'),
  floatingIconBgColor: varchar('floating_icon_bg_color', { length: 7 }).default('#4f46e5'),
  floatingIconTextColor: varchar('floating_icon_text_color', { length: 7 }).default('#ffffff'),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Tabella categorie cookie
export const cookieCategories = pgTable('cookie_categories', {
  id: varchar('id', { length: 100 }).primaryKey(),
  projectId: varchar('project_id', { length: 100 }).notNull().references(() => projects.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 50 }).notNull(),
  displayName: varchar('display_name', { length: 200 }).notNull(),
  description: text('description'),
  isRequired: boolean('is_required').default(false),
  isEnabled: boolean('is_enabled').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Tabella consensi
export const consents = pgTable('consents', {
  id: varchar('id', { length: 100 }).primaryKey(),
  projectId: varchar('project_id', { length: 100 }).notNull().references(() => projects.id, { onDelete: 'cascade' }),
  sessionId: varchar('session_id', { length: 255 }).notNull(),
  ipHash: varchar('ip_hash', { length: 64 }),
  userAgent: text('user_agent'),
  domain: varchar('domain', { length: 255 }),
  
  // Consensi per categoria
  necessary: boolean('necessary').default(true),
  analytics: boolean('analytics').default(false),
  marketing: boolean('marketing').default(false),
  preferences: boolean('preferences').default(false),
  
  // Metadati
  consentTimestamp: timestamp('consent_timestamp'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Tabella script tracciamento
export const trackingScripts = pgTable('tracking_scripts', {
  id: varchar('id', { length: 100 }).primaryKey(),
  projectId: varchar('project_id', { length: 100 }).notNull().references(() => projects.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 200 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  scriptCode: text('script_code').notNull(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Tabella audit log
export const auditLogs = pgTable('audit_logs', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 100 }).references(() => users.id),
  action: varchar('action', { length: 100 }).notNull(),
  resource: varchar('resource', { length: 100 }).notNull(),
  resourceId: varchar('resource_id', { length: 100 }),
  details: text('details'),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Banner configuration (opzionale, per configurazioni avanzate)
export const bannerConfigs = pgTable('banner_configs', {
  id: varchar('id', { length: 100 }).primaryKey(),
  projectId: varchar('project_id', { length: 100 }).notNull().references(() => projects.id, { onDelete: 'cascade' }),
  config: jsonb('config').notNull(), // Configurazione completa del banner in JSON
  version: integer('version').default(1),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Tipi TypeScript
export type Plan = typeof plans.$inferSelect;
export type NewPlan = typeof plans.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export type CookieCategory = typeof cookieCategories.$inferSelect;
export type NewCookieCategory = typeof cookieCategories.$inferInsert;

export type Consent = typeof consents.$inferSelect;
export type NewConsent = typeof consents.$inferInsert;

export type TrackingScript = typeof trackingScripts.$inferSelect;
export type NewTrackingScript = typeof trackingScripts.$inferInsert;

export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;

export type BannerConfig = typeof bannerConfigs.$inferSelect;
export type NewBannerConfig = typeof bannerConfigs.$inferInsert;

