'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface UserDetails {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  role: string;
  planId?: string;
  planName?: string;
  maxProjects?: number;
  planPrice?: number;
  isActive: boolean;
  emailVerified: boolean;
  lastLogin?: string;
  createdAt: string;
  activeProjects: number;
  totalConsents: number;
  notes?: string;
  projects: Array<{
    id: string;
    name: string;
    domain: string;
    totalViews: number;
    totalConsents: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
  recentActivity: Array<{
    id: number;
    action: string;
    resource: string;
    createdAt: string;
    details: any;
  }>;
}

export default function UserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [verifying, setVerifying] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    notes: '',
    isActive: true
  });

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/admin/users/${userId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Utente non trovato');
        }
        throw new Error('Errore nel caricamento dei dettagli utente');
      }

      const userData = await response.json();
      setUser(userData);
      
      // Popola form con dati utente
      setFormData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        company: userData.company || '',
        notes: userData.notes || '',
        isActive: userData.isActive
      });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setUpdating(true);
      setError(null);

      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Errore nell\'aggiornamento');
      }

      await fetchUserDetails(); // Ricarica i dati
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');
    } finally {
      setUpdating(false);
    }
  };

  const handleVerifyUser = async () => {
    try {
      setVerifying(true);
      setError(null);

      const response = await fetch(`/api/admin/users/${userId}/verify`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Errore nella verifica');
      }

      await fetchUserDetails(); // Ricarica i dati
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');
    } finally {
      setVerifying(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!user) return;
    
    if (!confirm(`Sei sicuro di voler eliminare l'utente ${user.email}? Questa azione eliminerà anche tutti i suoi progetti e non può essere annullata.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Errore nell\'eliminazione');
      }

      // Redirect alla pagina admin
      router.push('/admin');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount / 100);
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento dettagli utente...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Errore</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={fetchUserDetails}>Riprova</Button>
            <Button onClick={() => router.push('/admin')} variant="outline">
              Torna al Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-6xl mb-4">👤</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Utente non trovato</h2>
          <p className="text-gray-600 mb-4">L'utente richiesto non esiste o è stato eliminato</p>
          <Button onClick={() => router.push('/admin')} variant="outline">
            Torna al Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => router.push('/admin')}
                variant="outline"
                size="sm"
              >
                ← Torna al Dashboard
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  👤 Dettagli Utente
                </h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {!user.emailVerified && (
                <Button
                  onClick={handleVerifyUser}
                  disabled={verifying}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {verifying ? 'Verificando...' : '✓ Verifica Email'}
                </Button>
              )}
              {user.role !== 'admin' && (
                <Button
                  onClick={handleDeleteUser}
                  variant="outline"
                  className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                >
                  🗑️ Elimina Utente
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    user.role === 'admin' ? 'bg-red-500' : 'bg-blue-500'
                  }`}>
                    {user.role === 'admin' ? '👑' : '👤'}
                  </div>
                  Profilo Utente
                </CardTitle>
                <CardDescription>
                  Informazioni personali e account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateUser} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nome</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="Mario"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Cognome</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Rossi"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="company">Azienda</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Azienda S.r.l."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Note</Label>
                    <textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Note amministrative..."
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    />
                    <Label htmlFor="isActive">Account attivo</Label>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={updating}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {updating ? 'Aggiornando...' : 'Aggiorna Profilo'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Projects */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🚀 Progetti
                </CardTitle>
                <CardDescription>
                  {user.projects?.length || 0} progetti • {user.activeProjects}/{user.maxProjects} attivi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {user.projects && user.projects.length > 0 ? (
                    user.projects.map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{project.name}</span>
                            {!project.isActive && (
                              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                Disattivo
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">{project.domain}</div>
                          <div className="text-xs text-gray-500">
                            Creato: {formatDate(project.createdAt)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">{project.totalConsents}</div>
                          <div className="text-sm text-gray-600">{project.totalViews} views</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-2">📁</div>
                      <p>Nessun progetto ancora</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📋 Attività Recente
                </CardTitle>
                <CardDescription>
                  Ultime azioni dell'utente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {user.recentActivity && user.recentActivity.length > 0 ? (
                    user.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">
                          {activity.action.includes('login') ? '🔐' :
                           activity.action.includes('create') ? '➕' :
                           activity.action.includes('update') ? '✏️' :
                           activity.action.includes('delete') ? '🗑️' : '📝'}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-700">
                            {activity.action.replace(/_/g, ' ')} {activity.resource}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDate(activity.createdAt)}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-2">📋</div>
                      <p>Nessuna attività recente</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-6">
            {/* Account Status */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">📊 Stato Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Stato:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? 'Attivo' : 'Disattivo'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.emailVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.emailVerified ? 'Verificata' : 'Non verificata'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ruolo:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role === 'admin' ? 'Amministratore' : 'Cliente'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Registrato:</span>
                  <span className="text-sm font-medium">
                    {formatDate(user.createdAt)}
                  </span>
                </div>
                
                {user.lastLogin && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Ultimo accesso:</span>
                    <span className="text-sm font-medium">
                      {formatDate(user.lastLogin)}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Plan Info */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">💳 Piano di Sottoscrizione</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {user.planName}
                  </div>
                  <div className="text-gray-600">
                    {user.planPrice === 0 ? 'Gratuito' : formatCurrency(user.planPrice)}
                    {user.planPrice > 0 && '/mese'}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Progetti:</span>
                    <span className="text-sm font-medium">
                      {user.activeProjects}/{user.maxProjects}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${Math.min((user.activeProjects / user.maxProjects) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    // TODO: Implementare cambio piano
                    alert('Funzione cambio piano in arrivo!');
                  }}
                >
                  Cambia Piano
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">📈 Statistiche Rapide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Consensi totali:</span>
                  <span className="text-sm font-bold">{user.totalConsents}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Progetti attivi:</span>
                  <span className="text-sm font-bold">{user.activeProjects}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Progetti totali:</span>
                  <span className="text-sm font-bold">{user.projects?.length || 0}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 