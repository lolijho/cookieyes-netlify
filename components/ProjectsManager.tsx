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
      const savedProject = LocalProjectsManager.create({
        user_id: userId,
        name: formData.name,
        domain: formData.domain,
        language: formData.language,
        banner_config: newProject.banner_config
      });
      
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