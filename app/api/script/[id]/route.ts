import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@libsql/client';

// Inizializza client Turso
const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;

    // Recupera il progetto e le sue configurazioni
    const projectResult = await client.execute({
      sql: 'SELECT * FROM projects WHERE id = ?',
      args: [projectId]
    });

    if (projectResult.rows.length === 0) {
      return new NextResponse('Progetto non trovato', { status: 404 });
    }

    const project = projectResult.rows[0];

    // Recupera le categorie del progetto
    const categoriesResult = await client.execute({
      sql: 'SELECT * FROM cookie_categories WHERE project_id = ? ORDER BY created_at ASC',
      args: [projectId]
    });

    const categories = categoriesResult.rows;

    // Recupera gli script di tracciamento
    const scriptsResult = await client.execute({
      sql: 'SELECT * FROM tracking_scripts WHERE project_id = ? AND is_active = 1',
      args: [projectId]
    });

    const scripts = scriptsResult.rows;

    // Genera lo script JavaScript
    const generatedScript = generateCookieBannerScript(project, categories, scripts);

    return new NextResponse(generatedScript, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=3600', // Cache per 1 ora
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    console.error('Errore nella generazione script:', error);
    return new NextResponse('Errore interno del server', { status: 500 });
  }
}

function generateCookieBannerScript(project: any, categories: any[], scripts: any[]): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://cookie-1-8iwazbbez-lolijhos-projects.vercel.app';
  
  return `
(function() {
  'use strict';
  
  // Configurazione progetto
  const PROJECT_ID = '${project.id}';
  const PROJECT_CONFIG = {
    domain: '${project.domain}',
    language: '${project.language}',
    position: '${project.banner_position}',
    title: '${project.banner_title}',
    description: '${project.banner_description}',
    acceptText: '${project.banner_accept_text}',
    rejectText: '${project.banner_reject_text}',
    customizeText: '${project.banner_customize_text}',
    bgColor: '${project.banner_bg_color}',
    textColor: '${project.banner_text_color}',
    acceptBgColor: '${project.banner_accept_bg_color}',
    acceptTextColor: '${project.banner_accept_text_color}',
    rejectBgColor: '${project.banner_reject_bg_color}',
    rejectTextColor: '${project.banner_reject_text_color}'
  };
  
  // Categorie disponibili
  const CATEGORIES = ${JSON.stringify(categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    displayName: cat.display_name,
    description: cat.description,
    isRequired: cat.is_required,
    isEnabled: cat.is_enabled
  })))};
  
  // Script di tracciamento
  const TRACKING_SCRIPTS = ${JSON.stringify(scripts.map(script => ({
    id: script.id,
    name: script.name,
    category: script.category,
    code: script.script_code
  })))};
  
  // Utilità
  const CookieManager = {
    // Ottieni un cookie
    getCookie: function(name) {
      const value = '; ' + document.cookie;
      const parts = value.split('; ' + name + '=');
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    },
    
    // Imposta un cookie
    setCookie: function(name, value, days = 365) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = name + '=' + value + '; expires=' + date.toUTCString() + '; path=/; SameSite=Lax';
    },
    
    // Cancella un cookie
    deleteCookie: function(name) {
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    },
    
    // Ottieni consensi salvati
    getConsents: function() {
      const consents = this.getCookie('cookie_consents_' + PROJECT_ID);
      if (consents) {
        try {
          return JSON.parse(consents);
        } catch (e) {
          return null;
        }
      }
      return null;
    },
    
    // Salva consensi
    setConsents: function(consents) {
      this.setCookie('cookie_consents_' + PROJECT_ID, JSON.stringify(consents));
      this.executeScripts(consents);
      this.sendConsentsToServer(consents);
    },
    
    // Esegui script in base ai consensi
    executeScripts: function(consents) {
      TRACKING_SCRIPTS.forEach(script => {
        if (consents[script.category]) {
          try {
            eval(script.code);
          } catch (e) {
            console.error('Errore nell\\'esecuzione script:', script.name, e);
          }
        }
      });
    },
    
    // Invia consensi al server
    sendConsentsToServer: function(consents) {
      fetch('${baseUrl}/api/consents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: PROJECT_ID,
          consents: consents,
          domain: window.location.hostname,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        })
      }).catch(e => console.error('Errore invio consensi:', e));
    }
  };
  
  // Creazione del banner
  const BannerManager = {
    banner: null,
    
    createBanner: function() {
      if (this.banner) return;
      
      this.banner = document.createElement('div');
      this.banner.id = 'cookie-banner-' + PROJECT_ID;
      this.banner.innerHTML = \`
        <div id="cookie-banner-backdrop" style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999998;
          display: flex;
          align-items: \${PROJECT_CONFIG.position === 'top' ? 'flex-start' : 'flex-end'};
          justify-content: center;
          padding: 20px;
        ">
          <div id="cookie-banner-content" style="
            background: \${PROJECT_CONFIG.bgColor};
            color: \${PROJECT_CONFIG.textColor};
            padding: 20px;
            border-radius: 10px;
            max-width: 600px;
            width: 100%;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            line-height: 1.5;
          ">
            <h3 style="
              margin: 0 0 15px 0;
              font-size: 18px;
              font-weight: 600;
              color: \${PROJECT_CONFIG.textColor};
            ">\${PROJECT_CONFIG.title}</h3>
            <p style="
              margin: 0 0 20px 0;
              color: \${PROJECT_CONFIG.textColor};
              opacity: 0.9;
            ">\${PROJECT_CONFIG.description}</p>
            <div id="cookie-categories" style="
              margin-bottom: 20px;
              display: none;
            ">
              \${CATEGORIES.map(cat => \`
                <div style="
                  margin-bottom: 10px;
                  padding: 10px;
                  background: rgba(0, 0, 0, 0.05);
                  border-radius: 5px;
                ">
                  <label style="
                    display: flex;
                    align-items: center;
                    cursor: \${cat.isRequired ? 'not-allowed' : 'pointer'};
                    font-weight: 500;
                  ">
                    <input type="checkbox" 
                           id="consent-\${cat.name}" 
                           \${cat.isRequired ? 'checked disabled' : ''}
                           style="margin-right: 10px;">
                    <span>\${cat.displayName}</span>
                  </label>
                  <p style="
                    margin: 5px 0 0 30px;
                    font-size: 12px;
                    opacity: 0.8;
                  ">\${cat.description || ''}</p>
                </div>
              \`).join('')}
            </div>
            <div style="
              display: flex;
              gap: 10px;
              flex-wrap: wrap;
            ">
              <button id="cookie-accept-all" style="
                background: \${PROJECT_CONFIG.acceptBgColor};
                color: \${PROJECT_CONFIG.acceptTextColor};
                border: none;
                padding: 12px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: 500;
                font-size: 14px;
                transition: opacity 0.2s;
              " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
                \${PROJECT_CONFIG.acceptText}
              </button>
              <button id="cookie-reject-all" style="
                background: \${PROJECT_CONFIG.rejectBgColor};
                color: \${PROJECT_CONFIG.rejectTextColor};
                border: none;
                padding: 12px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: 500;
                font-size: 14px;
                transition: opacity 0.2s;
              " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
                \${PROJECT_CONFIG.rejectText}
              </button>
              <button id="cookie-customize" style="
                background: transparent;
                color: \${PROJECT_CONFIG.textColor};
                border: 2px solid \${PROJECT_CONFIG.textColor};
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: 500;
                font-size: 14px;
                transition: all 0.2s;
              " onmouseover="this.style.background='\${PROJECT_CONFIG.textColor}'; this.style.color='\${PROJECT_CONFIG.bgColor}'" onmouseout="this.style.background='transparent'; this.style.color='\${PROJECT_CONFIG.textColor}'">
                \${PROJECT_CONFIG.customizeText}
              </button>
            </div>
          </div>
        </div>
      \`;
      
      document.body.appendChild(this.banner);
      this.attachEventListeners();
    },
    
    attachEventListeners: function() {
      const acceptBtn = document.getElementById('cookie-accept-all');
      const rejectBtn = document.getElementById('cookie-reject-all');
      const customizeBtn = document.getElementById('cookie-customize');
      const categoriesDiv = document.getElementById('cookie-categories');
      
      acceptBtn.addEventListener('click', () => {
        const consents = {};
        CATEGORIES.forEach(cat => {
          consents[cat.name] = true;
        });
        CookieManager.setConsents(consents);
        this.hideBanner();
      });
      
      rejectBtn.addEventListener('click', () => {
        const consents = {};
        CATEGORIES.forEach(cat => {
          consents[cat.name] = cat.isRequired;
        });
        CookieManager.setConsents(consents);
        this.hideBanner();
      });
      
      customizeBtn.addEventListener('click', () => {
        const isVisible = categoriesDiv.style.display !== 'none';
        categoriesDiv.style.display = isVisible ? 'none' : 'block';
        customizeBtn.textContent = isVisible ? PROJECT_CONFIG.customizeText : 'Salva Preferenze';
        
        if (!isVisible) {
          // Carica consensi esistenti
          const existingConsents = CookieManager.getConsents();
          CATEGORIES.forEach(cat => {
            const checkbox = document.getElementById('consent-' + cat.name);
            if (checkbox) {
              checkbox.checked = existingConsents ? existingConsents[cat.name] : cat.isRequired;
            }
          });
        } else {
          // Salva consensi personalizzati
          const consents = {};
          CATEGORIES.forEach(cat => {
            const checkbox = document.getElementById('consent-' + cat.name);
            consents[cat.name] = checkbox ? checkbox.checked : cat.isRequired;
          });
          CookieManager.setConsents(consents);
          this.hideBanner();
        }
      });
    },
    
    hideBanner: function() {
      if (this.banner) {
        this.banner.remove();
        this.banner = null;
      }
    },
    
    showBanner: function() {
      this.createBanner();
    }
  };
  
  // Inizializzazione
  function init() {
    // Verifica se i consensi sono già stati dati
    const existingConsents = CookieManager.getConsents();
    
    if (existingConsents) {
      // Esegui script con consensi esistenti
      CookieManager.executeScripts(existingConsents);
    } else {
      // Mostra banner se non ci sono consensi
      BannerManager.showBanner();
    }
  }
  
  // Aggiungi API pubblica per revocare consensi
  window.CookieFacile = {
    showBanner: function() {
      BannerManager.showBanner();
    },
    getConsents: function() {
      return CookieManager.getConsents();
    },
    revokeConsents: function() {
      CookieManager.deleteCookie('cookie_consents_' + PROJECT_ID);
      BannerManager.showBanner();
    }
  };
  
  // Avvia quando DOM è pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
`;
} 