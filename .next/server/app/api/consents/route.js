(()=>{var e={};e.id=495,e.ids=[495],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},3870:(e,t,s)=>{"use strict";s.d(t,{A:()=>i});var r=s(5511);let n={randomUUID:r.randomUUID},a=new Uint8Array(256),o=a.length,c=[];for(let e=0;e<256;++e)c.push((e+256).toString(16).slice(1));let i=function(e,t,s){if(n.randomUUID&&!t&&!e)return n.randomUUID();let i=(e=e||{}).random??e.rng?.()??(o>a.length-16&&((0,r.randomFillSync)(a),o=0),a.slice(o,o+=16));if(i.length<16)throw Error("Random bytes length must be >= 16");if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,t){if((s=s||0)<0||s+16>t.length)throw RangeError(`UUID byte range ${s}:${s+15} is out of buffer bounds`);for(let e=0;e<16;++e)t[s+e]=i[e];return t}return function(e,t=0){return(c[e[t+0]]+c[e[t+1]]+c[e[t+2]]+c[e[t+3]]+"-"+c[e[t+4]]+c[e[t+5]]+"-"+c[e[t+6]]+c[e[t+7]]+"-"+c[e[t+8]]+c[e[t+9]]+"-"+c[e[t+10]]+c[e[t+11]]+c[e[t+12]]+c[e[t+13]]+c[e[t+14]]+c[e[t+15]]).toLowerCase()}(i)}},4562:(e,t,s)=>{"use strict";s.a(e,async(e,r)=>{try{s.d(t,{db:()=>o});var n=s(8855),a=e([n]);n=(a.then?(await a)():a)[0];let o=(0,n.createClient)({url:process.env.STORAGE_TURSO_DATABASE_URL||process.env.TURSO_DATABASE_URL||"file:./local.db",authToken:process.env.STORAGE_TURSO_AUTH_TOKEN||process.env.TURSO_AUTH_TOKEN});r()}catch(e){r(e)}})},4651:(e,t,s)=>{"use strict";s.a(e,async(e,r)=>{try{s.r(t),s.d(t,{patchFetch:()=>d,routeModule:()=>u,serverHooks:()=>l,workAsyncStorage:()=>E,workUnitAsyncStorage:()=>p});var n=s(6559),a=s(8088),o=s(7719),c=s(5328),i=e([c]);c=(i.then?(await i)():i)[0];let u=new n.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/consents/route",pathname:"/api/consents",filename:"route",bundlePath:"app/api/consents/route"},resolvedPagePath:"/Users/cuweb/Desktop/cookiefacile/cookie/app/api/consents/route.ts",nextConfigOutput:"",userland:c}),{workAsyncStorage:E,workUnitAsyncStorage:p,serverHooks:l}=u;function d(){return(0,o.patchFetch)({workAsyncStorage:E,workUnitAsyncStorage:p})}r()}catch(e){r(e)}})},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},5328:(e,t,s)=>{"use strict";s.a(e,async(e,r)=>{try{s.r(t),s.d(t,{GET:()=>u,POST:()=>d});var n=s(2190),a=s(4562),o=s(3870),c=s(5511),i=e([a]);async function d(e){try{let{projectId:t,consents:s,domain:r,userAgent:i,timestamp:d}=await e.json();if(!t||!s)return n.NextResponse.json({message:"ProjectId e consents sono richiesti"},{status:400});let u=await a.db.execute({sql:"SELECT id FROM projects WHERE id = ?",args:[t]});if(0===u.rows.length)return n.NextResponse.json({message:"Progetto non trovato"},{status:404});let E=e.headers.get("x-forwarded-for")||e.headers.get("x-real-ip")||"unknown",p=(0,c.createHash)("sha256").update(E+t).digest("hex"),l=`${E}_${i}_${r}_${t}`,g=(0,c.createHash)("sha256").update(l).digest("hex"),N=(0,o.A)(),T=Math.floor(Date.now()/1e3),m=d?Math.floor(new Date(d).getTime()/1e3):T,_=await a.db.execute({sql:`
        SELECT id FROM consents 
        WHERE session_id = ? AND project_id = ? 
        AND created_at > datetime('now', '-1 day')
        ORDER BY created_at DESC 
        LIMIT 1
      `,args:[g,t]});if(_.rows.length>0)return await a.db.execute({sql:`
          UPDATE consents SET
            necessary = ?,
            analytics = ?,
            marketing = ?,
            preferences = ?,
            consent_timestamp = ?,
            created_at = ?
          WHERE id = ?
        `,args:[s.necessary||!1,s.analytics||!1,s.marketing||!1,s.preferences||!1,m,T,_.rows[0].id]}),n.NextResponse.json({message:"Consenso aggiornato con successo",consentId:_.rows[0].id});return await a.db.execute({sql:`
          INSERT INTO consents (
            id, project_id, session_id, ip_hash, user_agent, domain,
            necessary, analytics, marketing, preferences,
            consent_timestamp, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,args:[N,t,g,p,i,r,s.necessary||!1,s.analytics||!1,s.marketing||!1,s.preferences||!1,m,T]}),n.NextResponse.json({message:"Consenso registrato con successo",consentId:N})}catch(e){return console.error("Errore nel salvataggio consenso:",e),n.NextResponse.json({message:"Errore interno del server"},{status:500})}}async function u(e){try{let{searchParams:t}=new URL(e.url),s=t.get("projectId"),r=t.get("userId");if(!s||!r)return n.NextResponse.json({message:"ProjectId e userId sono richiesti"},{status:400});let o=await a.db.execute({sql:"SELECT id FROM projects WHERE id = ? AND user_id = ?",args:[s,r]});if(0===o.rows.length)return n.NextResponse.json({message:"Progetto non trovato"},{status:404});let c=await a.db.execute({sql:`
        SELECT 
          COUNT(*) as total_consents,
          COUNT(CASE WHEN necessary = 1 THEN 1 END) as necessary_consents,
          COUNT(CASE WHEN analytics = 1 THEN 1 END) as analytics_consents,
          COUNT(CASE WHEN marketing = 1 THEN 1 END) as marketing_consents,
          COUNT(CASE WHEN preferences = 1 THEN 1 END) as preferences_consents,
          COUNT(CASE WHEN created_at > datetime('now', '-7 days') THEN 1 END) as recent_consents,
          COUNT(CASE WHEN created_at > datetime('now', '-1 day') THEN 1 END) as today_consents
        FROM consents 
        WHERE project_id = ?
      `,args:[s]}),i=await a.db.execute({sql:`
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as count,
          COUNT(CASE WHEN analytics = 1 THEN 1 END) as analytics_count,
          COUNT(CASE WHEN marketing = 1 THEN 1 END) as marketing_count
        FROM consents 
        WHERE project_id = ? AND created_at > datetime('now', '-30 days')
        GROUP BY DATE(created_at)
        ORDER BY date DESC
      `,args:[s]});return n.NextResponse.json({stats:c.rows[0]||{},dailyStats:i.rows||[]})}catch(e){return console.error("Errore nel recupero statistiche:",e),n.NextResponse.json({message:"Errore interno del server"},{status:500})}}a=(i.then?(await i)():i)[0],r()}catch(e){r(e)}})},5511:e=>{"use strict";e.exports=require("crypto")},6487:()=>{},8335:()=>{},8855:e=>{"use strict";e.exports=import("@libsql/client")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[447,580],()=>s(4651));module.exports=r})();