import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;

    // Cerca il progetto nel backup Turso
    let project = null;
    try {
      const projectResult = await db.execute({
        sql: 'SELECT * FROM project_backups WHERE id = ? ORDER BY backup_timestamp DESC LIMIT 1',
        args: [projectId]
      });

      if (projectResult.rows.length > 0) {
        const row = projectResult.rows[0];
        project = {
          id: row.id,
          domain: row.domain,
          language: row.language,
          banner_config: JSON.parse(row.banner_config as string)
        };
      }
    } catch (error) {
      console.log('Progetto non trovato nel backup, uso configurazione di default');
    }

    // Se non trovato nel backup, usa configurazione di default
    if (!project) {
      project = {
        id: projectId,
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
    }

    // Genera lo script JavaScript completo
    const generatedScript = generateCookieBannerScript(project);

    return new NextResponse(generatedScript, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'public, max-age=300', // Cache per 5 minuti
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    console.error('Errore nella generazione script:', error);
    
    // Restituisce uno script di fallback funzionante
    const fallbackScript = generateFallbackScript();
    return new NextResponse(fallbackScript, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
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
  
  // === INIZIALIZZAZIONE ===
  
  // Aspetta che il DOM sia pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
    // Controlla se il consenso è già stato dato
    const existingConsent = ConsentManager.getConsent();
    
    if (existingConsent) {
      // Se il consenso esiste, applica i consensi e mostra l'iconcina
      ConsentManager.applyConsents(existingConsent);
      
      // Mostra l'iconcina persistente se abilitata
      if (PROJECT_CONFIG.floatingIcon.enabled) {
        FloatingIcon.show();
      }
    } else {
      // Se non c'è consenso, mostra il banner
      BannerUI.show();
    }
    
    // API globale per gestione manuale
    window.CookieConsent = {
      show: BannerUI.show,
      showIcon: FloatingIcon.show,
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