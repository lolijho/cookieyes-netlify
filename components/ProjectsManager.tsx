'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ProjectsManagerProps {
  userId: string;
  maxProjects?: number;
  currentProjects?: number;
}

interface Project {
  id: string;
  name: string;
  domain: string;
  language: string;
  banner_config: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
  owner_email?: string;
  owner_name?: string;
}

export function ProjectsManager({ userId, maxProjects, currentProjects }: ProjectsManagerProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'client'>('client');
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    language: 'it'
  });

  useEffect(() => {
    fetchProjects();
  }, [userId]);

  // Carica progetti dal database
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/projects');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Errore nel caricamento progetti');
      }
      
      if (data.success) {
        setProjects(data.projects || []);
        setUserRole(data.user_role || 'client');
      } else {
        throw new Error(data.error || 'Errore nel caricamento progetti');
      }
    } catch (err) {
      console.error('Errore caricamento progetti:', err);
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
      
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Errore nella creazione del progetto');
      }

      if (data.success) {
        // Aggiorna la lista dei progetti
        await fetchProjects();
        setFormData({ name: '', domain: '', language: 'it' });
        setShowCreateForm(false);
      } else {
        throw new Error(data.error || 'Errore nella creazione del progetto');
      }
      
    } catch (err) {
      console.error('Errore creazione progetto:', err);
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
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Errore nell\'eliminazione del progetto');
      }

      if (data.success) {
        // Aggiorna la lista dei progetti
        await fetchProjects();
      } else {
        throw new Error(data.error || 'Errore nell\'eliminazione del progetto');
      }
    } catch (err) {
      console.error('Errore eliminazione progetto:', err);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento progetti...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {userRole === 'admin' ? 'Tutti i Progetti' : 'I Tuoi Progetti'}
          </h2>
          <p className="text-gray-600">
            {userRole === 'admin' 
              ? `${projects.length} progetti nel sistema`
              : `${projects.length} progetti attivi`
            }
          </p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          ➕ Nuovo Progetto
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Create Form */}
      {showCreateForm && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">Crea Nuovo Progetto</CardTitle>
            <CardDescription>
              Configura un nuovo progetto per gestire i cookie del tuo sito
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
                  placeholder="Il mio sito web"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="domain">Dominio</Label>
                <Input
                  id="domain"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  placeholder="esempio.com"
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
              
              <div className="flex gap-3">
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    {project.is_active ? (
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    ) : (
                      <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    )}
                  </div>
                </div>
                <CardDescription className="text-sm">
                  {project.domain}
                  {userRole === 'admin' && project.owner_email && (
                    <div className="text-xs text-gray-500 mt-1">
                      👤 {project.owner_name || project.owner_email}
                    </div>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-xs text-gray-500">
                  Creato: {formatDate(project.created_at)}
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => window.open(`/editor/${project.id}`, '_blank')}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    ✏️ Modifica
                  </Button>
                  
                  <Button
                    onClick={() => copyToClipboard(generateScript(project.id))}
                    size="sm"
                    variant="outline"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    📋 Copia Script
                  </Button>
                  
                  <Button
                    onClick={() => window.open(`/analytics/${project.id}`, '_blank')}
                    size="sm"
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-green-50"
                  >
                    📊 Analytics
                  </Button>
                  
                  {(userRole === 'admin' || project.user_id === userId) && (
                    <Button
                      onClick={() => handleDeleteProject(project.id)}
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      🗑️ Elimina
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">
              {userRole === 'admin' 
                ? 'Nessun progetto nel sistema' 
                : 'Nessun progetto ancora'
              }
            </h3>
            <p className="text-gray-600 mb-4">
              {userRole === 'admin'
                ? 'Gli utenti non hanno ancora creato progetti'
                : 'Crea il tuo primo progetto per iniziare a gestire i cookie'
              }
            </p>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              ➕ Crea Primo Progetto
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 