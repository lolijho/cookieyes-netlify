'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LocalProjectsManager, ProjectLocal } from '@/lib/localStorage';

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

export default function AnalyticsPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  
  const [project, setProject] = useState<ProjectLocal | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    const foundProject = LocalProjectsManager.getById(projectId);
    if (foundProject) {
      setProject(foundProject);
      fetchAnalytics();
    } else {
      router.push('/dashboard');
    }
  }, [projectId, router, timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/analytics/${projectId}?range=${timeRange}`);
      
      if (!response.ok) {
        throw new Error('Errore nel caricamento delle analytics');
      }
      
      const data = await response.json();
      setAnalytics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');
    } finally {
      setLoading(false);
    }
  };

  const exportData = async () => {
    try {
      const response = await fetch(`/api/analytics/${projectId}/export`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-${project?.name}-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
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
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Errore</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => router.push('/dashboard')}>
            Torna alla Dashboard
          </Button>
        </div>
      </div>
    );
  }

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
                  Progetto: <span className="font-semibold">{project?.name}</span> • 
                  Dominio: <span className="font-semibold">{project?.domain}</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Time Range Selector */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {(['7d', '30d', '90d'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                      timeRange === range
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {range === '7d' ? '7 giorni' : range === '30d' ? '30 giorni' : '90 giorni'}
                  </button>
                ))}
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
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Visitatori Totali</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{analytics?.totalVisitors || 0}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Tasso Accettazione</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {analytics?.acceptanceRate ? `${analytics.acceptanceRate.toFixed(1)}%` : '0%'}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Accettato Tutto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{analytics?.acceptedAll || 0}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Rifiutato Tutto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{analytics?.rejectedAll || 0}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Statistics */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🍪 Statistiche per Categoria
              </CardTitle>
              <CardDescription>
                Percentuale di accettazione per ogni categoria di cookie
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Necessari', key: 'necessary', color: 'bg-gray-500' },
                  { name: 'Analytics', key: 'analytics', color: 'bg-blue-500' },
                  { name: 'Marketing', key: 'marketing', color: 'bg-green-500' },
                  { name: 'Preferenze', key: 'preferences', color: 'bg-purple-500' }
                ].map((category) => {
                  const count = analytics?.categoryStats?.[category.key as keyof typeof analytics.categoryStats] || 0;
                  const percentage = analytics?.totalVisitors ? (count / analytics.totalVisitors * 100) : 0;
                  
                  return (
                    <div key={category.key} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded ${category.color}`}></div>
                      <div className="flex-1 flex justify-between items-center">
                        <span className="font-medium">{category.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${category.color}`}
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-12">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Consents */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📋 Consensi Recenti
              </CardTitle>
              <CardDescription>
                Ultimi consensi registrati
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {analytics?.recentConsents?.length ? (
                  analytics.recentConsents.map((consent) => (
                    <div key={consent.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            {consent.domain}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(consent.timestamp).toLocaleDateString('it-IT', {
                              day: '2-digit',
                              month: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          {consent.necessary && <span className="text-xs bg-gray-200 px-2 py-1 rounded">Necessari</span>}
                          {consent.analytics && <span className="text-xs bg-blue-200 px-2 py-1 rounded">Analytics</span>}
                          {consent.marketing && <span className="text-xs bg-green-200 px-2 py-1 rounded">Marketing</span>}
                          {consent.preferences && <span className="text-xs bg-purple-200 px-2 py-1 rounded">Preferenze</span>}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">📊</div>
                    <p>Nessun consenso registrato ancora</p>
                    <p className="text-sm mt-1">I consensi appariranno qui quando gli utenti interagiranno con il banner</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Chart */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📈 Trend Giornaliero
            </CardTitle>
            <CardDescription>
              Andamento delle decisioni sui cookie negli ultimi {timeRange}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-500">
              {analytics?.dailyStats?.length ? (
                <div className="w-full">
                  <div className="flex items-end justify-between gap-2 h-48">
                    {analytics.dailyStats.map((day, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full flex flex-col gap-1">
                          <div 
                            className="w-full bg-green-500 rounded-t min-h-[4px]"
                            style={{ 
                              height: `${Math.max(4, (day.accepted / Math.max(...analytics.dailyStats.map(d => d.accepted + d.rejected)) * 160))}px` 
                            }}
                          />
                          <div 
                            className="w-full bg-red-500 rounded-b min-h-[4px]"
                            style={{ 
                              height: `${Math.max(4, (day.rejected / Math.max(...analytics.dailyStats.map(d => d.accepted + d.rejected)) * 160))}px` 
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">
                          {new Date(day.date).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' })}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span className="text-sm">Accettati</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span className="text-sm">Rifiutati</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-4xl mb-2">📈</div>
                  <p>Nessun dato disponibile</p>
                  <p className="text-sm mt-1">I dati appariranno qui quando inizieranno ad arrivare i consensi</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 