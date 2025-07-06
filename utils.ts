import { db } from './index';
import { users, projects, cookieCategories, consents, trackingScripts } from './schema';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Utility per generare ID univoci
export const generateId = () => nanoid();

// Utility per hash password con bcrypt
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12);
};

// Utility per verificare password
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// Utility per hash IP (per privacy)
export const hashIP = (ip: string): string => {
  return crypto.createHash('sha256').update(ip + 'salt').digest('hex').substring(0, 16);
};

// Utility per creare categorie cookie di default per un progetto
export const createDefaultCookieCategories = async (projectId: string) => {
  const defaultCategories = [
    {
      id: generateId(),
      projectId,
      name: 'necessary',
      displayName: 'Cookie Necessari',
      description: 'Questi cookie sono essenziali per il funzionamento del sito web.',
      isRequired: true,
      isEnabled: true,
    },
    {
      id: generateId(),
      projectId,
      name: 'analytics',
      displayName: 'Cookie Analytics',
      description: 'Ci aiutano a capire come i visitatori interagiscono con il sito web.',
      isRequired: false,
      isEnabled: true,
    },
    {
      id: generateId(),
      projectId,
      name: 'marketing',
      displayName: 'Cookie Marketing',
      description: 'Utilizzati per tracciare i visitatori sui siti web per mostrare annunci pertinenti.',
      isRequired: false,
      isEnabled: true,
    },
    {
      id: generateId(),
      projectId,
      name: 'preferences',
      displayName: 'Cookie Preferenze',
      description: 'Permettono al sito web di ricordare le informazioni che cambiano il comportamento del sito.',
      isRequired: false,
      isEnabled: true,
    },
  ];

  await db.insert(cookieCategories).values(defaultCategories);
  return defaultCategories;
};

// Utility per ottenere statistiche consensi
export const getConsentStats = async (projectId: string) => {
  const stats = await db
    .select({
      total: consents.id,
      analytics: consents.analytics,
      marketing: consents.marketing,
      preferences: consents.preferences,
    })
    .from(consents)
    .where(eq(consents.projectId, projectId));

  const total = stats.length;
  const analyticsAccepted = stats.filter(s => s.analytics).length;
  const marketingAccepted = stats.filter(s => s.marketing).length;
  const preferencesAccepted = stats.filter(s => s.preferences).length;

  return {
    total,
    analytics: {
      accepted: analyticsAccepted,
      percentage: total > 0 ? Math.round((analyticsAccepted / total) * 100) : 0,
    },
    marketing: {
      accepted: marketingAccepted,
      percentage: total > 0 ? Math.round((marketingAccepted / total) * 100) : 0,
    },
    preferences: {
      accepted: preferencesAccepted,
      percentage: total > 0 ? Math.round((preferencesAccepted / total) * 100) : 0,
    },
  };
};

