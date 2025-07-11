'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LocalProjectsManager, ProjectLocal } from '@/lib/localStorage';
import { TursoBackup } from '@/lib/tursoBackup';

interface ProjectsManagerProps {
  userId: string;
}

interface BannerPreview {
  title: string;
  description: string;
  layout: 'top' | 'bottom';
  colors: {
    background: string;
    text: string;
    button_accept: string;
    button_reject: string;
    button_settings: string;
  };
}

export function ProjectsManager({ userId }: ProjectsManagerProps) {
  const [projects, setProjects] = useState<ProjectLocal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [backupStatus, setBackupStatus] = useState<{
    isBackingUp: boolean;
    lastBackupTime: number;
    timeSinceLastBackup: number;
  }>({
    isBackingUp: false,
    lastBackupTime: 0,
    timeSinceLastBackup: 0
  });
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    language: 'it'
  });


  useEffect(() => {
    fetchProjects();
    
    // Avvia il backup automatico
    TursoBackup.startAutoBackup();
    
    // Ripristina progetti da Turso al caricamento
    TursoBackup.restoreFromTurso().then(() => {
      fetchProjects(); // Ricarica dopo il ripristino
    });
    
    // Aggiorna lo stato del backup ogni 5 secondi
    const statusInterval = setInterval(() => {
      setBackupStatus(TursoBackup.getBackupStatus());
    }, 5000);
    
    return () => clearInterval(statusInterval);
  }, [userId]);

  // Carica progetti dal localStorage
  const fetchProjects = () => {
    try {
      setLoading(true);
      const localProjects = LocalProjectsManager.getByUser(userId);
      setProjects(localProjects);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel caricamento progetti');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.domain) {
      setError('Nome e dominio sono obbligatori');
      return;
    }

    try {
      setCreating(true);
      setError(null);
      
      // Chiamiamo l'API solo per generare la configurazione del progetto
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Errore nella creazione del progetto');
      }

      const newProject = await response.json();
      
      // Salviamo il progetto nel localStorage
      let savedProject;
      try {
        savedProject = LocalProjectsManager.create({
          user_id: userId,
          name: formData.name,
          domain: formData.domain,
          language: formData.language,
          banner_config: newProject.banner_config
        });
      } catch (duplicateError) {
        throw new Error(`Un progetto con questo nome e dominio già esiste. Scegli un nome o dominio diverso.`);
      }
      
      // Aggiorniamo lo state
      setProjects([savedProject, ...projects]);
      setFormData({ name: '', domain: '', language: 'it' });
      setShowCreateForm(false);
      
      // Forza un backup immediato dopo la creazione
      TursoBackup.forceBackup();
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteProject = (projectId: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo progetto? Questa azione non può essere annullata.')) {
      return;
    }

    try {
      const success = LocalProjectsManager.delete(projectId);
      if (success) {
        setProjects(projects.filter(p => p.id !== projectId));
        // Forza un backup dopo l'eliminazione
        TursoBackup.forceBackup();
      } else {
        setError('Errore nell\'eliminazione del progetto');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');
    }
  };

  const generateScript = (projectId: string) => {
    const baseUrl = window.location.origin;
    return `<script src="${baseUrl}/api/script/${projectId}" async></script>`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Script copiato negli appunti!');
  };

  // Funzioni per export/import (backup)
  const handleExportProjects = () => {
    const exportData = LocalProjectsManager.exportToJSON();
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cookie-projects-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportProjects = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonString = e.target?.result as string;
        const success = LocalProjectsManager.importFromJSON(jsonString);
        if (success) {
          fetchProjects(); // Ricarica i progetti
          TursoBackup.forceBackup(); // Backup immediato dei nuovi progetti
          alert('Progetti importati con successo!');
        } else {
          setError('Errore nell\'importazione: formato file non valido');
        }
      } catch (err) {
        setError('Errore nell\'importazione del file');
      }
    };
    reader.readAsText(file);
    // Reset input
    event.target.value = '';
  };

  // Sincronizzazione manuale con Turso
  const handleSyncWithTurso = async () => {
    try {
      setError(null);
      const result = await TursoBackup.syncWithTurso();
      fetchProjects(); // Ricarica i progetti
      alert(`Sincronizzazione completata!\nEsportati: ${result.exported} progetti\nImportati: ${result.imported} progetti`);
    } catch (err) {
      setError('Errore nella sincronizzazione con Turso');
    }
  };

  // Formatta il tempo dall'ultimo backup
  const formatTimeSinceBackup = (ms: number) => {
    if (ms < 60000) return `${Math.floor(ms / 1000)}s fa`;
    if (ms < 3600000) return `${Math.floor(ms / 60000)}m fa`;
    return `${Math.floor(ms / 3600000)}h fa`;
  };

  const copyScriptCode = (project: ProjectLocal) => {
    const scriptCode = `<script src="${window.location.origin}/api/script/${project.id}" async></script>`;
    navigator.clipboard.writeText(scriptCode);
    alert('Codice script copiato negli appunti!');
  };

  const scanCookiesForProject = (project: ProjectLocal) => {
    // Apri una nuova finestra per lo scan dei cookie
    const scanWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
    
    if (!scanWindow) {
      alert('Blocco popup attivo. Abilita i popup per questa pagina per usare lo scan dei cookie.');
      return;
    }
    
    scanWindow.document.write(`
      <!DOCTYPE html>
      <html lang="it">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cookie Scanner - ${project.name}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            min-height: 100vh;
          }
          .container {
            max-width: 100%;
            background: white;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          }
          .header {
            text-align: center;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 2px solid #e5e7eb;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            color: #1f2937;
            margin: 0 0 8px 0;
          }
          .subtitle {
            color: #6b7280;
            margin: 0;
          }
          .scan-btn {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
            margin: 16px 0;
          }
          .scan-btn:hover {
            transform: translateY(-2px);
          }
          .results {
            margin-top: 20px;
          }
          .cookie-category {
            margin-bottom: 16px;
            padding: 16px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
          }
          .category-necessary { border-left-color: #10b981; background: #ecfdf5; }
          .category-analytics { border-left-color: #3b82f6; background: #eff6ff; }
          .category-marketing { border-left-color: #f59e0b; background: #fffbeb; }
          .category-preferences { border-left-color: #8b5cf6; background: #f3e8ff; }
          .cookie-item {
            padding: 8px 12px;
            margin: 4px 0;
            background: white;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
            font-family: monospace;
            font-size: 12px;
          }
          .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 16px;
            margin: 20px 0;
          }
          .stat-card {
            text-align: center;
            padding: 16px;
            background: #f8fafc;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
          }
          .stat-number {
            font-size: 24px;
            font-weight: bold;
            color: #1e40af;
          }
          .stat-label {
            font-size: 12px;
            color: #64748b;
            margin-top: 4px;
          }
          .instructions {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 20px;
          }
          .instructions h3 {
            margin: 0 0 8px 0;
            color: #92400e;
          }
          .instructions p {
            margin: 0;
            color: #78350f;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">🔍 Cookie Scanner</h1>
            <p class="subtitle">Progetto: ${project.name} • Dominio: ${project.domain}</p>
          </div>
          
          <div class="instructions">
            <h3>📋 Istruzioni per lo Scan</h3>
            <p>1. Apri il sito <strong>${project.domain}</strong> in una nuova scheda<br>
               2. Torna qui e clicca "Scansiona Cookie"<br>
               3. I risultati appariranno automaticamente sotto</p>
          </div>
          
          <div style="text-align: center;">
            <button class="scan-btn" onclick="scanSiteCookies()">
              🔍 Scansiona Cookie di ${project.domain}
            </button>
            <button class="scan-btn" onclick="scanCurrentCookies()" style="margin-left: 10px; background: #059669;">
              📊 Scansiona Cookie Correnti
            </button>
          </div>
          
          <div id="results" class="results" style="display: none;">
            <div class="stats" id="stats"></div>
            <div id="categories"></div>
          </div>
          
          <script>
            function categorizeByName(name) {
              if (!name) return 'necessary';
              
              const lowerName = name.toLowerCase();
              
              // Database di categorizzazione
              const cookieDatabase = {
                necessary: ['session', 'csrf', 'auth', 'security', 'login', 'token', 'xsrf', 'phpsessid', 'jsessionid', 'asp.net_sessionid', 'cookieyes', 'cookie_consent', 'gdpr', 'necessary', 'essential'],
                analytics: ['ga', 'google', 'analytics', 'gtm', 'gtag', '_utm', '_gid', '_gat', 'hotjar', 'mixpanel', 'segment', 'amplitude', 'heap', 'fullstory', 'mouseflow', 'piwik', 'matomo', 'yandex', 'metrika', 'baidu'],
                marketing: ['fb', 'facebook', 'ads', 'advertising', 'marketing', 'track', 'pixel', 'adnxs', 'adsystem', 'doubleclick', 'googlesyndication', 'amazon', 'twitter', 'linkedin', 'pinterest', 'instagram', 'snapchat', 'tiktok'],
                preferences: ['pref', 'preference', 'settings', 'config', 'lang', 'language', 'locale', 'theme', 'dark', 'light', 'currency', 'timezone', 'region', 'country']
              };
              
              for (const [category, keywords] of Object.entries(cookieDatabase)) {
                if (keywords.some(keyword => lowerName.includes(keyword))) {
                  return category;
                }
              }
              
              return 'necessary';
            }
            
            function getCategoryEmoji(category) {
              switch (category) {
                case 'necessary': return '🔒';
                case 'analytics': return '📊';
                case 'marketing': return '📢';
                case 'preferences': return '⚙️';
                default: return '❓';
              }
            }
            
            function scanCurrentCookies() {
              const results = {
                necessary: [],
                analytics: [],
                marketing: [],
                preferences: []
              };
              
              // Scansiona cookie del browser
              const cookies = document.cookie.split(';').filter(cookie => cookie.trim());
              cookies.forEach(cookie => {
                const [name, value] = cookie.trim().split('=');
                if (name) {
                  const category = categorizeByName(name);
                  results[category].push({ name: name.trim(), value: value || '', type: 'cookie' });
                }
              });
              
              // Scansiona localStorage
              for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && !key.startsWith('cookie_consent_')) {
                  const category = categorizeByName(key);
                  results[category].push({ name: key, value: 'localStorage', type: 'storage' });
                }
              }
              
              // Scansiona sessionStorage
              for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                if (key) {
                  const category = categorizeByName(key);
                  results[category].push({ name: key, value: 'sessionStorage', type: 'storage' });
                }
              }
              
              displayResults(results);
            }
            
            function scanSiteCookies() {
              alert('Aprendo ${project.domain} in una nuova finestra. Naviga sul sito e poi torna qui per vedere i cookie.');
              window.open('https://${project.domain}', '_blank');
              
              // Dopo un po' scansiona di nuovo i cookie
              setTimeout(() => {
                scanCurrentCookies();
              }, 5000);
            }
            
            function displayResults(results) {
              const resultsDiv = document.getElementById('results');
              const statsDiv = document.getElementById('stats');
              const categoriesDiv = document.getElementById('categories');
              
              resultsDiv.style.display = 'block';
              
              // Calcola statistiche
              const totalItems = Object.values(results).reduce((acc, arr) => acc + arr.length, 0);
              const cookieCount = Object.values(results).reduce((acc, arr) => acc + arr.filter(item => item.type === 'cookie').length, 0);
              const storageCount = totalItems - cookieCount;
              
              statsDiv.innerHTML = \`
                <div class="stat-card">
                  <div class="stat-number">\${totalItems}</div>
                  <div class="stat-label">Totale Elementi</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number">\${cookieCount}</div>
                  <div class="stat-label">Cookie</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number">\${storageCount}</div>
                  <div class="stat-label">Storage</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number">\${Object.keys(results).filter(cat => results[cat].length > 0).length}</div>
                  <div class="stat-label">Categorie Attive</div>
                </div>
              \`;
              
              // Mostra le categorie
              categoriesDiv.innerHTML = '';
              
              Object.entries(results).forEach(([category, items]) => {
                if (items.length === 0) return;
                
                const categoryDiv = document.createElement('div');
                categoryDiv.className = \`cookie-category category-\${category}\`;
                
                const emoji = getCategoryEmoji(category);
                const categoryNames = {
                  necessary: 'Cookie Necessari',
                  analytics: 'Cookie Analytics', 
                  marketing: 'Cookie Marketing',
                  preferences: 'Cookie Preferenze'
                };
                
                categoryDiv.innerHTML = \`
                  <h3 style="margin: 0 0 12px 0; color: #374151;">
                    \${emoji} \${categoryNames[category]} (\${items.length})
                  </h3>
                  \${items.map(item => \`
                    <div class="cookie-item">
                      <strong>\${item.name}</strong> 
                      <span style="color: #6b7280;">[\${item.type}]</span>
                      \${item.value && item.value !== 'localStorage' && item.value !== 'sessionStorage' ? 
                        \`<br><span style="color: #9ca3af; font-size: 11px;">Valore: \${item.value.substring(0, 50)}\${item.value.length > 50 ? '...' : ''}</span>\` : 
                        ''
                      }
                    </div>
                  \`).join('')}
                \`;
                
                categoriesDiv.appendChild(categoryDiv);
              });
            }
            
            // Scansiona automaticamente all'apertura
            setTimeout(scanCurrentCookies, 1000);
          </script>
        </div>
      </body>
      </html>
    `);
    
    scanWindow.document.close();
  };

  const updateIconConfig = (projectId: string, key: string, value: any) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          banner_config: {
            ...project.banner_config,
            floatingIcon: {
              ...project.banner_config.floatingIcon,
              [key]: value
            }
          }
        };
      }
      return project;
    });
    setProjects(updatedProjects);
    LocalProjectsManager.update(projectId, { banner_config: updatedProjects.find(p => p.id === projectId)?.banner_config });
    TursoBackup.forceBackup();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">I tuoi Progetti</h2>
          <p className="text-gray-600">Gestiti localmente + backup automatico Turso</p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            + Nuovo Progetto
          </Button>
        </div>
      </div>

      {/* Backup Status */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-blue-900">Backup Turso</h3>
              <div className="flex items-center space-x-4 text-sm">
                <span className={`flex items-center space-x-1 ${backupStatus.isBackingUp ? 'text-orange-600' : 'text-green-600'}`}>
                  <div className={`w-2 h-2 rounded-full ${backupStatus.isBackingUp ? 'bg-orange-500 animate-pulse' : 'bg-green-500'}`}></div>
                  <span>{backupStatus.isBackingUp ? 'Backup in corso...' : 'Backup attivo'}</span>
                </span>
                {backupStatus.lastBackupTime > 0 && (
                  <span className="text-blue-700">
                    Ultimo backup: {formatTimeSinceBackup(backupStatus.timeSinceLastBackup)}
                  </span>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleExportProjects}
                variant="outline"
                size="sm"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              >
                📥 Esporta JSON
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={handleImportProjects}
                className="hidden"
                id="import-input"
              />
              <Button
                onClick={() => document.getElementById('import-input')?.click()}
                variant="outline"
                size="sm"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              >
                📤 Importa JSON
              </Button>
              <Button
                onClick={handleSyncWithTurso}
                variant="outline"
                size="sm"
                className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
              >
                🔄 Sincronizza
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-700">
            {error}
            <Button
              onClick={() => setError(null)}
              variant="ghost"
              size="sm"
              className="ml-2 text-red-700 hover:text-red-900"
            >
              ✕
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Create Project Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Crea Nuovo Progetto</CardTitle>
            <CardDescription>
              Inserisci le informazioni del tuo sito web per creare un nuovo progetto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Progetto</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Es: Il mio sito web"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="domain">Dominio</Label>
                <Input
                  id="domain"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  placeholder="Es: example.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="language">Lingua</Label>
                <select
                  id="language"
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="it">Italiano</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  type="submit"
                  disabled={creating}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {creating ? 'Creazione...' : 'Crea Progetto'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Annulla
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Projects List */}
      <div className="grid gap-6">
        {projects.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <div className="text-gray-500">
                <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5a2 2 0 00-2 2v6a2 2 0 002 2h14m-5 10v-2a2 2 0 00-2-2H5a2 2 0 00-2 2v2a2 2 0 002 2h7m5 0v2a2 2 0 002 2h7a2 2 0 002-2v-2a2 2 0 00-2-2h-7z" />
                </svg>
                <h3 className="text-lg font-medium">Nessun progetto</h3>
                <p>Crea il tuo primo progetto per iniziare</p>
                <p className="text-sm mt-2 text-blue-600">✨ Salvato localmente + backup automatico Turso</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {project.domain} • {project.language.toUpperCase()}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => copyToClipboard(generateScript(project.id))}
                      size="sm"
                      variant="outline"
                      className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                      📋 Copia Script
                    </Button>
                    <Button
                      onClick={() => {
                        window.open(`/editor/${project.id}`, '_blank');
                      }}
                      size="sm"
                      variant="outline"
                      className="text-purple-600 border-purple-600 hover:bg-purple-600 hover:text-white"
                    >
                      🎨 Personalizza Banner
                    </Button>
                    <Button
                      onClick={() => scanCookiesForProject(project)}
                      size="sm"
                      variant="outline"
                      className="text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white"
                    >
                      🔍 Scan Cookie
                    </Button>
                    <Button
                      onClick={() => {
                        window.open(`/analytics/${project.id}`, '_blank');
                      }}
                      size="sm"
                      variant="outline"
                      className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                    >
                      📊 Analytics
                    </Button>
                    <Button
                      onClick={() => handleDeleteProject(project.id)}
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                    >
                      🗑️ Elimina
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-600">Stato</div>
                    <div className="font-semibold text-green-600">🟢 Attivo + Backup</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-600">Creato</div>
                    <div className="font-semibold">
                      {new Date(project.created_at).toLocaleDateString('it-IT')}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-600">Aggiornato</div>
                    <div className="font-semibold">
                      {new Date(project.updated_at).toLocaleDateString('it-IT')}
                    </div>
                  </div>
                </div>
                
                {/* Configurazione Icona Persistente */}
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    🎯 Icona Persistente
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className="text-xs text-blue-700 block mb-1">Abilitata</label>
                      <input
                        type="checkbox"
                        checked={project.banner_config.floatingIcon?.enabled || false}
                        onChange={(e) => updateIconConfig(project.id, 'enabled', e.target.checked)}
                        className="w-4 h-4"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-blue-700 block mb-1">Colore Sfondo</label>
                      <input
                        type="color"
                        value={project.banner_config.floatingIcon?.backgroundColor || '#4f46e5'}
                        onChange={(e) => updateIconConfig(project.id, 'backgroundColor', e.target.value)}
                        className="w-8 h-8 rounded border"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-blue-700 block mb-1">Icona</label>
                      <input
                        type="text"
                        value={project.banner_config.floatingIcon?.text || '🍪'}
                        onChange={(e) => updateIconConfig(project.id, 'text', e.target.value)}
                        className="w-12 text-center p-1 border rounded"
                        maxLength={4}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-blue-700 block mb-1">Posizione</label>
                      <select
                        value={project.banner_config.floatingIcon?.position || 'bottom-right'}
                        onChange={(e) => updateIconConfig(project.id, 'position', e.target.value)}
                        className="text-xs p-1 border rounded w-full"
                      >
                        <option value="bottom-right">Basso Dx</option>
                        <option value="bottom-left">Basso Sx</option>
                        <option value="top-right">Alto Dx</option>
                        <option value="top-left">Alto Sx</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-100 p-3 rounded text-sm">
                  <strong>Script di integrazione:</strong>
                  <pre className="mt-2 text-xs bg-white p-2 rounded border overflow-x-auto">
                    {generateScript(project.id)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Statistics */}
      {projects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Statistiche</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{projects.length}</div>
                <div className="text-sm text-gray-600">Progetti Totali</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{projects.length}</div>
                <div className="text-sm text-gray-600">Progetti Attivi</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">☁️</div>
                <div className="text-sm text-gray-600">Backup Turso</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">🔄</div>
                <div className="text-sm text-gray-600">Sincronizzazione</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Banner Editor Modal */}


      <style jsx>{`
        .btn-outline {
          background: transparent;
          color: #4f46e5;
          border: 1px solid #4f46e5;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          transition: all 0.2s;
        }

        .btn-outline:hover {
          background: #4f46e5;
          color: white;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
} 