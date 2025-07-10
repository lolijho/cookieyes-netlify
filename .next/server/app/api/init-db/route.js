(()=>{var e={};e.id=199,e.ids=[199],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},2283:(e,t,s)=>{"use strict";s.a(e,async(e,a)=>{try{s.r(t),s.d(t,{patchFetch:()=>E,routeModule:()=>c,serverHooks:()=>p,workAsyncStorage:()=>d,workUnitAsyncStorage:()=>u});var r=s(6559),i=s(8088),T=s(7719),o=s(8368),n=e([o]);o=(n.then?(await n)():n)[0];let c=new r.AppRouteRouteModule({definition:{kind:i.RouteKind.APP_ROUTE,page:"/api/init-db/route",pathname:"/api/init-db",filename:"route",bundlePath:"app/api/init-db/route"},resolvedPagePath:"/Users/cuweb/Desktop/cookiefacile/cookie/app/api/init-db/route.ts",nextConfigOutput:"",userland:o}),{workAsyncStorage:d,workUnitAsyncStorage:u,serverHooks:p}=c;function E(){return(0,T.patchFetch)({workAsyncStorage:d,workUnitAsyncStorage:u})}a()}catch(e){a(e)}})},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},4562:(e,t,s)=>{"use strict";s.a(e,async(e,a)=>{try{s.d(t,{db:()=>T});var r=s(8855),i=e([r]);r=(i.then?(await i)():i)[0];let T=(0,r.createClient)({url:process.env.STORAGE_TURSO_DATABASE_URL||process.env.TURSO_DATABASE_URL||"file:./local.db",authToken:process.env.STORAGE_TURSO_AUTH_TOKEN||process.env.TURSO_AUTH_TOKEN});a()}catch(e){a(e)}})},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6487:()=>{},8335:()=>{},8368:(e,t,s)=>{"use strict";s.a(e,async(e,a)=>{try{s.r(t),s.d(t,{POST:()=>o});var r=s(2190),i=s(4562),T=e([i]);async function o(e){try{let{searchParams:t}=new URL(e.url),s=t.get("secret");if("init-db-secret-2024"!==s)return r.NextResponse.json({message:"Accesso negato"},{status:401});console.log("Inizializzazione database remoto..."),await i.db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `),console.log("✅ Tabella users creata"),await i.db.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        name TEXT NOT NULL,
        domain TEXT NOT NULL,
        language TEXT DEFAULT 'it',
        banner_config TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )
    `),console.log("✅ Tabella projects creata"),await i.db.execute(`
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
    `),console.log("✅ Tabella consents creata"),await i.db.execute("CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects (user_id)"),await i.db.execute("CREATE INDEX IF NOT EXISTS idx_consents_project_id ON consents (project_id)"),await i.db.execute("CREATE INDEX IF NOT EXISTS idx_consents_created_at ON consents (created_at)"),console.log("✅ Indici creati");let a=await i.db.execute("SELECT name FROM sqlite_master WHERE type='table'");return console.log("✅ Database inizializzato con successo"),console.log("\uD83D\uDCCB Tabelle create:",a.rows.map(e=>e.name)),r.NextResponse.json({message:"Database inizializzato con successo",tables:a.rows.map(e=>e.name)})}catch(e){return console.error("❌ Errore durante l'inizializzazione:",e),r.NextResponse.json({message:"Errore durante l'inizializzazione del database"},{status:500})}}i=(T.then?(await T)():T)[0],a()}catch(e){a(e)}})},8855:e=>{"use strict";e.exports=import("@libsql/client")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),a=t.X(0,[447,580],()=>s(2283));module.exports=a})();