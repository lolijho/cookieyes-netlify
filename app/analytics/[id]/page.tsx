'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ConsentRecord {
  id: string;
  project_id: string;
  session_id: string;
  ip_address?: string;
  user_agent?: string;
  domain: string;
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: string;
  created_at: string;
}

interface Analytics {
  totalVisitors: number;
  acceptedAll: number;
  rejectedAll: number;
  customized: number;
  acceptanceRate: number;
  categoryStats: {
    necessary: number;
    analytics: number;
    marketing: number;
    preferences: number;
  };
  recentConsents: ConsentRecord[];
  dailyStats: Array<{
    date: string;
    accepted: number;
    rejected: number;
    visitors: number;
  }>;
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
}

interface User {
  id: string;
  email: string;
  role: 'admin' | 'client';
}

export default function AnalyticsPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  
  const [user, setUser] = useState<User | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    checkAuthAndLoadData();
  }, [projectId, timeRange]);

  const checkAuthAndLoadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Verifica autenticazione
      const authResponse = await fetch('/api/auth/check');
      if (!authResponse.ok) {
        router.push('/login');
        return;
      }

      const authData = await authResponse.json();
      setUser(authData.user);

      // Carica il progetto
      const projectResponse = await fetch(`/api/projects/${projectId}`);
      if (!projectResponse.ok) {
        if (projectResponse.status === 404) {
          setError('Progetto non trovato');
        } else if (projectResponse.status === 403) {
          setError('Non hai il permesso di accedere a questo progetto');
        } else {
          setError('Errore nel caricamento del progetto');
        }
        return;
      }

      const projectData = await projectResponse.json();
      setProject(projectData.project);

      // Carica analytics
      await fetchAnalytics();
      
    } catch (error) {
      console.error('Errore nel caricamento:', error);
      setError('Errore interno del server');
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/analytics/${projectId}?range=${timeRange}`);
      
      if (!response.ok) {
        throw new Error('Errore nel caricamento delle analytics');
      }
      
      const data = await response.json();
      setAnalytics(data);
    } catch (err) {
      console.error('Errore caricamento analytics:', err);
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');
    }
  };

  const exportData = async () => {
    try {
      const response = await fetch(`/api/analytics/${projectId}/export`);
      if (!response.ok) {
        throw new Error('Errore nell\'esportazione');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-${project?.name}-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Errore esportazione:', err);
      alert('Errore nell\'esportazione dei dati');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <svg className="h-16 w-16 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Errore</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button 
            onClick={() => router.push('/dashboard')}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Torna alla Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (!project || !analytics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento dati...</p>
        </div>
      </div>
    );
  }

  // Dati per grafici
  const pieData = [
    { name: 'Accettato Tutto', value: analytics.acceptedAll, color: '#10b981' },
    { name: 'Rifiutato Tutto', value: analytics.rejectedAll, color: '#ef4444' },
    { name: 'Personalizzato', value: analytics.customized, color: '#f59e0b' },
  ];

  const categoryData = [
    { name: 'Necessari', value: analytics.categoryStats.necessary, color: '#6b7280' },
    { name: 'Analytics', value: analytics.categoryStats.analytics, color: '#3b82f6' },
    { name: 'Marketing', value: analytics.categoryStats.marketing, color: '#8b5cf6' },
    { name: 'Preferenze', value: analytics.categoryStats.preferences, color: '#10b981' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => router.push('/dashboard')}
                variant="outline"
                className="flex items-center gap-2"
              >
                ← Torna alla Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics Cookie</h1>
                <p className="text-sm text-gray-600">
                  Progetto: <span className="font-semibold">{project.name}</span> • 
                  Dominio: <span className="font-semibold">{project.domain}</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Selettore periodo */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Periodo:</span>
                <select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value as '7d' | '30d' | '90d')}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="7d">Ultimi 7 giorni</option>
                  <option value="30d">Ultimi 30 giorni</option>
                  <option value="90d">Ultimi 90 giorni</option>
                </select>
              </div>

              <Button
                onClick={exportData}
                variant="outline"
                className="flex items-center gap-2"
              >
                📊 Esporta CSV
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistiche principali */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Visitatori Totali</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalVisitors.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Accettazioni</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.acceptedAll.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Rifiuti</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.rejectedAll.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Tasso Accettazione</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.acceptanceRate.toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grafici */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Distribuzione Consensi */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🥧 Distribuzione Consensi
              </CardTitle>
              <CardDescription>
                Come gli utenti hanno risposto al banner cookie
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Categorie Cookie */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📊 Consensi per Categoria
              </CardTitle>
              <CardDescription>
                Quanti utenti hanno accettato ogni categoria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Andamento Temporale */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📈 Andamento Temporale
            </CardTitle>
            <CardDescription>
              Consensi raccolti per giorno
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.dailyStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="accepted" fill="#10b981" name="Accettati" />
                  <Bar dataKey="rejected" fill="#ef4444" name="Rifiutati" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Consensi Recenti */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🕐 Consensi Recenti
            </CardTitle>
            <CardDescription>
              Ultimi consensi registrati
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Data</th>
                    <th className="text-left p-3">Dominio</th>
                    <th className="text-left p-3">Necessari</th>
                    <th className="text-left p-3">Analytics</th>
                    <th className="text-left p-3">Marketing</th>
                    <th className="text-left p-3">Preferenze</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.recentConsents.map((consent) => (
                    <tr key={consent.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        {new Date(consent.created_at).toLocaleDateString('it-IT', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="p-3">{consent.domain}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          consent.necessary ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {consent.necessary ? 'Sì' : 'No'}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          consent.analytics ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {consent.analytics ? 'Sì' : 'No'}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          consent.marketing ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {consent.marketing ? 'Sì' : 'No'}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          consent.preferences ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {consent.preferences ? 'Sì' : 'No'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {analytics.recentConsents.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nessun consenso registrato ancora</p>
                  <p className="text-sm text-gray-400 mt-2">
                    I consensi appariranno qui una volta che gli utenti inizieranno a visitare il tuo sito
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 