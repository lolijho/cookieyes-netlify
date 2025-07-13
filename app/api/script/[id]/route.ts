import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;
    console.log('🔍 Generando script per progetto:', projectId);

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
        console.log('✅ Progetto trovato:', project.name);
      }
    } catch (error) {
      console.log('⚠️ Errore nel recupero del progetto:', error);
    }

    // Se non trovato, usa configurazione di default ottimizzata per fisiopoint.net
    if (!project) {
      project = {
        id: projectId,
        name: 'FisioPoint Cookie Manager',
        domain: 'fisiopoint.net',
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
      console.log('📋 Usando configurazione di default per fisiopoint.net');
    }

    // Genera lo script ottimizzato
    const script = generateOptimizedScript(project);

    return new Response(script, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=300',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });

  } catch (error) {
    console.error('❌ Errore nella generazione dello script:', error);
    
    // Ritorna script di fallback semplificato
    const fallbackScript = generateSimpleFallbackScript();
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

function generateOptimizedScript(project: any): string {
  const config = project.banner_config;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://cookie-1-q8jw9wp4t-lolijhos-projects.vercel.app';
  
  return `
(function() {
  'use strict';
  
  console.log('🚀 Cookie Facile - Inizializzazione per fisiopoint.net');
  
  // === CONFIGURAZIONE ===
  const PROJECT_ID = '${project.id}';
  const PROJECT_CONFIG = ${JSON.stringify(config)};
  const API_BASE = '${baseUrl}';
  const STORAGE_KEY = 'fisiopoint_cookie_consent';
  
  // === GESTIONE CONSENSI ===
  const ConsentManager = {
    hasConsent: function() {
      return localStorage.getItem(STORAGE_KEY) !== null;
    },
    
    getConsent: function() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
      } catch (e) {
        console.warn('Errore nel recupero consenso:', e);
        return null;
      }
    },
    
    saveConsent: function(consents) {
      const consentData = {
        ...consents,
        timestamp: Date.now(),
        version: '2.0',
        projectId: PROJECT_ID
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consentData));
      this.applyConsents(consents);
      this.hideBanner();
      
      console.log('✅ Consenso salvato:', consents);
      
      // Invia al server (non bloccante)
      this.sendToServer(consentData);
    },
    
    applyConsents: function(consents) {
      // Gestisce Google Analytics
      if (consents.analytics && typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: consents.marketing ? 'granted' : 'denied'
        });
      }
      
      // Gestisce Facebook Pixel
      if (consents.marketing && typeof fbq !== 'undefined') {
        fbq('consent', 'grant');
      }
      
      // Rimuove cookie non autorizzati
      this.cleanupCookies(consents);
    },
    
    cleanupCookies: function(consents) {
      const cookies = document.cookie.split(';');
      cookies.forEach(cookie => {
        const [name] = cookie.trim().split('=');
        if (name && !this.isNecessaryCookie(name)) {
          if (!consents.analytics && this.isAnalyticsCookie(name)) {
            this.removeCookie(name);
          }
          if (!consents.marketing && this.isMarketingCookie(name)) {
            this.removeCookie(name);
          }
        }
      });
    },
    
    isNecessaryCookie: function(name) {
      const necessary = ['session', 'csrf', 'auth', 'phpsessid', 'wordpress_logged_in'];
      return necessary.some(n => name.toLowerCase().includes(n));
    },
    
    isAnalyticsCookie: function(name) {
      const analytics = ['_ga', '_gid', '_gat', '_utm', 'analytics'];
      return analytics.some(n => name.toLowerCase().includes(n));
    },
    
    isMarketingCookie: function(name) {
      const marketing = ['_fbp', 'fr', 'ads', 'tracking'];
      return marketing.some(n => name.toLowerCase().includes(n));
    },
    
    removeCookie: function(name) {
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname + ';';
    },
    
    sendToServer: function(consentData) {
      fetch(API_BASE + '/api/consents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: PROJECT_ID,
          consents: consentData,
          domain: window.location.hostname,
          userAgent: navigator.userAgent,
          url: window.location.href,
          timestamp: new Date().toISOString()
        })
      }).catch(err => console.warn('Errore invio consensi:', err));
    },
    
    hideBanner: function() {
      const banner = document.getElementById('cookie-banner');
      if (banner) {
        banner.style.display = 'none';
      }
      
      if (PROJECT_CONFIG.floatingIcon.enabled) {
        FloatingIcon.show();
      }
    }
  };
  
  // === BANNER UI ===
  const BannerUI = {
    show: function() {
      if (ConsentManager.hasConsent()) {
        return;
      }
      
      const banner = this.createBanner();
      document.body.appendChild(banner);
      
      setTimeout(() => {
        banner.style.transform = 'translateY(0)';
        banner.style.opacity = '1';
      }, 100);
    },
    
    createBanner: function() {
      const banner = document.createElement('div');
      banner.id = 'cookie-banner';
      banner.innerHTML = this.getBannerHTML();
      banner.style.cssText = this.getBannerCSS();
      this.attachEventListeners(banner);
      return banner;
    },
    
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
            <p>Utilizziamo i cookie per aiutarti a navigare in maniera efficiente e a svolgere determinate funzioni.</p>
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
      
      // Rifiuta tutti
      banner.querySelector('#cookie-reject-all').addEventListener('click', () => {
        ConsentManager.saveConsent({
          necessary: true,
          analytics: false,
          marketing: false,
          preferences: false
        });
      });
      
      // Mostra impostazioni
      banner.querySelector('#cookie-settings').addEventListener('click', () => {
        const panel = banner.querySelector('#cookie-settings-panel');
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
      });
      
      // Chiudi impostazioni
      banner.querySelector('#cookie-close-settings').addEventListener('click', () => {
        banner.remove();
        if (PROJECT_CONFIG.floatingIcon.enabled) {
          FloatingIcon.show();
        }
      });
      
      // Salva impostazioni personalizzate
      banner.querySelector('#cookie-accept-selected').addEventListener('click', () => {
        const consents = {
          necessary: true,
          analytics: banner.querySelector('#consent-analytics').checked,
          marketing: banner.querySelector('#consent-marketing').checked,
          preferences: banner.querySelector('#consent-preferences').checked
        };
        ConsentManager.saveConsent(consents);
        banner.remove();
        if (PROJECT_CONFIG.floatingIcon.enabled) {
          FloatingIcon.show();
        }
      });
      
      // Accetta tutti dalle impostazioni
      banner.querySelector('#cookie-accept-all-settings').addEventListener('click', () => {
        banner.querySelector('#consent-analytics').checked = true;
        banner.querySelector('#consent-marketing').checked = true;
        banner.querySelector('#consent-preferences').checked = true;
        ConsentManager.saveConsent({
          necessary: true,
          analytics: true,
          marketing: true,
          preferences: true
        });
        banner.remove();
        if (PROJECT_CONFIG.floatingIcon.enabled) {
          FloatingIcon.show();
        }
      });
      
      // Rifiuta tutti dalle impostazioni
      banner.querySelector('#cookie-reject-all-settings').addEventListener('click', () => {
        banner.querySelector('#consent-analytics').checked = false;
        banner.querySelector('#consent-marketing').checked = false;
        banner.querySelector('#consent-preferences').checked = false;
        ConsentManager.saveConsent({
          necessary: true,
          analytics: false,
          marketing: false,
          preferences: false
        });
        banner.remove();
        if (PROJECT_CONFIG.floatingIcon.enabled) {
          FloatingIcon.show();
        }
      });
    }
  };
  
  // === ICONCINA PERSISTENTE ===
  const FloatingIcon = {
    show: function() {
      const existingIcon = document.getElementById('cookie-floating-icon');
      if (existingIcon) {
        existingIcon.remove();
      }
      
      const icon = this.createIcon();
      document.body.appendChild(icon);
      
      setTimeout(() => {
        icon.style.transform = 'translateY(0) scale(1)';
        icon.style.opacity = '1';
      }, 100);
    },
    
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
      
      icon.addEventListener('click', () => {
        this.openSettings();
      });
      
      return icon;
    },
    
    openSettings: function() {
      const icon = document.getElementById('cookie-floating-icon');
      if (icon) {
        icon.remove();
      }
      BannerUI.show();
    },
    
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
  function init() {
    console.log('🚀 Cookie Facile - Inizializzazione completata');
    
    const existingConsent = ConsentManager.getConsent();
    
    if (existingConsent) {
      console.log('✅ Consenso esistente trovato');
      ConsentManager.applyConsents(existingConsent);
      
      if (PROJECT_CONFIG.floatingIcon.enabled) {
        FloatingIcon.show();
      }
    } else {
      console.log('⚠️ Nessun consenso trovato, mostrando banner');
      BannerUI.show();
    }
    
    // API globale
    window.CookieConsent = {
      show: BannerUI.show,
      showIcon: FloatingIcon.show,
      getConsent: ConsentManager.getConsent,
      updateConsent: ConsentManager.saveConsent,
      hasConsent: ConsentManager.hasConsent
    };
    
    // Evento di completamento
    window.dispatchEvent(new CustomEvent('cookieSystemReady', {
      detail: {
        projectId: PROJECT_ID,
        hasConsent: !!existingConsent,
        api: window.CookieConsent
      }
    }));
  }
  
  // Aspetta che il DOM sia pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // CSS globale
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
    
    #cookie-banner .cookie-settings-description {
      padding: 20px;
      margin: 0;
      background: #f8f9fa;
      color: #666;
      font-size: 14px;
      line-height: 1.5;
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
    
    #cookie-floating-icon {
      position: fixed;
      z-index: 9999;
      cursor: pointer;
      user-select: none;
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

function generateSimpleFallbackScript(): string {
  return `
// Script di fallback per Cookie Facile - fisiopoint.net
console.warn('Cookie Facile: Configurazione non trovata, uso script di fallback');

(function() {
  if (localStorage.getItem('fisiopoint_cookie_consent')) return;
  
  const banner = document.createElement('div');
  banner.innerHTML = '<div style="background:#333;color:white;padding:15px;position:fixed;bottom:0;left:0;right:0;z-index:9999;text-align:center;font-family:Arial,sans-serif;">Questo sito utilizza cookie per migliorare la tua esperienza. <button onclick="localStorage.setItem(\\'fisiopoint_cookie_consent\\',\\'true\\');this.parentElement.remove();" style="background:#4f46e5;color:white;border:none;padding:8px 16px;margin-left:10px;border-radius:4px;cursor:pointer;font-size:14px;">Accetta</button></div>';
  document.body.appendChild(banner);
})();`;
} 