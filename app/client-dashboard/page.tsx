'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectsManager } from '@/components/ProjectsManager';

interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  role: string;
  plan_id?: string;
  email_verified: boolean;
  projects_used: number;
  api_calls_this_month: number;
}

interface Plan {
  id: string;
  display_name: string;
  max_projects: number;
  price: number;
  features: string[];
}

export default function ClientDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalConsents: 0,
    thisMonthConsents: 0
  });

  useEffect(() => {
    checkAuth();
    loadUserStats();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check');
      if (!response.ok) {
        router.push('/login');
        return;
      }
      
      const data = await response.json();
      if (data.user.role === 'admin') {
        router.push('/admin'); // Admin va alla dashboard admin
        return;
      }
      
      setUser(data.user);
      
      // Carica info piano
      if (data.user.plan_id) {
        await loadPlanInfo(data.user.plan_id);
      }
      
    } catch (error) {
      console.error('Errore controllo autenticazione:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const loadPlanInfo = async (planId: string) => {
    try {
      const response = await fetch(`/api/plans/${planId}`);
      if (response.ok) {
        const planData = await response.json();
        setPlan(planData);
      }
    } catch (error) {
      console.error('Errore caricamento piano:', error);
    }
  };

  const loadUserStats = async () => {
    try {
      const response = await fetch('/api/user/stats');
      if (response.ok) {
        const statsData = await response.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error('Errore caricamento statistiche:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Errore logout:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento dashboard...</p>
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
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🍪</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">CookieYes Clone</h1>
                  <p className="text-sm text-gray-600">Dashboard Cliente</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Alert verifica email */}
        {user && !user.email_verified && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 text-yellow-600">⚠️</div>
              <div>
                <h3 className="font-medium text-yellow-800">Email non verificata</h3>
                <p className="text-sm text-yellow-700">
                  Per utilizzare tutte le funzionalità, verifica la tua email.
                </p>
              </div>
              <Button size="sm" className="ml-auto">
                Invia nuova verifica
              </Button>
            </div>
          </div>
        )}

        {/* Cards statistiche */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Progetti</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats.totalProjects}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {plan ? `su ${plan.max_projects} disponibili` : ''}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Consensi Totali</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats.totalConsents.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-1">tutti i progetti</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Questo Mese</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats.thisMonthConsents.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-1">nuovi consensi</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Piano Attuale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-gray-900">
                {plan?.display_name || 'Nessun piano'}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {plan?.price ? `€${(plan.price / 100).toFixed(2)}/mese` : 'Gratuito'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Piano attuale */}
        {plan && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📋 {plan.display_name}
              </CardTitle>
              <CardDescription>
                Funzionalità incluse nel tuo piano
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 text-green-600">✅</div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Progetti utilizzati: <span className="font-medium">{user?.projects_used || 0}</span> su {plan.max_projects}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(((user?.projects_used || 0) / plan.max_projects) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    Upgrade Piano
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Gestione Progetti */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🚀 I Tuoi Progetti
            </CardTitle>
            <CardDescription>
              Gestisci i tuoi banner cookie e monitora le performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user && (
              <ProjectsManager 
                userId={user.id} 
                maxProjects={plan?.max_projects || 1}
                currentProjects={user.projects_used || 0}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 