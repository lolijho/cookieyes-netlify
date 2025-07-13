import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;

    // Cerca il progetto nella tabella projects
    let project = null;
    try {
      const projectResult = await db.execute({
        sql: 'SELECT * FROM projects WHERE id = ? AND is_active = 1',
        args: [projectId]
      });

      if (projectResult.rows.length > 0) {
        const row = projectResult.rows[0];
        project = {
          id: row.id,
          name: row.name,
          domain: row.domain,
          language: row.language,
          banner_config: row.banner_config ? JSON.parse(row.banner_config as string) : null
        };
      }
    } catch (error) {
      console.log('Errore nel recupero del progetto:', error);
    }

    // Se non trovato, usa configurazione di default
    if (!project) {
      project = {
        id: projectId,
        name: 'Progetto Default',
        domain: 'example.com',
        language: 'it',
        banner_config: {
          layout: 'bottom',
          colors: {
            background: '#ffffff',
            text: '#333333',
            button_accept: '#4f46e5',
            button_reject: '#6b7280',
            button_settings: '#4f46e5'
          },
          texts: {
            title: 'Utilizziamo i cookie',
            description: 'Questo sito utilizza cookie per migliorare la tua esperienza di navigazione.',
            accept_all: 'Accetta tutti',
            reject_all: 'Rifiuta',
            settings: 'Personalizza',
            save_preferences: 'Salva Preferenze'
          },
          categories: {
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true
          },
          floatingIcon: {
            enabled: true,
            position: 'bottom-right',
            text: '🍪',
            backgroundColor: '#4f46e5',
            textColor: '#ffffff'
          }
        }
      };
      
      console.log('Usando configurazione di default per progetto:', projectId);
    }

    // Genera lo script
    const script = generateCookieBannerScript(project);

    return new Response(script, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=300', // Cache per 5 minuti
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });

  } catch (error) {
    console.error('Errore nella generazione dello script:', error);
    
    // Ritorna script di fallback in caso di errore
    const fallbackScript = generateFallbackScript();
    return new Response(fallbackScript, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=60',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

function generateCookieBannerScript(project: any): string {
  const config = project.banner_config;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://cookie-1-3brtxddcb-lolijhos-projects.vercel.app';
  
  return `
(function() {
  'use strict';
  
  // === CONFIGURAZIONE PROGETTO ===
  const PROJECT_ID = '${project.id}';
  const PROJECT_CONFIG = ${JSON.stringify(config)};
  const API_BASE = '${baseUrl}';
  
  // === COOKIE SCANNER ===
  const CookieScanner = {
    // Cache dei cookie scansionati
    lastScanResults: null,
    scanInterval: null,
    
    // Scansiona tutti i cookie presenti
    scanCookies: function() {
      const cookies = {};
      const rawCookies = document.cookie.split(';');
      
      console.log('🔍 Scansionando cookie...', rawCookies.length, 'cookie trovati');
      
      rawCookies.forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        if (name && name.trim()) {
          const cleanName = name.trim();
          const category = this.categorizeByName(cleanName);
          
          cookies[cleanName] = {
            name: cleanName,
            value: value || '',
            category: category,
            size: cookie.length,
            domain: window.location.hostname,
            path: '/',
            timestamp: Date.now()
          };
        }
      });
      
      // Scansiona anche localStorage e sessionStorage
      const storage = this.scanStorage();
      
      // Scansiona script attivi
      const scripts = this.scanScripts();
      
      const results = { 
        cookies, 
        storage, 
        scripts,
        summary: this.generateSummary(cookies, storage, scripts)
      };
      
      this.lastScanResults = results;
      console.log('✅ Scan completato:', results.summary);
      
      return results;
    },
    
    // Categorizza i cookie per nome con database più avanzato
    categorizeByName: function(name) {
      const lowerName = name.toLowerCase();
      
      // Database avanzato di categorizzazione
      const cookieDatabase = {
        necessary: [
          'session', 'csrf', 'auth', 'security', 'login', 'token', 'xsrf',
          'phpsessid', 'jsessionid', 'asp.net_sessionid', 'cfid', 'cftoken',
          'ci_session', 'laravel_session', 'connect.sid', 'rack.session',
          'wordpress_logged_in', 'wp-settings', 'wordpress_test_cookie',
          'cookieyes', 'cookie_consent', 'gdpr', 'necessary', 'essential',
          'functional', 'technical', 'performance', 'basic', 'core'
        ],
        analytics: [
          'ga', 'google', 'analytics', 'gtm', 'gtag', '_utm', '_gid', '_gat',
          'collect', 'doubleclick', 'adsystem', 'googlesyndication',
          'hotjar', 'mixpanel', 'segment', 'amplitude', 'heap', 'fullstory',
          'mouseflow', 'crazy', 'quantcast', 'comscore', 'nielsen', 'scorecard',
          'chartbeat', 'parsely', 'adobe', 'omniture', 'sitecatalyst',
          'piwik', 'matomo', 'yandex', 'metrika', 'baidu', 'cnzz'
        ],
        marketing: [
          'fb', 'facebook', 'ads', 'advertising', 'marketing', 'track', 'pixel',
          'adnxs', 'adsystem', 'doubleclick', 'googlesyndication', 'amazon',
          'twitter', 'linkedin', 'pinterest', 'instagram', 'snapchat', 'tiktok',
          'youtube', 'vimeo', 'outbrain', 'taboola', 'criteo', 'medianet',
          'bing', 'yahoo', 'rtb', 'programmatic', 'retargeting', 'remarketing',
          'conversion', 'affiliate', 'partner', 'referral', 'campaign'
        ],
        preferences: [
          'pref', 'preference', 'settings', 'config', 'lang', 'language',
          'locale', 'theme', 'dark', 'light', 'currency', 'timezone',
          'region', 'country', 'city', 'location', 'accessibility',
          'font', 'size', 'color', 'layout', 'view', 'display',
          'remember', 'save', 'store', 'custom', 'personal', 'user'
        ]
      };
      
      // Verifica le categorie in ordine di priorità
      for (const [category, keywords] of Object.entries(cookieDatabase)) {
        if (keywords.some(keyword => lowerName.includes(keyword))) {
          return category;
        }
      }
      
      // Pattern matching avanzato per domini specifici
      const domainPatterns = {
        analytics: /^_(ga|gid|gat|utm|fbp|fbc|tj|hjid|hj|mp_|amp_|heap|fs_|mf_|ceg|qc|nr|sc|parsely|s_|adobe|omtr|piwik|matomo|ya|ba|cnzz)/,
        marketing: /^(fr|tr|ads|ad_|fb|ig|tw|li|pin|sc|tt|yt|vm|ob|tb|cto|mn|ms|yh|rtb|prog|retarg|conv|aff|ref|camp)/,
        preferences: /^(pref|set|cfg|lang|loc|theme|curr|tz|reg|acc|font|col|lay|view|disp|rem|sav|cust|pers|usr)/
      };
      
      for (const [category, pattern] of Object.entries(domainPatterns)) {
        if (pattern.test(lowerName)) {
          return category;
        }
      }
      
      return 'necessary'; // Default: necessari per sicurezza
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
    },
    
    // Scansiona script attivi
    scanScripts: function() {
      const scripts = {
        total: 0,
        blocked: 0,
        active: 0,
        byCategory: {
          necessary: [],
          analytics: [],
          marketing: [],
          preferences: []
        }
      };
      
      const allScripts = document.querySelectorAll('script');
      
      allScripts.forEach(script => {
        scripts.total++;
        
        let category = 'necessary';
        let isBlocked = false;
        
        // Verifica se è bloccato
        if (script.dataset.blocked === 'true') {
          isBlocked = true;
          scripts.blocked++;
          category = script.dataset.category || 'necessary';
        } else {
          scripts.active++;
          
          // Categorizza script attivi
          if (script.dataset.cookieCategory) {
            category = script.dataset.cookieCategory;
          } else if (script.src) {
            category = ScriptBlocker.categorizeScript(script.src);
          }
        }
        
        scripts.byCategory[category].push({
          src: script.src || 'inline',
          type: script.type,
          blocked: isBlocked,
          category: category,
          size: script.outerHTML.length
        });
      });
      
      return scripts;
    },
    
    // Genera sommario dei risultati
    generateSummary: function(cookies, storage, scripts) {
      const cookiesByCategory = {
        necessary: 0,
        analytics: 0,
        marketing: 0,
        preferences: 0
      };
      
      Object.values(cookies).forEach(cookie => {
        cookiesByCategory[cookie.category]++;
      });
      
      const storageByCategory = {
        necessary: 0,
        analytics: 0,
        marketing: 0,
        preferences: 0
      };
      
      [...storage.localStorage, ...storage.sessionStorage].forEach(item => {
        storageByCategory[item.category]++;
      });
      
      return {
        cookies: {
          total: Object.keys(cookies).length,
          byCategory: cookiesByCategory
        },
        storage: {
          total: storage.localStorage.length + storage.sessionStorage.length,
          localStorage: storage.localStorage.length,
          sessionStorage: storage.sessionStorage.length,
          byCategory: storageByCategory
        },
        scripts: {
          total: scripts.total,
          active: scripts.active,
          blocked: scripts.blocked,
          byCategory: {
            necessary: scripts.byCategory.necessary.length,
            analytics: scripts.byCategory.analytics.length,
            marketing: scripts.byCategory.marketing.length,
            preferences: scripts.byCategory.preferences.length
          }
        }
      };
    },
    
    // Avvia monitoraggio continuo
    startMonitoring: function() {
      if (this.scanInterval) {
        clearInterval(this.scanInterval);
      }
      
      // Scansiona ogni 10 secondi
      this.scanInterval = setInterval(() => {
        const newResults = this.scanCookies();
        
        // Controlla se ci sono cambiamenti
        if (this.hasChanges(newResults)) {
          console.log('🔄 Rilevati cambiamenti nei cookie/storage');
          
          // Verifica consensi se necessario
          const consent = ConsentManager.getConsent();
          if (consent) {
            ConsentManager.applyConsents(consent);
          }
        }
      }, 10000);
      
      console.log('👀 Monitoraggio cookie avviato');
    },
    
    // Ferma monitoraggio
    stopMonitoring: function() {
      if (this.scanInterval) {
        clearInterval(this.scanInterval);
        this.scanInterval = null;
        console.log('⏹️ Monitoraggio cookie fermato');
      }
    },
    
    // Verifica se ci sono cambiamenti
    hasChanges: function(newResults) {
      if (!this.lastScanResults) return true;
      
      const oldCookies = Object.keys(this.lastScanResults.cookies);
      const newCookies = Object.keys(newResults.cookies);
      
      return oldCookies.length !== newCookies.length || 
             !oldCookies.every(name => newCookies.includes(name));
    }
  };
  
  // === GESTIONE CONSENSI ===
  const ConsentManager = {
    STORAGE_KEY: 'cookie_consent_' + PROJECT_ID,
    
    // Verifica se il consenso è già stato dato
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
      
      // Sblocca script precedentemente bloccati
      ScriptBlocker.unblockScripts(consents);
      
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
      
      // Scansiona nuovamente i cookie dopo l'applicazione dei consensi
      setTimeout(() => {
        const scanResult = CookieScanner.scanCookies();
        console.log('Cookie scansionati dopo consenso:', scanResult);
      }, 1000);
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
    
    // Nasconde il banner e mostra l'iconcina persistente
    hideBanner: function() {
      const banner = document.getElementById('cookie-banner');
      if (banner) {
        banner.style.display = 'none';
      }
      
      // Mostra l'iconcina persistente se abilitata
      if (PROJECT_CONFIG.floatingIcon.enabled) {
        FloatingIcon.show();
      }
    }
  };
  
  // === COOKIE BANNER UI ===
  const BannerUI = {
    // Crea e mostra il banner
    show: function() {
      if (ConsentManager.hasConsent()) {
        return; // Non mostrare se il consenso è già stato dato
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
          <div class="cookie-settings-header">
            <h4>Personalizza le preferenze di consenso</h4>
            <button id="cookie-close-settings" class="cookie-close-btn">✕</button>
          </div>
          <div class="cookie-settings-description">
            <p>Utilizziamo i cookie per aiutarti a navigare in maniera efficiente e a svolgere determinate funzioni. Troverai informazioni dettagliate su tutti i cookie sotto ogni categoria di consensi sottostanti. I cookie categorizzati come "Necessari" vengono memorizzati sul tuo browser in quanto essenziali per consentire le funzionalità di base del sito.</p>
            <p>Utilizziamo inoltre cookie di terze parti che ci aiutano nell'analizzare come utilizzi questo sito web, memorizzare le tue preferenze e offrirti contenuti e pubblicità rilevanti per te. Questi cookie saranno memorizzati sul tuo browser solo a seguito del tuo consenso.</p>
            <p>Puoi decidere di attivare o disattivare alcuni o tutti questi cookie, ma la disattivazione di alcuni di questi potrebbe avere un impatto sulla tua esperienza sul browser.</p>
          </div>
          <div class="cookie-categories">
            <div class="cookie-category cookie-category-necessary">
              <div class="cookie-category-header">
                <label class="cookie-switch">
                  <input type="checkbox" id="consent-necessary" checked disabled>
                  <span class="cookie-slider"></span>
                </label>
                <div class="cookie-category-info">
                  <strong>🔒 Cookie Necessari</strong>
                  <small>Sempre attivi - Essenziali per il funzionamento base del sito web</small>
                </div>
              </div>
            </div>
            <div class="cookie-category">
              <div class="cookie-category-header">
                <label class="cookie-switch">
                  <input type="checkbox" id="consent-analytics" \${PROJECT_CONFIG.categories.analytics ? 'checked' : ''}>
                  <span class="cookie-slider"></span>
                </label>
                <div class="cookie-category-info">
                  <strong>📊 Cookie Analitici</strong>
                  <small>Ci aiutano a migliorare il sito analizzando come viene utilizzato</small>
                </div>
              </div>
              <div class="cookie-category-details">
                <p>Questi cookie raccolgono informazioni aggregate e anonime su come i visitatori utilizzano il sito web.</p>
              </div>
            </div>
            <div class="cookie-category">
              <div class="cookie-category-header">
                <label class="cookie-switch">
                  <input type="checkbox" id="consent-marketing" \${PROJECT_CONFIG.categories.marketing ? 'checked' : ''}>
                  <span class="cookie-slider"></span>
                </label>
                <div class="cookie-category-info">
                  <strong>📢 Cookie Marketing</strong>
                  <small>Utilizzati per mostrare annunci pertinenti e personalizzati</small>
                </div>
              </div>
              <div class="cookie-category-details">
                <p>Permettono di monitorare i visitatori sui siti web per mostrare annunci rilevanti e coinvolgenti.</p>
              </div>
            </div>
            <div class="cookie-category">
              <div class="cookie-category-header">
                <label class="cookie-switch">
                  <input type="checkbox" id="consent-preferences" \${PROJECT_CONFIG.categories.preferences ? 'checked' : ''}>
                  <span class="cookie-slider"></span>
                </label>
                <div class="cookie-category-info">
                  <strong>⚙️ Cookie Preferenze</strong>
                  <small>Memorizzano le tue preferenze e impostazioni personali</small>
                </div>
              </div>
              <div class="cookie-category-details">
                <p>Salvano informazioni su lingue, regioni, accessibilità e altre preferenze personalizzate.</p>
              </div>
            </div>
          </div>
          <div class="cookie-settings-buttons">
            <button id="cookie-accept-selected" class="cookie-btn cookie-btn-accept">
              ✅ \${config.texts.save_preferences}
            </button>
            <button id="cookie-accept-all-settings" class="cookie-btn cookie-btn-secondary">
              🍪 Accetta Tutti
            </button>
            <button id="cookie-reject-all-settings" class="cookie-btn cookie-btn-reject">
              🚫 Rifiuta Tutti
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
    
    // Mostra solo il pannello impostazioni (per iconcina persistente)
    showSettingsOnly: function() {
      const banner = this.createBanner();
      banner.querySelector('.cookie-banner-content').style.display = 'none';
      banner.querySelector('#cookie-settings-panel').style.display = 'block';
      banner.querySelector('#cookie-settings-panel').style.maxHeight = '800px';
      banner.querySelector('#cookie-settings-panel').style.opacity = '1';
      
      document.body.appendChild(banner);
      
      // Animazione di entrata
      setTimeout(() => {
        banner.style.transform = 'translateY(0)';
        banner.style.opacity = '1';
      }, 100);
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
        const isVisible = panel.style.display !== 'none';
        panel.style.display = isVisible ? 'none' : 'block';
        
        // Animazione
        if (!isVisible) {
          panel.style.maxHeight = '0';
          panel.style.opacity = '0';
          setTimeout(() => {
            panel.style.maxHeight = '800px';
            panel.style.opacity = '1';
          }, 10);
        }
      });
      
      // Chiudi pannello impostazioni
      banner.querySelector('#cookie-close-settings').addEventListener('click', () => {
        const panel = banner.querySelector('#cookie-settings-panel');
        panel.style.display = 'none';
        
        // Rimuove il banner e ricrea l'icona persistente
        banner.remove();
        if (PROJECT_CONFIG.floatingIcon.enabled) {
          FloatingIcon.show();
        }
      });
      
      // Salva impostazioni personalizzate
      banner.querySelector('#cookie-accept-selected').addEventListener('click', () => {
        const consents = {
          necessary: true, // Sempre true
          analytics: banner.querySelector('#consent-analytics').checked,
          marketing: banner.querySelector('#consent-marketing').checked,
          preferences: banner.querySelector('#consent-preferences').checked
        };
        ConsentManager.saveConsent(consents);
        
        // Rimuove il banner e ricrea l'icona persistente
        banner.remove();
        if (PROJECT_CONFIG.floatingIcon.enabled) {
          FloatingIcon.show();
        }
      });
      
      // Accetta tutti dal pannello impostazioni
      banner.querySelector('#cookie-accept-all-settings').addEventListener('click', () => {
        // Imposta tutti i checkbox
        banner.querySelector('#consent-analytics').checked = true;
        banner.querySelector('#consent-marketing').checked = true;
        banner.querySelector('#consent-preferences').checked = true;
        
        ConsentManager.saveConsent({
          necessary: true,
          analytics: true,
          marketing: true,
          preferences: true
        });
        
        // Rimuove il banner e ricrea l'icona persistente
        banner.remove();
        if (PROJECT_CONFIG.floatingIcon.enabled) {
          FloatingIcon.show();
        }
      });
      
      // Rifiuta tutti dal pannello impostazioni
      banner.querySelector('#cookie-reject-all-settings').addEventListener('click', () => {
        // Disattiva tutti i checkbox tranne necessari
        banner.querySelector('#consent-analytics').checked = false;
        banner.querySelector('#consent-marketing').checked = false;
        banner.querySelector('#consent-preferences').checked = false;
        
        ConsentManager.saveConsent({
          necessary: true,
          analytics: false,
          marketing: false,
          preferences: false
        });
        
        // Rimuove il banner e ricrea l'icona persistente
        banner.remove();
        if (PROJECT_CONFIG.floatingIcon.enabled) {
          FloatingIcon.show();
        }
      });
    }
  };
  
  // === ICONCINA PERSISTENTE ===
  const FloatingIcon = {
    // Mostra l'iconcina persistente
    show: function() {
      // Rimuove l'iconcina esistente se presente
      const existingIcon = document.getElementById('cookie-floating-icon');
      if (existingIcon) {
        existingIcon.remove();
      }
      
      const icon = this.createIcon();
      document.body.appendChild(icon);
      
      // Animazione di entrata
      setTimeout(() => {
        icon.style.transform = 'translateY(0) scale(1)';
        icon.style.opacity = '1';
      }, 100);
    },
    
    // Crea l'elemento iconcina
    createIcon: function() {
      const icon = document.createElement('div');
      icon.id = 'cookie-floating-icon';
      icon.innerHTML = \`
        <div class="floating-icon-content">
          <span class="floating-icon-text">\${PROJECT_CONFIG.floatingIcon.text}</span>
          <span class="floating-icon-tooltip">Gestisci Cookie</span>
        </div>
      \`;
      icon.style.cssText = this.getIconCSS();
      
      // Event listener per aprire le impostazioni
      icon.addEventListener('click', () => {
        this.openSettings();
      });
      
      return icon;
    },
    
    // Apre le impostazioni cookie
    openSettings: function() {
      // Rimuove l'iconcina
      const icon = document.getElementById('cookie-floating-icon');
      if (icon) {
        icon.remove();
      }
      
      // Mostra il banner con le impostazioni aperte
      BannerUI.showSettingsOnly();
    },
    
    // CSS per l'iconcina
    getIconCSS: function() {
      const config = PROJECT_CONFIG.floatingIcon;
      const positions = {
        'bottom-right': 'bottom: 20px; right: 20px;',
        'bottom-left': 'bottom: 20px; left: 20px;',
        'top-right': 'top: 20px; right: 20px;',
        'top-left': 'top: 20px; left: 20px;'
      };
      
      return \`
        position: fixed;
        \${positions[config.position] || positions['bottom-right']}
        z-index: 9999;
        background: \${config.backgroundColor};
        color: \${config.textColor};
        width: 60px;
        height: 60px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(20px) scale(0.8);
      \`;
    }
  };
  
  // === BLOCCO PREVENTIVO SCRIPT ===
  const ScriptBlocker = {
    // Lista di script da bloccare prima del consenso
    blockedScripts: [
      'googletagmanager.com/gtag/js',
      'google-analytics.com/analytics.js',
      'googletagmanager.com/gtm.js',
      'facebook.net/en_US/fbevents.js',
      'connect.facebook.net',
      'doubleclick.net',
      'googlesyndication.com',
      'hotjar.com',
      'mixpanel.com',
      'segment.com',
      'amplitude.com',
      'fullstory.com',
      'mouseflow.com',
      'crazyegg.com',
      'quantcast.com',
      'comscore.com',
      'chartbeat.com',
      'twitter.com/i/adsct',
      'linkedin.com/insight',
      'pinterest.com/ct',
      'snapchat.com/ct',
      'tiktok.com/i18n/pixel',
      'youtube.com/iframe_api',
      'vimeo.com/api',
      'outbrain.com',
      'taboola.com',
      'criteo.com',
      'amazon-adsystem.com',
      'bing.com/scripts',
      'yahoo.com/dot.gif',
      'yandex.ru/metrika',
      'baidu.com/h.js'
    ],
    
    // Referenze originali salvate
    originalCreateElement: null,
    originalAppendChild: null,
    originalCookieDescriptor: null,
    
    // Inizializza il blocco preventivo
    init: function() {
      console.log('🔒 Inizializzo ScriptBlocker...');
      
      // Salva referenze originali
      this.originalCreateElement = document.createElement;
      this.originalAppendChild = Element.prototype.appendChild;
      this.originalCookieDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');
      
      // Avvia tutti i blocchi
      this.blockScripts();
      this.blockExistingScripts();
      this.blockForms();
      this.interceptCookies();
      
      console.log('✅ ScriptBlocker inizializzato');
    },
    
    // Blocca script futuri
    blockScripts: function() {
      const self = this;
      
      // Intercetta creazione elementi
      document.createElement = function(tagName) {
        const element = self.originalCreateElement.call(this, tagName);
        
        // Gestisce sia script che immagini
        if (tagName.toLowerCase() === 'script') {
          self.processScript(element);
        } else if (tagName.toLowerCase() === 'img') {
          self.processImage(element);
        }
        
        return element;
      };
      
      // Intercetta inserimento nel DOM
      Element.prototype.appendChild = function(child) {
        if (child.tagName) {
          const tagName = child.tagName.toLowerCase();
          
          if (tagName === 'script') {
            self.processScript(child);
          } else if (tagName === 'img') {
            self.processImage(child);
          }
        }
        
        return self.originalAppendChild.call(this, child);
      };
      
      // Intercetta insertBefore
      const originalInsertBefore = Element.prototype.insertBefore;
      Element.prototype.insertBefore = function(newChild, referenceChild) {
        if (newChild.tagName) {
          const tagName = newChild.tagName.toLowerCase();
          
          if (tagName === 'script') {
            self.processScript(newChild);
          } else if (tagName === 'img') {
            self.processImage(newChild);
          }
        }
        
        return originalInsertBefore.call(this, newChild, referenceChild);
      };
    },
    
    // Processa script esistenti e futuri
    processScript: function(script) {
      const consent = ConsentManager.getConsent();
      
      // Gestione script con data-cookie-category
      if (script.dataset && script.dataset.cookieCategory) {
        const category = script.dataset.cookieCategory;
        
        if (!consent || !consent[category]) {
          console.log('🚫 Script bloccato per categoria:', category, script.src || script.textContent?.substr(0, 50));
          
          // Blocca lo script
          script.type = 'text/plain';
          script.dataset.blocked = 'true';
          script.dataset.originalType = 'text/javascript';
          script.dataset.category = category;
          
          // Salva src originale se presente
          if (script.src) {
            script.dataset.originalSrc = script.src;
            script.src = '';
          }
          
          // Salva contenuto originale se presente
          if (script.textContent) {
            script.dataset.originalContent = script.textContent;
            script.textContent = '';
          }
          
          return;
        }
      }
      
      // Gestione script per URL (fallback)
      if (script.src && !consent && this.isBlocked(script.src)) {
        const category = this.categorizeScript(script.src);
        console.log('🚫 Script bloccato per URL:', script.src, 'categoria:', category);
        
        script.type = 'text/plain';
        script.dataset.blocked = 'true';
        script.dataset.originalType = 'text/javascript';
        script.dataset.originalSrc = script.src;
        script.dataset.category = category;
        script.src = '';
      }
    },
    
    // Processa immagini (pixel tracking)
    processImage: function(img) {
      const consent = ConsentManager.getConsent();
      
      if (img.src && (!consent || !consent.marketing) && this.isTrackingPixel(img.src)) {
        console.log('🚫 Pixel di tracking bloccato:', img.src);
        img.dataset.originalSrc = img.src;
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        img.dataset.blocked = 'true';
      }
    },
    
    // Blocca script già presenti nel DOM
    blockExistingScripts: function() {
      const scripts = document.querySelectorAll('script[data-cookie-category]');
      console.log('🔍 Script esistenti da processare:', scripts.length);
      
      scripts.forEach(script => {
        this.processScript(script);
      });
      
      // Blocca anche immagini di tracking esistenti
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        this.processImage(img);
      });
    },
    
    // Blocca form tracking
    blockForms: function() {
      const self = this;
      const originalSubmit = HTMLFormElement.prototype.submit;
      
      HTMLFormElement.prototype.submit = function() {
        const consent = ConsentManager.getConsent();
        if (!consent || !consent.marketing) {
          // Rimuove eventuali pixel di tracking nei form
          const trackingElements = this.querySelectorAll('img[src*="facebook.com"], img[src*="google.com"], img[src*="doubleclick.net"]');
          trackingElements.forEach(el => el.remove());
          console.log('🚫 Pixel di tracking rimossi dal form');
        }
        
        return originalSubmit.call(this);
      };
    },
    
    // Intercetta l'impostazione dei cookie
    interceptCookies: function() {
      const self = this;
      
      Object.defineProperty(document, 'cookie', {
        get: function() {
          return self.originalCookieDescriptor.get.call(this);
        },
        set: function(value) {
          const consent = ConsentManager.getConsent();
          const cookieName = value.split('=')[0].trim();
          const category = CookieScanner.categorizeByName(cookieName);
          
          if (consent) {
            if (consent[category]) {
              return self.originalCookieDescriptor.set.call(this, value);
            } else {
              console.log('🚫 Cookie bloccato:', cookieName, 'categoria:', category);
              return;
            }
          }
          
          // Se non c'è consenso, blocca tutti i cookie tranne quelli necessari
          if (category === 'necessary') {
            return self.originalCookieDescriptor.set.call(this, value);
          } else {
            console.log('🚫 Cookie bloccato (senza consenso):', cookieName, 'categoria:', category);
            return;
          }
        },
        configurable: true
      });
    },
    
    // Verifica se uno script è bloccato
    isBlocked: function(url) {
      return this.blockedScripts.some(blocked => url.includes(blocked));
    },
    
    // Verifica se un'immagine è un pixel di tracking
    isTrackingPixel: function(url) {
      const trackingDomains = [
        'facebook.com/tr',
        'google.com/ads',
        'doubleclick.net',
        'googleadservices.com',
        'googlesyndication.com',
        'amazon-adsystem.com',
        'bing.com/tr',
        'yahoo.com/dot.gif',
        'twitter.com/i/adsct',
        'linkedin.com/insight',
        'pinterest.com/ct',
        'snapchat.com/ct',
        'tiktok.com/i18n/pixel'
      ];
      
      return trackingDomains.some(domain => url.includes(domain));
    },
    
    // Riattiva script bloccati dopo consenso
    unblockScripts: function(consents) {
      console.log('🔓 Riattivando script per consensi:', consents);
      
      // Riattiva script con data-cookie-category
      const blockedScripts = document.querySelectorAll('script[data-blocked="true"]');
      
      blockedScripts.forEach(script => {
        const category = script.dataset.category;
        
        if (category && consents[category]) {
          console.log('✅ Riattivando script categoria:', category);
          
          // Ripristina tipo
          script.type = script.dataset.originalType || 'text/javascript';
          
          // Ripristina src se presente
          if (script.dataset.originalSrc) {
            script.src = script.dataset.originalSrc;
          }
          
          // Ripristina contenuto se presente
          if (script.dataset.originalContent) {
            script.textContent = script.dataset.originalContent;
          }
          
          // Pulisci attributi di blocco
          script.removeAttribute('data-blocked');
          script.removeAttribute('data-original-src');
          script.removeAttribute('data-original-content');
          script.removeAttribute('data-original-type');
          script.removeAttribute('data-category');
          
          // Se lo script ha src, ricrea l'elemento per eseguirlo
          if (script.src) {
            const newScript = document.createElement('script');
            newScript.src = script.src;
            newScript.type = 'text/javascript';
            
            // Copia attributi
            Array.from(script.attributes).forEach(attr => {
              if (!attr.name.startsWith('data-') && attr.name !== 'src' && attr.name !== 'type') {
                newScript.setAttribute(attr.name, attr.value);
              }
            });
            
            script.parentNode.replaceChild(newScript, script);
          } else if (script.textContent) {
            // Per script inline, ricrea l'elemento
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;
            newScript.type = 'text/javascript';
            
            script.parentNode.replaceChild(newScript, script);
          }
        }
      });
      
      // Riattiva pixel di tracking se necessario
      if (consents.marketing) {
        const blockedImages = document.querySelectorAll('img[data-blocked="true"]');
        blockedImages.forEach(img => {
          if (img.dataset.originalSrc) {
            console.log('✅ Riattivando pixel di tracking');
            img.src = img.dataset.originalSrc;
            img.removeAttribute('data-blocked');
            img.removeAttribute('data-original-src');
          }
        });
      }
    },
    
    // Categorizza script per URL
    categorizeScript: function(url) {
      const lowerUrl = url.toLowerCase();
      
      // Analytics
      if (lowerUrl.includes('google-analytics') || lowerUrl.includes('gtag') || lowerUrl.includes('gtm') || 
          lowerUrl.includes('hotjar') || lowerUrl.includes('mixpanel') || lowerUrl.includes('segment') ||
          lowerUrl.includes('amplitude') || lowerUrl.includes('fullstory') || lowerUrl.includes('mouseflow') ||
          lowerUrl.includes('crazyegg') || lowerUrl.includes('quantcast') || lowerUrl.includes('comscore') ||
          lowerUrl.includes('chartbeat') || lowerUrl.includes('parsely') || lowerUrl.includes('adobe') ||
          lowerUrl.includes('omniture') || lowerUrl.includes('piwik') || lowerUrl.includes('matomo') ||
          lowerUrl.includes('yandex') || lowerUrl.includes('metrika') || lowerUrl.includes('baidu')) {
        return 'analytics';
      }
      
      // Marketing
      if (lowerUrl.includes('facebook') || lowerUrl.includes('doubleclick') || lowerUrl.includes('googlesyndication') ||
          lowerUrl.includes('amazon-adsystem') || lowerUrl.includes('twitter') || lowerUrl.includes('linkedin') ||
          lowerUrl.includes('pinterest') || lowerUrl.includes('snapchat') || lowerUrl.includes('tiktok') ||
          lowerUrl.includes('outbrain') || lowerUrl.includes('taboola') || lowerUrl.includes('criteo') ||
          lowerUrl.includes('bing') || lowerUrl.includes('yahoo')) {
        return 'marketing';
      }
      
      // Preferences
      if (lowerUrl.includes('preferences') || lowerUrl.includes('settings') || lowerUrl.includes('config') ||
          lowerUrl.includes('theme') || lowerUrl.includes('lang') || lowerUrl.includes('locale')) {
        return 'preferences';
      }
      
      return 'necessary';
    }
  };
  
  // === INIZIALIZZAZIONE ===
  
  // Inizializza il blocco preventivo IMMEDIATAMENTE
  ScriptBlocker.init();
  
  // Aspetta che il DOM sia pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
    console.log('🚀 Inizializzando CookieYes per progetto:', PROJECT_ID);
    
    // Controlla se il consenso è già stato dato
    const existingConsent = ConsentManager.getConsent();
    
    if (existingConsent) {
      // Se il consenso esiste, applica i consensi e mostra l'iconcina
      console.log('✅ Consenso esistente trovato:', existingConsent);
      ConsentManager.applyConsents(existingConsent);
      
      // Mostra l'iconcina persistente se abilitata
      if (PROJECT_CONFIG.floatingIcon.enabled) {
        FloatingIcon.show();
      }
    } else {
      // Se non c'è consenso, mostra il banner
      console.log('⚠️ Nessun consenso trovato, mostrando banner');
      BannerUI.show();
    }
    
    // Avvia monitoraggio automatico
    CookieScanner.startMonitoring();
    
    // Scansiona immediatamente
    setTimeout(() => {
      CookieScanner.scanCookies();
    }, 1000);
    
    // API globale per gestione manuale
    window.CookieConsent = {
      // Interfaccia base
      show: BannerUI.show,
      showIcon: FloatingIcon.show,
      showSettings: BannerUI.showSettingsOnly,
      hide: () => {
        const banner = document.getElementById('cookie-banner');
        if (banner) banner.remove();
      },
      
      // Gestione consensi
      getConsent: ConsentManager.getConsent,
      updateConsent: ConsentManager.saveConsent,
      hasConsent: ConsentManager.hasConsent,
      
      // Scansione e monitoraggio
      scanCookies: CookieScanner.scanCookies,
      startMonitoring: CookieScanner.startMonitoring,
      stopMonitoring: CookieScanner.stopMonitoring,
      getLastScan: () => CookieScanner.lastScanResults,
      
      // Utilità
      categorizeByName: CookieScanner.categorizeByName,
      isBlocked: ScriptBlocker.isBlocked,
      
      // Informazioni progetto
      getProjectInfo: () => ({
        id: PROJECT_ID,
        config: PROJECT_CONFIG,
        version: '2.0.0'
      })
    };
    
    // Evento personalizzato per notificare il caricamento
    window.dispatchEvent(new CustomEvent('cookieSystemReady', {
      detail: {
        projectId: PROJECT_ID,
        hasConsent: !!existingConsent,
        api: window.CookieConsent
      }
    }));
    
    console.log('✅ CookieYes inizializzato completamente');
    console.log('💡 API disponibile tramite window.CookieConsent');
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
      padding: 0;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      border: 1px solid rgba(0,0,0,0.1);
      overflow: hidden;
      transition: all 0.3s ease;
    }
    
    #cookie-banner .cookie-settings-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    #cookie-banner .cookie-settings-header h4 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }
    
    #cookie-banner .cookie-close-btn {
      background: rgba(255,255,255,0.2);
      border: none;
      color: white;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      transition: all 0.2s ease;
    }
    
    #cookie-banner .cookie-close-btn:hover {
      background: rgba(255,255,255,0.3);
    }
    
    #cookie-banner .cookie-settings-description {
      padding: 20px;
      margin: 0;
      background: #f8f9fa;
      color: #666;
      font-size: 14px;
      line-height: 1.5;
    }
    
    #cookie-banner .cookie-settings-description p {
      margin: 0 0 15px 0;
      line-height: 1.6;
    }
    
    #cookie-banner .cookie-settings-description p:last-child {
      margin-bottom: 0;
    }
    
    #cookie-banner .cookie-categories {
      padding: 20px;
    }
    
    #cookie-banner .cookie-category {
      margin: 0 0 20px 0;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e9ecef;
      transition: all 0.2s ease;
    }
    
    #cookie-banner .cookie-category:hover {
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    #cookie-banner .cookie-category-necessary {
      background: #e8f5e8;
      border-color: #c3e6c3;
    }
    
    #cookie-banner .cookie-category-header {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    
    #cookie-banner .cookie-category-info strong {
      display: block;
      font-size: 16px;
      margin-bottom: 5px;
      color: #333;
    }
    
    #cookie-banner .cookie-category-info small {
      color: #666;
      font-size: 13px;
      line-height: 1.4;
    }
    
    #cookie-banner .cookie-category-details {
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid rgba(0,0,0,0.1);
    }
    
    #cookie-banner .cookie-category-details p {
      margin: 0;
      color: #666;
      font-size: 13px;
      line-height: 1.4;
    }
    
    /* Toggle Switch Styles */
    #cookie-banner .cookie-switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
      flex-shrink: 0;
    }
    
    #cookie-banner .cookie-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    #cookie-banner .cookie-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: .4s;
      border-radius: 34px;
    }
    
    #cookie-banner .cookie-slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
    
    #cookie-banner .cookie-switch input:checked + .cookie-slider {
      background-color: #4CAF50;
    }
    
    #cookie-banner .cookie-switch input:disabled + .cookie-slider {
      background-color: #4CAF50;
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    #cookie-banner .cookie-switch input:checked + .cookie-slider:before {
      transform: translateX(26px);
    }
    
    #cookie-banner .cookie-settings-buttons {
      padding: 20px;
      background: #f8f9fa;
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    #cookie-banner .cookie-btn-secondary {
      background: #6c757d;
      color: white;
      border: 1px solid #6c757d;
    }
    
    #cookie-banner .cookie-btn-secondary:hover {
      background: #5a6268;
      border-color: #5a6268;
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
      
      #cookie-banner .cookie-settings-panel {
        margin: 10px;
        border-radius: 8px;
      }
      
      #cookie-banner .cookie-category-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }
      
      #cookie-banner .cookie-switch {
        align-self: flex-end;
      }
      
      #cookie-banner .cookie-settings-buttons {
        flex-direction: column;
      }
      
      #cookie-banner .cookie-btn {
        width: 100%;
        margin: 5px 0;
      }
    }
    
    /* === STILI ICONCINA PERSISTENTE === */
    
    #cookie-floating-icon {
      position: fixed;
      z-index: 9999;
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }
    
    #cookie-floating-icon .floating-icon-content {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
    
    #cookie-floating-icon .floating-icon-text {
      font-size: 20px;
      font-weight: bold;
      text-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }
    
    #cookie-floating-icon .floating-icon-tooltip {
      position: absolute;
      bottom: 70px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      pointer-events: none;
    }
    
    #cookie-floating-icon .floating-icon-tooltip:before {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 5px solid transparent;
      border-top-color: rgba(0,0,0,0.8);
    }
    
    #cookie-floating-icon:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 6px 20px rgba(0,0,0,0.2);
    }
    
    #cookie-floating-icon:hover .floating-icon-tooltip {
      opacity: 1;
      visibility: visible;
    }
    
    #cookie-floating-icon:active {
      transform: translateY(0) scale(0.95);
    }
    
    /* Responsive per iconcina */
    @media (max-width: 768px) {
      #cookie-floating-icon {
        width: 50px;
        height: 50px;
        font-size: 18px;
      }
      
      #cookie-floating-icon .floating-icon-text {
        font-size: 18px;
      }
      
      #cookie-floating-icon .floating-icon-tooltip {
        bottom: 60px;
        font-size: 11px;
      }
    }
  \`;
  document.head.appendChild(style);
  
})();`;
}

function generateFallbackScript(): string {
  return `
// Script di fallback per CookieYes
console.warn('CookieYes: Configurazione progetto non trovata, uso script di fallback');

// Banner semplice di fallback
(function() {
  if (localStorage.getItem('cookie_consent_fallback')) return;
  
  const banner = document.createElement('div');
  banner.innerHTML = '<div style="background:#333;color:white;padding:15px;position:fixed;bottom:0;left:0;right:0;z-index:9999;text-align:center;">Questo sito utilizza cookie. <button onclick="localStorage.setItem(\\'cookie_consent_fallback\\',\\'true\\');this.parentElement.remove();" style="background:#4f46e5;color:white;border:none;padding:5px 15px;margin-left:10px;border-radius:3px;cursor:pointer;">Accetta</button></div>';
  document.body.appendChild(banner);
})();`;
} 