'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface User {
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
}

interface Stats {
  overview: {
    totalUsers: number;
    activeUsers: number;
    totalProjects: number;
    activeProjects: number;
    totalConsents: number;
    totalViews: number;
    consentsLast24h: number;
    activeSessions: number;
  };
  planDistribution: Array<{
    planId: string;
    planName: string;
    price: number;
    userCount: number;
    activeUserCount: number;
  }>;
  topProjects: Array<{
    id: string;
    name: string;
    domain: string;
    totalViews: number;
    totalConsents: number;
    ownerEmail: string;
    ownerName: string;
  }>;
  recentActivity: Array<{
    id: number;
    action: string;
    resource: string;
    userName: string;
    userEmail: string;
    createdAt: string;
    details: any;
  }>;
}

interface Plan {
  id: string;
  name: string;
  displayName: string;
  maxProjects: number;
  price: number;
  currency: string;
  features: string[];
  isActive: boolean;
  userCount: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'plans'>('overview');
  
  // Stati per gestione utenti
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [creating, setCreating] = useState(false);

  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    company: '',
    planId: '',
    notes: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsRes, usersRes, plansRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/users'),
        fetch('/api/admin/plans')
      ]);

      if (!statsRes.ok || !usersRes.ok || !plansRes.ok) {
        throw new Error('Errore nel caricamento dei dati');
      }

      const [statsData, usersData, plansData] = await Promise.all([
        statsRes.json(),
        usersRes.json(),
        plansRes.json()
      ]);

      setStats(statsData);
      setUsers(usersData.users || []);
      setPlans(plansData.plans || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUser.email || !newUser.password || !newUser.planId) {
      setError('Email, password e piano sono richiesti');
      return;
    }

    try {
      setCreating(true);
      setError(null);

      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Errore nella creazione dell\'utente');
      }

      // Reset form e ricarica dati
      setNewUser({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        company: '',
        planId: '',
        notes: ''
      });
      setShowCreateUser(false);
      await fetchData();
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteUser = async (userId: string, userEmail: string) => {
    if (!confirm(`Sei sicuro di voler eliminare l'utente ${userEmail}? Questa azione eliminerà anche tutti i suoi progetti e non può essere annullata.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Errore nell\'eliminazione dell\'utente');
      }

      await fetchData();
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

  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchQuery || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.firstName && user.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.lastName && user.lastName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.company && user.company.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesPlan = !selectedPlan || user.planId === selectedPlan;
    
    return matchesSearch && matchesPlan;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento dashboard amministratore...</p>
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
          <Button onClick={fetchData}>Riprova</Button>
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
            <div>
              <h1 className="text-3xl font-bold text-gray-900">👑 Dashboard Amministratore</h1>
              <p className="text-gray-600">Gestione sistema e utenti</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                onClick={() => window.open('/dashboard', '_blank')}
                variant="outline"
              >
                🏠 Dashboard Cliente
              </Button>
              <Button
                onClick={() => {
                  fetch('/api/auth/logout', { method: 'POST' })
                    .then(() => window.location.href = '/login');
                }}
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
              >
                🚪 Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 w-fit">
          {[
            { id: 'overview', label: '📊 Panoramica', icon: '📊' },
            { id: 'users', label: '👥 Utenti', icon: '👥' },
            { id: 'plans', label: '💳 Piani', icon: '💳' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-8">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">👥 Utenti Totali</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{stats.overview.totalUsers}</div>
                  <p className="text-sm text-green-600 mt-1">
                    {stats.overview.activeUsers} attivi
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">🚀 Progetti</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{stats.overview.totalProjects}</div>
                  <p className="text-sm text-blue-600 mt-1">
                    {stats.overview.activeProjects} attivi
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">🍪 Consensi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{stats.overview.totalConsents}</div>
                  <p className="text-sm text-orange-600 mt-1">
                    {stats.overview.consentsLast24h} nelle ultime 24h
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">👁️ Visualizzazioni</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">
                    {stats.overview.totalViews.toLocaleString()}
                  </div>
                  <p className="text-sm text-purple-600 mt-1">
                    {stats.overview.activeSessions} sessioni attive
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Plan Distribution */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    💳 Distribuzione Piani
                  </CardTitle>
                  <CardDescription>
                    Utilizzatori per piano di sottoscrizione
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.planDistribution.map((plan) => (
                      <div key={plan.planId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{plan.planName}</div>
                          <div className="text-sm text-gray-600">
                            {formatCurrency(plan.price)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{plan.userCount}</div>
                          <div className="text-sm text-green-600">{plan.activeUserCount} attivi</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Projects */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🏆 Top Progetti
                  </CardTitle>
                  <CardDescription>
                    Progetti con più consensi
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {stats.topProjects.length > 0 ? (
                      stats.topProjects.map((project) => (
                        <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium">{project.name}</div>
                            <div className="text-sm text-gray-600">{project.domain}</div>
                            <div className="text-xs text-gray-500">{project.ownerEmail}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">{project.totalConsents}</div>
                            <div className="text-sm text-gray-600">{project.totalViews} views</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <div className="text-4xl mb-2">📊</div>
                        <p>Nessun progetto ancora</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📋 Attività Recente
                </CardTitle>
                <CardDescription>
                  Log delle ultime azioni degli utenti
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {stats.recentActivity.length > 0 ? (
                    stats.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">
                          {activity.action.includes('login') ? '🔐' :
                           activity.action.includes('create') ? '➕' :
                           activity.action.includes('update') ? '✏️' :
                           activity.action.includes('delete') ? '🗑️' : '📝'}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{activity.userName}</span>
                            <span className="text-sm text-gray-600">({activity.userEmail})</span>
                          </div>
                          <div className="text-sm text-gray-700">
                            {activity.action.replace(/_/g, ' ')} {activity.resource}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(activity.createdAt)}
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
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Users Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Gestione Utenti</h2>
                <p className="text-gray-600">{users.length} utenti totali</p>
              </div>
              <Button
                onClick={() => setShowCreateUser(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                ➕ Nuovo Utente
              </Button>
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <Input
                  placeholder="🔍 Cerca per email, nome o azienda..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Tutti i piani</option>
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.displayName}
                  </option>
                ))}
              </select>
            </div>

            {/* Create User Modal */}
            {showCreateUser && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <Card className="w-full max-w-md mx-4">
                  <CardHeader>
                    <CardTitle>Crea Nuovo Utente</CardTitle>
                    <CardDescription>
                      Inserisci i dati del nuovo cliente
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCreateUser} className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                          placeholder="cliente@esempio.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="password">Password *</Label>
                        <Input
                          id="password"
                          type="password"
                          value={newUser.password}
                          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                          placeholder="Password sicura"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">Nome</Label>
                          <Input
                            id="firstName"
                            value={newUser.firstName}
                            onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                            placeholder="Mario"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Cognome</Label>
                          <Input
                            id="lastName"
                            value={newUser.lastName}
                            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                            placeholder="Rossi"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="company">Azienda</Label>
                        <Input
                          id="company"
                          value={newUser.company}
                          onChange={(e) => setNewUser({ ...newUser, company: e.target.value })}
                          placeholder="Azienda S.r.l."
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="planId">Piano *</Label>
                        <select
                          id="planId"
                          value={newUser.planId}
                          onChange={(e) => setNewUser({ ...newUser, planId: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        >
                          <option value="">Seleziona piano</option>
                          {plans.filter(p => p.isActive).map((plan) => (
                            <option key={plan.id} value={plan.id}>
                              {plan.displayName} - {formatCurrency(plan.price)} ({plan.maxProjects} progetti)
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <Label htmlFor="notes">Note</Label>
                        <textarea
                          id="notes"
                          value={newUser.notes}
                          onChange={(e) => setNewUser({ ...newUser, notes: e.target.value })}
                          placeholder="Note opzionali sull'utente..."
                          rows={3}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div className="flex gap-3">
                        <Button
                          type="submit"
                          disabled={creating}
                          className="bg-purple-600 hover:bg-purple-700 flex-1"
                        >
                          {creating ? 'Creazione...' : 'Crea Utente'}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowCreateUser(false)}
                        >
                          Annulla
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Users List */}
            <div className="space-y-4">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <Card key={user.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                            user.role === 'admin' ? 'bg-red-500' : 'bg-blue-500'
                          }`}>
                            {user.role === 'admin' ? '👑' : '👤'}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">{user.email}</h3>
                              {!user.isActive && (
                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                  Disattivato
                                </span>
                              )}
                              {!user.emailVerified && (
                                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                                  Non verificato
                                </span>
                              )}
                            </div>
                            <div className="text-gray-600">
                              {user.firstName} {user.lastName} {user.company && `• ${user.company}`}
                            </div>
                            <div className="text-sm text-gray-500">
                              Piano: {user.planName} • {user.activeProjects}/{user.maxProjects} progetti • 
                              {user.totalConsents} consensi totali
                            </div>
                            {user.lastLogin && (
                              <div className="text-xs text-gray-400">
                                Ultimo accesso: {formatDate(user.lastLogin)}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => window.open(`/admin/users/${user.id}`, '_blank')}
                            size="sm"
                            variant="outline"
                            className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                          >
                            👁️ Dettagli
                          </Button>
                          {user.role !== 'admin' && (
                            <Button
                              onClick={() => handleDeleteUser(user.id, user.email)}
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                            >
                              🗑️ Elimina
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="text-center py-12">
                    <div className="text-4xl mb-4">👥</div>
                    <h3 className="text-xl font-semibold mb-2">Nessun utente trovato</h3>
                    <p className="text-gray-600">
                      {searchQuery || selectedPlan 
                        ? 'Modifica i filtri di ricerca per vedere più risultati'
                        : 'Crea il primo utente per iniziare'
                      }
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Gestione Piani</h2>
                <p className="text-gray-600">{plans.length} piani configurati</p>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">
                ➕ Nuovo Piano
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card key={plan.id} className={`bg-white/70 backdrop-blur-sm border-0 shadow-lg ${
                  plan.name === 'business' ? 'ring-2 ring-purple-500' : ''
                }`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{plan.displayName}</CardTitle>
                      {plan.name === 'business' && (
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                          Popolare
                        </span>
                      )}
                    </div>
                    <CardDescription>
                      Fino a {plan.maxProjects} progetti
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-gray-900">
                        {plan.price === 0 ? 'Gratis' : formatCurrency(plan.price)}
                      </div>
                      {plan.price > 0 && (
                        <div className="text-gray-600">/mese</div>
                      )}
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-sm">
                        <span>Utenti:</span>
                        <span className="font-medium">{plan.userCount}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span>Attivi:</span>
                        <span className="font-medium text-green-600">{plan.activeUserCount}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        ✏️ Modifica
                      </Button>
                      {plan.userCount === 0 && (
                        <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
                          🗑️
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 