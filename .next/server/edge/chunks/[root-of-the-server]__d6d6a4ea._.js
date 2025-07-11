(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root-of-the-server]__d6d6a4ea._.js", {

"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[project]/db.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "db": (()=>db),
    "initDatabase": (()=>initDatabase),
    "initDefaultData": (()=>initDefaultData)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$web$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/web.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$web$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/web.js [middleware-edge] (ecmascript) <locals>");
;
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$web$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])({
    url: process.env.STORAGE_TURSO_DATABASE_URL || process.env.TURSO_DATABASE_URL || 'file:./local.db',
    authToken: process.env.STORAGE_TURSO_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN
});
const initDatabase = async ()=>{
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
const initDefaultData = async ()=>{
    try {
        // Controlla se esistono già piani
        const existingPlans = await db.execute('SELECT COUNT(*) as count FROM plans');
        const planCount = existingPlans.rows[0]?.count;
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
                    0,
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
                    2900,
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
                    4900,
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
            args: [
                'lorecucchini@gmail.com'
            ]
        });
        const adminCount = existingAdmin.rows[0]?.count;
        if (adminCount === 0) {
            console.log('👑 Creazione amministratore predefinito...');
            // Hash password predefinita "admin123" (DA CAMBIARE)
            const bcrypt = __turbopack_context__.r("[project]/node_modules/bcryptjs/umd/index.js [middleware-edge] (ecmascript)");
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
                    'business',
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
                    JSON.stringify({
                        email: 'lorecucchini@gmail.com',
                        reason: 'Initial setup'
                    }),
                    new Date().toISOString()
                ]
            });
        }
    } catch (error) {
        console.error('❌ Errore inizializzazione dati predefiniti:', error);
    }
};
}}),
"[project]/lib/auth.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthManager": (()=>AuthManager)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$db$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/db.ts [middleware-edge] (ecmascript)");
;
class AuthManager {
    // Verifica se una sessione è valida
    static async validateSession(sessionId) {
        try {
            if (!sessionId) {
                return null;
            }
            // Query per ottenere sessione e utente
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$db$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["db"].execute({
                sql: `
          SELECT 
            s.*,
            u.id as user_id,
            u.email,
            u.first_name,
            u.last_name,
            u.company,
            u.role,
            u.plan_id,
            u.is_active,
            u.email_verified,
            u.last_login,
            u.created_at as user_created_at,
            u.updated_at as user_updated_at,
            u.projects_used,
            u.api_calls_this_month,
            u.last_api_reset,
            u.created_by,
            u.notes
          FROM sessions s
          JOIN users u ON s.user_id = u.id
          WHERE s.id = ? AND s.expires_at > ? AND u.is_active = 1
        `,
                args: [
                    sessionId,
                    new Date().toISOString()
                ]
            });
            if (result.rows.length === 0) {
                return null;
            }
            const row = result.rows[0];
            const user = {
                id: row.user_id,
                email: row.email,
                first_name: row.first_name,
                last_name: row.last_name,
                company: row.company,
                role: row.role,
                plan_id: row.plan_id,
                is_active: Boolean(row.is_active),
                email_verified: Boolean(row.email_verified),
                last_login: row.last_login,
                created_at: row.user_created_at,
                updated_at: row.user_updated_at,
                projects_used: row.projects_used || 0,
                api_calls_this_month: row.api_calls_this_month || 0,
                last_api_reset: row.last_api_reset,
                created_by: row.created_by,
                notes: row.notes,
                session: {
                    id: row.id,
                    user_id: row.user_id,
                    expires_at: row.expires_at,
                    ip_address: row.ip_address,
                    user_agent: row.user_agent,
                    created_at: row.created_at
                }
            };
            return user;
        } catch (error) {
            console.error('❌ Errore validazione sessione:', error);
            return null;
        }
    }
    // Estrae utente autenticato dalla richiesta
    static async getAuthenticatedUser(request) {
        const sessionId = request.cookies.get('session_id')?.value;
        if (!sessionId) {
            return null;
        }
        return await this.validateSession(sessionId);
    }
    // Verifica se l'utente è amministratore
    static isAdmin(user) {
        return user?.role === 'admin';
    }
    // Verifica se l'utente può accedere a un progetto specifico
    static async canAccessProject(user, projectId) {
        if (this.isAdmin(user)) {
            return true; // Gli admin possono accedere a tutti i progetti
        }
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$db$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["db"].execute({
                sql: 'SELECT id FROM projects WHERE id = ? AND user_id = ? AND is_active = 1',
                args: [
                    projectId,
                    user.id
                ]
            });
            return result.rows.length > 0;
        } catch (error) {
            console.error('❌ Errore verifica accesso progetto:', error);
            return false;
        }
    }
    // Verifica se l'utente ha raggiunto il limite di progetti
    static async hasReachedProjectLimit(user) {
        if (this.isAdmin(user)) {
            return false; // Gli admin non hanno limiti
        }
        try {
            // Ottieni il piano dell'utente
            const planResult = await __TURBOPACK__imported__module__$5b$project$5d2f$db$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["db"].execute({
                sql: 'SELECT max_projects FROM plans WHERE id = ?',
                args: [
                    user.plan_id
                ]
            });
            if (planResult.rows.length === 0) {
                return true; // Se non ha un piano, non può creare progetti
            }
            const maxProjects = planResult.rows[0].max_projects;
            // Conta i progetti attivi dell'utente
            const projectsResult = await __TURBOPACK__imported__module__$5b$project$5d2f$db$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["db"].execute({
                sql: 'SELECT COUNT(*) as count FROM projects WHERE user_id = ? AND is_active = 1',
                args: [
                    user.id
                ]
            });
            const currentProjects = projectsResult.rows[0]?.count || 0;
            return currentProjects >= maxProjects;
        } catch (error) {
            console.error('❌ Errore verifica limite progetti:', error);
            return true; // In caso di errore, blocca la creazione
        }
    }
    // Pulisce sessioni scadute
    static async cleanExpiredSessions() {
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$db$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["db"].execute({
                sql: 'DELETE FROM sessions WHERE expires_at < ?',
                args: [
                    new Date().toISOString()
                ]
            });
            console.log('🧹 Sessioni scadute pulite');
        } catch (error) {
            console.error('❌ Errore pulizia sessioni:', error);
        }
    }
    // Ottieni statistiche utente per admin
    static async getUserStats(userId) {
        try {
            const [userResult, projectsResult, consentsResult] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$db$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["db"].execute({
                    sql: `
            SELECT u.*, p.display_name as plan_name, p.max_projects 
            FROM users u 
            LEFT JOIN plans p ON u.plan_id = p.id 
            WHERE u.id = ?
          `,
                    args: [
                        userId
                    ]
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$db$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["db"].execute({
                    sql: 'SELECT COUNT(*) as count FROM projects WHERE user_id = ? AND is_active = 1',
                    args: [
                        userId
                    ]
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$db$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["db"].execute({
                    sql: `
            SELECT COUNT(*) as count 
            FROM consents c 
            JOIN projects p ON c.project_id = p.id 
            WHERE p.user_id = ?
          `,
                    args: [
                        userId
                    ]
                })
            ]);
            if (userResult.rows.length === 0) {
                return null;
            }
            const user = userResult.rows[0];
            const projectCount = projectsResult.rows[0]?.count || 0;
            const consentCount = consentsResult.rows[0]?.count || 0;
            return {
                ...user,
                project_count: projectCount,
                consent_count: consentCount
            };
        } catch (error) {
            console.error('❌ Errore ottenimento statistiche utente:', error);
            return null;
        }
    }
}
}}),
"[project]/middleware.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "config": (()=>config),
    "middleware": (()=>middleware)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [middleware-edge] (ecmascript)");
