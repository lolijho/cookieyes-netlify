'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface ConsentStats {
  summary: {
    total_consents: number;
    analytics_accepted: number;
    marketing_accepted: number;
    preferences_accepted: number;
    active_days: number;
  };
  daily: Array<{
    date: string;
    total: number;
    analytics: number;
    marketing: number;
    preferences: number;
  }>;
}

interface ConsentAnalyticsProps {
  projectId: string;
}

const COLORS = ['#4CAF50', '#f44336', '#2196F3', '#FF9800'];

export default function ConsentAnalytics({ projectId }: ConsentAnalyticsProps) {
  const [stats, setStats] = useState<ConsentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, [projectId]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/consent?projectId=${projectId}`);
      
      if (!response.ok) {
        throw new Error('Errore nel caricamento delle statistiche');
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="animate-pulse h-64 bg-gray-200 rounded"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={fetchStats}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Riprova
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stats || stats.summary.total_consents === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nessun consenso registrato
            </h3>
            <p className="text-gray-600 mb-4">
              Non ci sono ancora consensi registrati per questo progetto. 
              Assicurati che lo script sia installato correttamente sul tuo sito.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg text-left">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Per testare il sistema:
              </p>
              <ol className="text-sm text-gray-600 space-y-1">
                <li>1. Installa lo script sul tuo sito web</li>
                <li>2. Visita il sito e interagisci con il banner cookie</li>
                <li>3. Torna qui per vedere le statistiche</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { summary } = stats;
  
  // Calcola le percentuali
  const analyticsPercentage = summary.total_consents > 0 ? Math.round((summary.analytics_accepted / summary.total_consents) * 100) : 0;
  const marketingPercentage = summary.total_consents > 0 ? Math.round((summary.marketing_accepted / summary.total_consents) * 100) : 0;
  const preferencesPercentage = summary.total_consents > 0 ? Math.round((summary.preferences_accepted / summary.total_consents) * 100) : 0;

  // Dati per il grafico a torta
  const pieData = [
    { name: 'Analytics', value: summary.analytics_accepted, percentage: analyticsPercentage },
    { name: 'Marketing', value: summary.marketing_accepted, percentage: marketingPercentage },
    { name: 'Preferenze', value: summary.preferences_accepted, percentage: preferencesPercentage },
    { name: 'Solo necessari', value: summary.total_consents - summary.analytics_accepted - summary.marketing_accepted - summary.preferences_accepted }
  ].filter(item => item.value > 0);

  // Dati per il grafico temporale (ultimi 7 giorni)
  const timelineData = stats.daily.slice(0, 7).reverse();

  return (
    <div className="space-y-6">
      {/* Statistiche principali */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consensi totali</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.total_consents}</div>
            <p className="text-xs text-muted-foreground">
              Ultimi 30 giorni
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsPercentage}%</div>
            <p className="text-xs text-muted-foreground">
              {summary.analytics_accepted} di {summary.total_consents}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Marketing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marketingPercentage}%</div>
            <p className="text-xs text-muted-foreground">
              {summary.marketing_accepted} di {summary.total_consents}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Preferenze</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{preferencesPercentage}%</div>
            <p className="text-xs text-muted-foreground">
              {summary.preferences_accepted} di {summary.total_consents}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Grafici */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafico a torta */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuzione consensi</CardTitle>
            <CardDescription>
              Percentuale di accettazione per categoria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Grafico temporale */}
        <Card>
          <CardHeader>
            <CardTitle>Andamento temporale</CardTitle>
            <CardDescription>
              Consensi raccolti negli ultimi 7 giorni
            </CardDescription>
          </CardHeader>
          <CardContent>
            {timelineData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('it-IT', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString('it-IT')}
                  />
                  <Line type="monotone" dataKey="total" stroke="#8884d8" name="Totale" />
                  <Line type="monotone" dataKey="analytics" stroke="#4CAF50" name="Analytics" />
                  <Line type="monotone" dataKey="marketing" stroke="#f44336" name="Marketing" />
                  <Line type="monotone" dataKey="preferences" stroke="#2196F3" name="Preferenze" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500">
                Dati insufficienti per il grafico temporale
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tabella dettagliata */}
      {timelineData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Dettaglio giornaliero</CardTitle>
            <CardDescription>
              Consensi raccolti per giorno e categoria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Data</th>
                    <th className="text-right p-2">Totale</th>
                    <th className="text-right p-2">Analytics</th>
                    <th className="text-right p-2">Marketing</th>
                    <th className="text-right p-2">Preferenze</th>
                  </tr>
                </thead>
                <tbody>
                  {timelineData.map((day, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">
                        {new Date(day.date).toLocaleDateString('it-IT', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </td>
                      <td className="text-right p-2 font-medium">{day.total}</td>
                      <td className="text-right p-2">{day.analytics}</td>
                      <td className="text-right p-2">{day.marketing}</td>
                      <td className="text-right p-2">{day.preferences}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

