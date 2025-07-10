(()=>{var e={};e.id=139,e.ids=[139],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},4562:(e,n,t)=>{"use strict";t.a(e,async(e,o)=>{try{t.d(n,{db:()=>s});var a=t(8855),i=e([a]);a=(i.then?(await i)():i)[0];let s=(0,a.createClient)({url:process.env.STORAGE_TURSO_DATABASE_URL||process.env.TURSO_DATABASE_URL||"file:./local.db",authToken:process.env.STORAGE_TURSO_AUTH_TOKEN||process.env.TURSO_AUTH_TOKEN});o()}catch(e){o(e)}})},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},5995:(e,n,t)=>{"use strict";t.a(e,async(e,o)=>{try{t.r(n),t.d(n,{patchFetch:()=>l,routeModule:()=>d,serverHooks:()=>u,workAsyncStorage:()=>p,workUnitAsyncStorage:()=>g});var a=t(6559),i=t(8088),s=t(7719),r=t(6132),c=e([r]);r=(c.then?(await c)():c)[0];let d=new a.AppRouteRouteModule({definition:{kind:i.RouteKind.APP_ROUTE,page:"/api/script/[id]/route",pathname:"/api/script/[id]",filename:"route",bundlePath:"app/api/script/[id]/route"},resolvedPagePath:"/Users/cuweb/Desktop/cookiefacile/cookie/app/api/script/[id]/route.ts",nextConfigOutput:"",userland:r}),{workAsyncStorage:p,workUnitAsyncStorage:g,serverHooks:u}=d;function l(){return(0,s.patchFetch)({workAsyncStorage:p,workUnitAsyncStorage:g})}o()}catch(e){o(e)}})},6132:(e,n,t)=>{"use strict";t.a(e,async(e,o)=>{try{t.r(n),t.d(n,{GET:()=>r});var a=t(2190),i=t(4562),s=e([i]);async function r(e,{params:n}){try{let e=n.id,t=null;try{let n=await i.db.execute({sql:"SELECT * FROM project_backups WHERE id = ? ORDER BY backup_timestamp DESC LIMIT 1",args:[e]});if(n.rows.length>0){let e=n.rows[0];t={id:e.id,domain:e.domain,language:e.language,banner_config:JSON.parse(e.banner_config)}}}catch(e){console.log("Progetto non trovato nel backup, uso configurazione di default")}t||(t={id:e,domain:"example.com",language:"it",banner_config:{layout:"bottom",colors:{background:"#ffffff",text:"#333333",button_accept:"#4f46e5",button_reject:"#6b7280",button_settings:"#4f46e5"},texts:{title:"Utilizziamo i cookie",description:"Questo sito utilizza cookie per migliorare la tua esperienza di navigazione.",accept_all:"Accetta tutti",reject_all:"Rifiuta",settings:"Personalizza",save_preferences:"Salva Preferenze"},categories:{necessary:!0,analytics:!0,marketing:!0,preferences:!0}}});let o=function(e){let n=e.banner_config,t=process.env.NEXT_PUBLIC_APP_URL||"https://cookie-1-3brtxddcb-lolijhos-projects.vercel.app";return`
(function() {
  'use strict';
  
  // === CONFIGURAZIONE PROGETTO ===
  const PROJECT_ID = '${e.id}';
  const PROJECT_CONFIG = ${JSON.stringify(n)};
  const API_BASE = '${t}';
  
  // === COOKIE SCANNER ===
  const CookieScanner = {
    // Scansiona tutti i cookie presenti
    scanCookies: function() {
      const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split('=');
        if (name) {
          acc[name] = {
            name: name,
            value: value || '',
            category: this.categorizeByName(name)
          };
        }
        return acc;
      }, {});
      
      // Scansiona anche localStorage e sessionStorage
      const storage = this.scanStorage();
      
      return { cookies, storage };
    },
    
    // Categorizza i cookie per nome
    categorizeByName: function(name) {
      const lowerName = name.toLowerCase();
      
      // Cookie necessari (sempre consentiti)
      if (lowerName.includes('session') || lowerName.includes('csrf') || lowerName.includes('auth') || lowerName.includes('security')) {
        return 'necessary';
      }
      
      // Cookie di analytics
      if (lowerName.includes('ga') || lowerName.includes('analytics') || lowerName.includes('gtm') || lowerName.includes('_utm')) {
        return 'analytics';
      }
      
      // Cookie di marketing
      if (lowerName.includes('fb') || lowerName.includes('ads') || lowerName.includes('marketing') || lowerName.includes('track')) {
        return 'marketing';
      }
      
      // Cookie di preferenze
      if (lowerName.includes('pref') || lowerName.includes('settings') || lowerName.includes('lang') || lowerName.includes('theme')) {
        return 'preferences';
      }
      
      return 'necessary'; // Default: necessari
    },
    
    // Scansiona localStorage e sessionStorage
    scanStorage: function() {
      const storage = {
        localStorage: [],
        sessionStorage: []
      };
      
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && !key.startsWith('cookie_consent_')) {
            storage.localStorage.push({
              key: key,
              category: this.categorizeByName(key)
            });
          }
        }
        
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          if (key) {
            storage.sessionStorage.push({
              key: key,
              category: this.categorizeByName(key)
            });
          }
        }
      } catch (e) {
        console.warn('Impossibile scansionare storage:', e);
      }
      
      return storage;
    }
  };
  
  // === GESTIONE CONSENSI ===
  const ConsentManager = {
    STORAGE_KEY: 'cookie_consent_' + PROJECT_ID,
    
    // Verifica se il consenso \xe8 gi\xe0 stato dato
    hasConsent: function() {
      return localStorage.getItem(this.STORAGE_KEY) !== null;
    },
    
    // Ottiene i consensi salvati
    getConsent: function() {
      try {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
      } catch (e) {
        return null;
      }
    },
    
    // Salva il consenso
    saveConsent: function(consents) {
      const consentData = {
        ...consents,
        timestamp: Date.now(),
        version: '1.0'
      };
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(consentData));
      
      // Applica i consensi
      this.applyConsents(consents);
      
      // Invia al server (non bloccante)
      this.sendToServer(consentData);
      
      // Nasconde il banner
      this.hideBanner();
      
      console.log('Cookie consent salvato:', consents);
    },
    
    // Applica i consensi agli script e cookie
    applyConsents: function(consents) {
      // Rimuove i cookie non consentiti
      this.manageCookies(consents);
      
      // Gestisce Google Consent Mode se disponibile
      if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
          ad_storage: consents.marketing ? 'granted' : 'denied',
          analytics_storage: consents.analytics ? 'granted' : 'denied',
          ad_user_data: consents.marketing ? 'granted' : 'denied',
          ad_personalization: consents.marketing ? 'granted' : 'denied',
          functionality_storage: consents.preferences ? 'granted' : 'denied',
          personalization_storage: consents.preferences ? 'granted' : 'denied',
          security_storage: 'granted'
        });
      }
      
      // Attiva/disattiva script di terze parti
      this.manageThirdPartyScripts(consents);
    },
    
    // Gestisce i cookie esistenti
    manageCookies: function(consents) {
      const scanner = CookieScanner.scanCookies();
      
      Object.values(scanner.cookies).forEach(cookie => {
        if (!consents[cookie.category] && cookie.category !== 'necessary') {
          // Rimuove il cookie non consentito
          document.cookie = cookie.name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = cookie.name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname + ';';
          document.cookie = cookie.name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + window.location.hostname + ';';
        }
      });
      
      // Pulisce localStorage/sessionStorage se non consentiti
      if (!consents.preferences) {
        scanner.storage.localStorage.forEach(item => {
          if (item.category === 'preferences') {
            try { localStorage.removeItem(item.key); } catch (e) {}
          }
        });
      }
    },
    
    // Gestisce script di terze parti
    manageThirdPartyScripts: function(consents) {
      // Google Analytics
      if (consents.analytics && !window.gtag) {
        this.loadGoogleAnalytics();
      }
      
      // Facebook Pixel
      if (consents.marketing && !window.fbq) {
        this.loadFacebookPixel();
      }
      
      // Altri script possono essere aggiunti qui
    },
    
    // Carica Google Analytics
    loadGoogleAnalytics: function() {
      if (window.GA_TRACKING_ID) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + window.GA_TRACKING_ID;
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', window.GA_TRACKING_ID);
      }
    },
    
    // Carica Facebook Pixel
    loadFacebookPixel: function() {
      if (window.FB_PIXEL_ID) {
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', window.FB_PIXEL_ID);
        fbq('track', 'PageView');
      }
    },
    
    // Invia i consensi al server
    sendToServer: function(consentData) {
      const data = {
        projectId: PROJECT_ID,
        consents: consentData,
        domain: window.location.hostname,
        userAgent: navigator.userAgent,
        url: window.location.href,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
        cookiesScan: CookieScanner.scanCookies()
      };
      
      fetch(API_BASE + '/api/consents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).catch(err => console.warn('Errore invio consensi:', err));
    },
    
    // Nasconde il banner
    hideBanner: function() {
      const banner = document.getElementById('cookie-banner');
      if (banner) {
        banner.style.display = 'none';
      }
    }
  };
  
  // === COOKIE BANNER UI ===
  const BannerUI = {
    // Crea e mostra il banner
    show: function() {
      if (ConsentManager.hasConsent()) {
        return; // Non mostrare se il consenso \xe8 gi\xe0 stato dato
      }
      
      const banner = this.createBanner();
      document.body.appendChild(banner);
      
      // Animazione di entrata
      setTimeout(() => {
        banner.style.transform = 'translateY(0)';
        banner.style.opacity = '1';
      }, 100);
    },
    
    // Crea l'elemento banner
    createBanner: function() {
      const banner = document.createElement('div');
      banner.id = 'cookie-banner';
      banner.innerHTML = this.getBannerHTML();
      banner.style.cssText = this.getBannerCSS();
      
      // Event listeners
      this.attachEventListeners(banner);
      
      return banner;
    },
    
    // HTML del banner
    getBannerHTML: function() {
      const config = PROJECT_CONFIG;
      return \`
        <div class="cookie-banner-content">
          <div class="cookie-banner-text">
            <h3 class="cookie-banner-title">\${config.texts.title}</h3>
            <p class="cookie-banner-description">\${config.texts.description}</p>
          </div>
          <div class="cookie-banner-buttons">
            <button id="cookie-accept-all" class="cookie-btn cookie-btn-accept">
              \${config.texts.accept_all}
            </button>
            <button id="cookie-reject-all" class="cookie-btn cookie-btn-reject">
              \${config.texts.reject_all}
            </button>
            <button id="cookie-settings" class="cookie-btn cookie-btn-settings">
              \${config.texts.settings}
            </button>
          </div>
        </div>
        <div id="cookie-settings-panel" class="cookie-settings-panel" style="display: none;">
          <h4>Personalizza i tuoi consensi</h4>
          <div class="cookie-categories">
            <div class="cookie-category">
              <label>
                <input type="checkbox" id="consent-necessary" checked disabled>
                <span>Cookie Necessari</span>
                <small>Questi cookie sono essenziali per il funzionamento del sito.</small>
              </label>
            </div>
            <div class="cookie-category">
              <label>
                <input type="checkbox" id="consent-analytics" \${PROJECT_CONFIG.categories.analytics ? 'checked' : ''}>
                <span>Cookie Analitici</span>
                <small>Ci aiutano a capire come i visitatori interagiscono con il sito.</small>
              </label>
            </div>
            <div class="cookie-category">
              <label>
                <input type="checkbox" id="consent-marketing" \${PROJECT_CONFIG.categories.marketing ? 'checked' : ''}>
                <span>Cookie Marketing</span>
                <small>Utilizzati per mostrare annunci personalizzati.</small>
              </label>
            </div>
            <div class="cookie-category">
              <label>
                <input type="checkbox" id="consent-preferences" \${PROJECT_CONFIG.categories.preferences ? 'checked' : ''}>
                <span>Cookie Preferenze</span>
                <small>Salvano le tue preferenze e impostazioni.</small>
              </label>
            </div>
          </div>
          <div class="cookie-settings-buttons">
            <button id="cookie-save-settings" class="cookie-btn cookie-btn-accept">
              \${config.texts.save_preferences}
            </button>
          </div>
        </div>
      \`;
    },
    
    // CSS del banner
    getBannerCSS: function() {
      const config = PROJECT_CONFIG;
      const position = config.layout === 'top' ? 'top: 0;' : 'bottom: 0;';
      
      return \`
        position: fixed;
        \${position}
        left: 0;
        right: 0;
        background: \${config.colors.background};
        color: \${config.colors.text};
        padding: 20px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.15);
        z-index: 999999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
        font-size: 14px;
        line-height: 1.5;
        border-top: \${config.layout === 'bottom' ? '1px solid #e1e1e1' : 'none'};
        border-bottom: \${config.layout === 'top' ? '1px solid #e1e1e1' : 'none'};
        transform: translateY(\${config.layout === 'bottom' ? '100%' : '-100%'});
        opacity: 0;
        transition: all 0.3s ease;
      \`;
    },
    
    // Aggiunge event listeners
    attachEventListeners: function(banner) {
      // Accetta tutti
      banner.querySelector('#cookie-accept-all').addEventListener('click', () => {
        ConsentManager.saveConsent({
          necessary: true,
          analytics: true,
          marketing: true,
          preferences: true
        });
      });
      
      // Rifiuta tutti (tranne necessari)
      banner.querySelector('#cookie-reject-all').addEventListener('click', () => {
        ConsentManager.saveConsent({
          necessary: true,
          analytics: false,
          marketing: false,
          preferences: false
        });
      });
      
      // Mostra pannello impostazioni
      banner.querySelector('#cookie-settings').addEventListener('click', () => {
        const panel = banner.querySelector('#cookie-settings-panel');
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
      });
      
      // Salva impostazioni personalizzate
      banner.querySelector('#cookie-save-settings').addEventListener('click', () => {
        const consents = {
          necessary: true, // Sempre true
          analytics: banner.querySelector('#consent-analytics').checked,
          marketing: banner.querySelector('#consent-marketing').checked,
          preferences: banner.querySelector('#consent-preferences').checked
        };
        ConsentManager.saveConsent(consents);
      });
    }
  };
  
  // === INIZIALIZZAZIONE ===
  
  // Aspetta che il DOM sia pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
    // Mostra il banner se necessario
    BannerUI.show();
    
    // Applica consensi esistenti se presenti
    const existingConsent = ConsentManager.getConsent();
    if (existingConsent) {
      ConsentManager.applyConsents(existingConsent);
    }
    
    // API globale per gestione manuale
    window.CookieConsent = {
      show: BannerUI.show,
      getConsent: ConsentManager.getConsent,
      updateConsent: ConsentManager.saveConsent,
      scanCookies: CookieScanner.scanCookies
    };
    
    console.log('CookieYes script caricato per progetto:', PROJECT_ID);
  }
  
  // Aggiunge CSS globale
  const style = document.createElement('style');
  style.textContent = \`
    #cookie-banner .cookie-banner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      flex-wrap: wrap;
      gap: 15px;
    }
    
    #cookie-banner .cookie-banner-title {
      margin: 0 0 5px 0;
      font-size: 16px;
      font-weight: 600;
    }
    
    #cookie-banner .cookie-banner-description {
      margin: 0;
      opacity: 0.9;
    }
    
    #cookie-banner .cookie-banner-buttons {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    
    #cookie-banner .cookie-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s ease;
      min-width: 100px;
    }
    
    #cookie-banner .cookie-btn-accept {
      background: \${PROJECT_CONFIG.colors.button_accept};
      color: white;
    }
    
    #cookie-banner .cookie-btn-reject {
      background: \${PROJECT_CONFIG.colors.button_reject};
      color: white;
    }
    
    #cookie-banner .cookie-btn-settings {
      background: transparent;
      color: \${PROJECT_CONFIG.colors.button_settings};
      border: 1px solid \${PROJECT_CONFIG.colors.button_settings};
    }
    
    #cookie-banner .cookie-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    #cookie-banner .cookie-settings-panel {
      margin-top: 20px;
      padding: 20px;
      background: rgba(0,0,0,0.05);
      border-radius: 6px;
    }
    
    #cookie-banner .cookie-categories {
      margin: 15px 0;
    }
    
    #cookie-banner .cookie-category {
      margin: 10px 0;
      padding: 10px;
      background: white;
      border-radius: 4px;
    }
    
    #cookie-banner .cookie-category label {
      display: block;
      cursor: pointer;
    }
    
    #cookie-banner .cookie-category input {
      margin-right: 8px;
    }
    
    #cookie-banner .cookie-category small {
      display: block;
      margin-top: 5px;
      opacity: 0.7;
      font-size: 12px;
    }
    
    @media (max-width: 768px) {
      #cookie-banner .cookie-banner-content {
        flex-direction: column;
        text-align: center;
      }
      
      #cookie-banner .cookie-banner-buttons {
        justify-content: center;
        width: 100%;
      }
      
      #cookie-banner .cookie-btn {
        flex: 1;
        min-width: auto;
      }
    }
  \`;
  document.head.appendChild(style);
  
})();`}(t);return new a.NextResponse(o,{status:200,headers:{"Content-Type":"application/javascript; charset=utf-8","Cache-Control":"public, max-age=300","Access-Control-Allow-Origin":"*"}})}catch(n){console.error("Errore nella generazione script:",n);let e=`
// Script di fallback per CookieYes
console.warn('CookieYes: Configurazione progetto non trovata, uso script di fallback');

// Banner semplice di fallback
(function() {
  if (localStorage.getItem('cookie_consent_fallback')) return;
  
  const banner = document.createElement('div');
  banner.innerHTML = '<div style="background:#333;color:white;padding:15px;position:fixed;bottom:0;left:0;right:0;z-index:9999;text-align:center;">Questo sito utilizza cookie. <button onclick="localStorage.setItem(\\'cookie_consent_fallback\\',\\'true\\');this.parentElement.remove();" style="background:#4f46e5;color:white;border:none;padding:5px 15px;margin-left:10px;border-radius:3px;cursor:pointer;">Accetta</button></div>';
  document.body.appendChild(banner);
})();`;return new a.NextResponse(e,{status:200,headers:{"Content-Type":"application/javascript; charset=utf-8","Access-Control-Allow-Origin":"*"}})}}i=(s.then?(await s)():s)[0],o()}catch(e){o(e)}})},6487:()=>{},8335:()=>{},8855:e=>{"use strict";e.exports=import("@libsql/client")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")}};var n=require("../../../../webpack-runtime.js");n.C(e);var t=e=>n(n.s=e),o=n.X(0,[447,580],()=>t(5995));module.exports=o})();