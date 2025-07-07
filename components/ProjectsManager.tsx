'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Project {
  id: string;
  name: string;
  domain: string;
  language: string;
  totalConsents: number;
  recentConsents: number;
  createdAt: number;
  updatedAt: number;
}

interface ProjectsManagerProps {
  userId: string;
}

export function ProjectsManager({ userId }: ProjectsManagerProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    language: 'it'
  });

  useEffect(() => {
    fetchProjects();
  }, [userId]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/projects?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error('Errore nel caricamento progetti');
      }
      
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');
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
        throw new Error(errorData.message || 'Errore nella creazione del progetto');
      }

      const data = await response.json();
      setProjects([data.project, ...projects]);
      setFormData({ name: '', domain: '', language: 'it' });
      setShowCreateForm(false);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo progetto? Questa azione non può essere annullata.')) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${projectId}?userId=${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Errore nell\'eliminazione del progetto');
      }

      setProjects(projects.filter(p => p.id !== projectId));
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
          <p className="text-gray-600">Gestisci i tuoi progetti di gestione cookie</p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          + Nuovo Progetto
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-700">
            {error}
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
              </div>
            </CardContent>
          </Card>
        ) : (
          projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="flex items-center space-x-4">
                      <span>{project.domain}</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {project.language.toUpperCase()}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(generateScript(project.id))}
                    >
                      📋 Copia Script
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      🗑️ Elimina
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Consensi totali:</span>
                    <span className="font-medium">{project.totalConsents || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Consensi ultimi 7 giorni:</span>
                    <span className="font-medium">{project.recentConsents || 0}</span>
                  </div>
                  
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <Label className="text-sm font-medium text-gray-700">
                      Script da inserire nel tuo sito:
                    </Label>
                    <div className="mt-2 p-2 bg-white border rounded text-sm font-mono text-gray-800 break-all">
                      {generateScript(project.id)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
} 