;
;
async function middleware(request) {
    const { pathname } = request.nextUrl;
    // Route pubbliche che non richiedono autenticazione
    const publicRoutes = [
        '/login',
        '/register',
        '/api/auth/',
        '/api/script/',
        '/api/consents'
    ];
    const isPublicRoute = publicRoutes.some((route)=>pathname.startsWith(route));
    // Bypass per le API script e consensi (devono essere pubbliche)
    if (pathname.startsWith('/api/script/') || pathname.startsWith('/api/consents')) {
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return response;
    }
    // Bypass per le API di autenticazione
    if (pathname.startsWith('/api/auth/')) {
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return response;
    }
    // Per le altre API, verifica autenticazione
    if (pathname.startsWith('/api/')) {
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["AuthManager"].getAuthenticatedUser(request);
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Autenticazione richiesta'
            }, {
                status: 401
            });
        }
        // Verifica accesso admin per route amministrative
        if (pathname.startsWith('/api/admin/') && !__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["AuthManager"].isAdmin(user)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Accesso non autorizzato'
            }, {
                status: 403
            });
        }
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
        // Aggiungi informazioni utente agli headers per le API
        response.headers.set('X-User-ID', user.id);
        response.headers.set('X-User-Role', user.role);
        response.headers.set('X-User-Plan', user.plan_id || 'none');
        return response;
    }
    // Verifica autenticazione per le route protette
    if (!isPublicRoute) {
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["AuthManager"].getAuthenticatedUser(request);
        if (!user) {
            // Reindirizza alla pagina di login
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(loginUrl);
        }
        // Verifica accesso admin per route amministrative
        if (pathname.startsWith('/admin') && !__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["AuthManager"].isAdmin(user)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Accesso amministratore richiesto'
            }, {
                status: 403
            });
        }
        // Aggiungi informazioni utente per le pagine
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
        response.headers.set('X-User-ID', user.id);
        response.headers.set('X-User-Role', user.role);
        return response;
    }
    // Per le route pubbliche, procedi normalmente
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */ '/((?!_next/static|_next/image|favicon.ico).*)'
    ]
};
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__d6d6a4ea._.js.map