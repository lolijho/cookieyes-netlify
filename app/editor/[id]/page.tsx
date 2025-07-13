'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ColorPicker {
  label: string;
  value: string;
  onChange: (value: string) => void;
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

const ColorPickerComponent = ({ label, value, onChange }: ColorPicker) => (
  <div className="color-picker-group">
    <Label className="text-sm font-semibold text-gray-700">{label}</Label>
    <div className="flex items-center gap-3 mt-2">
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-gray-300 transition-colors"
          title={`Seleziona ${label}`}
          aria-label={`Seleziona ${label}`}
        />
      </div>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 font-mono text-sm"
        placeholder="#ffffff"
      />
    </div>
  </div>
);

export default function BannerEditor() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  
  const [user, setUser] = useState<User | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [config, setConfig] = useState<any>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuthAndLoadProject();
  }, [projectId]);

  const checkAuthAndLoadProject = async () => {
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

      // Prima prova a caricare da localStorage per velocità
      const localStorageKey = `banner_config_${projectId}`;
      const localConfig = localStorage.getItem(localStorageKey);
      
      if (localConfig) {
        try {
          const parsedConfig = JSON.parse(localConfig);
          setConfig(parsedConfig);
          console.log('Configurazione caricata da localStorage');
        } catch (e) {
          console.warn('Errore nel parsing della configurazione locale:', e);
        }
      }

      // Carica il progetto dal database
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
      
      // Imposta configurazione banner dal database (se più recente o se non presente in localStorage)
      let bannerConfig = projectData.project.banner_config || getDefaultBannerConfig();
      
      // Assicura che la configurazione includa l'icona persistente
      if (!bannerConfig.floatingIcon) {
        bannerConfig.floatingIcon = {
          enabled: true,
          position: 'bottom-right',
          text: '🍪',
          backgroundColor: '#4f46e5',
          textColor: '#ffffff'
        };
      }
      
      // Se non c'era configurazione locale o se quella del database è diversa, aggiorna
      if (!localConfig || JSON.stringify(bannerConfig) !== localConfig) {
        setConfig(bannerConfig);
        localStorage.setItem(localStorageKey, JSON.stringify(bannerConfig));
        console.log('Configurazione sincronizzata dal database');
      }
      
    } catch (error) {
      console.error('Errore nel caricamento:', error);
      setError('Errore interno del server');
    } finally {
      setLoading(false);
    }
  };

  const getDefaultBannerConfig = () => ({
    layout: 'bottom',
    backgroundColor: '#ffffff',
    textColor: '#333333',
    acceptButtonColor: '#4f46e5',
    rejectButtonColor: '#6b7280',
    settingsButtonColor: '#4f46e5',
    title: 'Utilizziamo i cookie',
    description: 'Questo sito utilizza cookie per migliorare la tua esperienza di navigazione.',
    acceptButtonText: 'Accetta tutti',
    rejectButtonText: 'Rifiuta',
    settingsButtonText: 'Personalizza',
    saveButtonText: 'Salva Preferenze',
    categories: {
      necessary: { enabled: true, name: 'Necessari', description: 'Sempre attivi' },
      analytics: { enabled: true, name: 'Analytics', description: 'Statistiche sito' },
      marketing: { enabled: true, name: 'Marketing', description: 'Pubblicità' },
      preferences: { enabled: true, name: 'Preferenze', description: 'Personalizzazione' }
    },
    floatingIcon: {
      enabled: true,
      position: 'bottom-right',
      text: '🍪',
      backgroundColor: '#4f46e5',
      textColor: '#ffffff'
    }
  });

  const updateConfig = (key: string, value: any) => {
    if (!config) return;
    
    let newConfig = { ...config };
    
    // Gestione delle proprietà annidate (es. categories.analytics.enabled)
    if (key.includes('.')) {
      const keys = key.split('.');
      let current = newConfig;
      
      // Naviga fino al penultimo livello
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      // Imposta il valore finale
      current[keys[keys.length - 1]] = value;
    } else {
      // Proprietà di primo livello
      newConfig[key] = value;
    }
    
    setConfig(newConfig);
    
    // Salva immediatamente in localStorage per velocità
    const localStorageKey = `banner_config_${projectId}`;
    localStorage.setItem(localStorageKey, JSON.stringify(newConfig));
  };

  const saveBannerConfig = async () => {
    if (!project || !config) return;
    
    setSaving(true);
    
    try {
      // 1. Salva immediatamente in localStorage per velocità
      const localStorageKey = `banner_config_${projectId}`;
      localStorage.setItem(localStorageKey, JSON.stringify(config));
      console.log('Configurazione salvata in localStorage');
      
      // Mostra feedback immediato
      setSavedMessage('Configurazione salvata localmente!');
      
      // 2. Poi fa backup su database
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          banner_config: config
        })
      });

      if (!response.ok) {
        throw new Error('Errore nel backup su database');
      }

      // Aggiorna il messaggio di successo
      setSavedMessage('Configurazione salvata e sincronizzata!');
      setTimeout(() => setSavedMessage(''), 3000);
      
      console.log('Configurazione sincronizzata con database');
      
    } catch (error) {
      console.error('Errore nel backup su database:', error);
      
      // Anche se il database fallisce, localStorage è aggiornato
      setSavedMessage('Salvato localmente - Errore sincronizzazione database');
      setTimeout(() => setSavedMessage(''), 4000);
      
      // Potresti implementare una retry logic qui
      console.warn('Configurazione salvata solo localmente, sync database fallita');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento editor...</p>
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

  if (!project || !config) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento configurazione...</p>
        </div>
      </div>
    );
  }

  const BannerPreview = () => (
    <div className={`banner-preview-container ${previewMode === 'mobile' ? 'mobile-view' : 'desktop-view'}`}>
      <div 
        className="cookie-banner-preview"
        style={{
          background: config.backgroundColor,
          color: config.textColor,
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
          fontSize: '14px',
          lineHeight: '1.5',
          border: `3px solid ${config.layout === 'top' ? '#e5e7eb' : '#e5e7eb'}`,
          borderTop: config.layout === 'bottom' ? '3px solid #e5e7eb' : 'none',
          borderBottom: config.layout === 'top' ? '3px solid #e5e7eb' : 'none',
          position: 'relative'
        }}
      >
        <div className="position-indicator">
          <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded-full">
            Posizione: {config.layout === 'top' ? 'Alto' : 'Basso'}
          </span>
        </div>
        
        <div className="cookie-banner-content" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginTop: '12px'
        }}>
          <div className="cookie-banner-text" style={{ flex: 1, minWidth: '300px' }}>
            <h3 style={{ 
              margin: '0 0 8px 0', 
              fontSize: '18px', 
              fontWeight: '600',
              lineHeight: '1.3'
            }}>
              {config.title}
            </h3>
            <p style={{ 
              margin: '0', 
              opacity: '0.9',
              lineHeight: '1.5',
              fontSize: '14px'
            }}>
              {config.description}
            </p>
          </div>
          <div className="cookie-banner-buttons" style={{ 
            display: 'flex', 
            gap: '12px', 
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <button style={{
              background: config.acceptButtonColor,
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              minWidth: '120px',
              transition: 'all 0.2s ease'
            }}>
              {config.acceptButtonText}
            </button>
            <button style={{
              background: config.rejectButtonColor,
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              minWidth: '120px'
            }}>
              {config.rejectButtonText}
            </button>
            <button style={{
              background: 'transparent',
              color: config.settingsButtonColor,
              border: `2px solid ${config.settingsButtonColor}`,
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              minWidth: '120px'
            }}>
              {config.settingsButtonText}
            </button>
          </div>
        </div>
      </div>
      
      {/* Anteprima Icona Persistente */}
      {config.floatingIcon?.enabled && (
        <div className="floating-icon-preview" style={{
          position: 'absolute',
          [config.floatingIcon?.position?.includes('bottom') ? 'bottom' : 'top']: '20px',
          [config.floatingIcon?.position?.includes('right') ? 'right' : 'left']: '20px',
          width: '60px',
          height: '60px',
          backgroundColor: config.floatingIcon?.backgroundColor || '#4f46e5',
          color: config.floatingIcon?.textColor || '#ffffff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          fontWeight: 'bold',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          border: '2px solid rgba(255,255,255,0.2)',
          textShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span>{config.floatingIcon?.text || '🍪'}</span>
            <div className="floating-icon-tooltip" style={{
              position: 'absolute',
              bottom: '70px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0,0,0,0.8)',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              opacity: '0',
              visibility: 'hidden',
              transition: 'all 0.3s ease',
              pointerEvents: 'none'
            }}>
              Gestisci Cookie
            </div>
          </div>
        </div>
      )}
    </div>
  );

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
                <h1 className="text-2xl font-bold text-gray-900">Editor Banner Cookie</h1>
                <p className="text-sm text-gray-600">
                  Progetto: <span className="font-semibold">{project.name}</span> • 
                  Dominio: <span className="font-semibold">{project.domain}</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {savedMessage && (
                <span className={`text-sm font-medium ${
                  savedMessage.includes('Errore') ? 'text-red-600' : 'text-green-600'
                }`}>
                  {savedMessage.includes('Errore') ? '❌' : '✅'} {savedMessage}
                </span>
              )}
              
              <div className="preview-toggle bg-gray-100 rounded-lg p-1 flex">
                <button 
                  onClick={() => setPreviewMode('desktop')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    previewMode === 'desktop' 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  💻 Desktop
                </button>
                <button 
                  onClick={() => setPreviewMode('mobile')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    previewMode === 'mobile' 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  📱 Mobile
                </button>
              </div>
              
              <Button 
                onClick={saveBannerConfig}
                disabled={saving}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6"
              >
                {saving ? '💾 Salvando...' : '💾 Salva Configurazione'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Panel di Configurazione */}
          <div className="space-y-6">
            {/* Layout */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  📐 Layout e Posizione
                </CardTitle>
                <CardDescription>
                  Configura dove apparirà il banner sulla pagina
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => updateConfig('layout', 'bottom')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      config.layout === 'bottom'
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-full h-12 bg-gray-100 rounded mb-2 relative">
                      <div className="absolute bottom-0 left-0 right-0 h-3 bg-indigo-400 rounded-b"></div>
                    </div>
                    <span className="text-sm font-medium">In Basso</span>
                  </button>
                  <button
                    onClick={() => updateConfig('layout', 'top')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      config.layout === 'top'
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-full h-12 bg-gray-100 rounded mb-2 relative">
                      <div className="absolute top-0 left-0 right-0 h-3 bg-indigo-400 rounded-t"></div>
                    </div>
                    <span className="text-sm font-medium">In Alto</span>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Colori */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  🎨 Colori e Stile
                </CardTitle>
                <CardDescription>
                  Personalizza l'aspetto visuale del banner
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ColorPickerComponent
                    label="Sfondo Banner"
                    value={config.backgroundColor}
                    onChange={(value) => updateConfig('backgroundColor', value)}
                  />
                  <ColorPickerComponent
                    label="Colore Testo"
                    value={config.textColor}
                    onChange={(value) => updateConfig('textColor', value)}
                  />
                  <ColorPickerComponent
                    label="Pulsante Accetta"
                    value={config.acceptButtonColor}
                    onChange={(value) => updateConfig('acceptButtonColor', value)}
                  />
                  <ColorPickerComponent
                    label="Pulsante Rifiuta"
                    value={config.rejectButtonColor}
                    onChange={(value) => updateConfig('rejectButtonColor', value)}
                  />
                  <ColorPickerComponent
                    label="Pulsante Impostazioni"
                    value={config.settingsButtonColor}
                    onChange={(value) => updateConfig('settingsButtonColor', value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Testi */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  📝 Contenuti e Testi
                </CardTitle>
                <CardDescription>
                  Modifica i testi che appariranno nel banner
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold text-gray-700">Titolo Principale</Label>
                  <Input
                    value={config.title}
                    onChange={(e) => updateConfig('title', e.target.value)}
                    placeholder="Utilizziamo i cookie"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-700">Descrizione</Label>
                  <textarea
                    value={config.description}
                    onChange={(e) => updateConfig('description', e.target.value)}
                    placeholder="Questo sito utilizza cookie per migliorare la tua esperienza di navigazione."
                    rows={3}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Testo "Accetta"</Label>
                    <Input
                      value={config.acceptButtonText}
                      onChange={(e) => updateConfig('acceptButtonText', e.target.value)}
                      placeholder="Accetta tutti"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Testo "Rifiuta"</Label>
                    <Input
                      value={config.rejectButtonText}
                      onChange={(e) => updateConfig('rejectButtonText', e.target.value)}
                      placeholder="Rifiuta"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Testo "Personalizza"</Label>
                    <Input
                      value={config.settingsButtonText}
                      onChange={(e) => updateConfig('settingsButtonText', e.target.value)}
                      placeholder="Personalizza"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Testo "Salva"</Label>
                    <Input
                      value={config.saveButtonText}
                      onChange={(e) => updateConfig('saveButtonText', e.target.value)}
                      placeholder="Salva Preferenze"
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categorie Cookie */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  🍪 Categorie Cookie
                </CardTitle>
                <CardDescription>
                  Gestisci le categorie di cookie disponibili
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="mr-3"
                      id="necessary-cookies"
                      aria-label="Cookie necessari (sempre attivi)"
                    />
                    <label htmlFor="necessary-cookies">
                      <span className="font-medium text-gray-700">🔒 Necessari</span>
                      <p className="text-xs text-gray-500">Sempre attivi</p>
                    </label>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={config.categories.analytics.enabled}
                      onChange={(e) => updateConfig('categories.analytics.enabled', e.target.checked)}
                      className="mr-3"
                      id="analytics-cookies"
                      aria-label="Cookie analytics"
                    />
                    <label htmlFor="analytics-cookies">
                      <span className="font-medium text-gray-700">📊 Analytics</span>
                      <p className="text-xs text-gray-500">Statistiche uso</p>
                    </label>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={config.categories.marketing.enabled}
                      onChange={(e) => updateConfig('categories.marketing.enabled', e.target.checked)}
                      className="mr-3"
                      id="marketing-cookies"
                      aria-label="Cookie marketing"
                    />
                    <label htmlFor="marketing-cookies">
                      <span className="font-medium text-gray-700">📢 Marketing</span>
                      <p className="text-xs text-gray-500">Pubblicità</p>
                    </label>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={config.categories.preferences.enabled}
                      onChange={(e) => updateConfig('categories.preferences.enabled', e.target.checked)}
                      className="mr-3"
                      id="preferences-cookies"
                      aria-label="Cookie preferenze"
                    />
                    <label htmlFor="preferences-cookies">
                      <span className="font-medium text-gray-700">⚙️ Preferenze</span>
                      <p className="text-xs text-gray-500">Impostazioni</p>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Icona Persistente */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  🎯 Icona Persistente
                </CardTitle>
                <CardDescription>
                  Configura l'icona che appare dopo che l'utente ha dato il consenso
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-700">Abilita Icona</span>
                    <p className="text-xs text-gray-500">Mostra l'icona dopo il consenso</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.floatingIcon?.enabled || false}
                      onChange={(e) => updateConfig('floatingIcon.enabled', e.target.checked)}
                      className="sr-only peer"
                      id="floating-icon-enabled"
                      aria-label="Abilita icona persistente"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                
                {config.floatingIcon?.enabled && (
                  <>
                    <div>
                      <Label className="text-sm font-semibold text-gray-700">Posizione</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {[
                          { value: 'bottom-right', label: 'Basso Destra', icon: '↘️' },
                          { value: 'bottom-left', label: 'Basso Sinistra', icon: '↙️' },
                          { value: 'top-right', label: 'Alto Destra', icon: '↗️' },
                          { value: 'top-left', label: 'Alto Sinistra', icon: '↖️' }
                        ].map((position) => (
                          <button
                            key={position.value}
                            onClick={() => updateConfig('floatingIcon.position', position.value)}
                            className={`p-3 rounded-lg border-2 transition-all text-sm ${
                              config.floatingIcon?.position === position.value
                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-lg mb-1">{position.icon}</div>
                            <div className="font-medium">{position.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-semibold text-gray-700">Testo/Emoji Icona</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          value={config.floatingIcon?.text || '🍪'}
                          onChange={(e) => updateConfig('floatingIcon.text', e.target.value)}
                          placeholder="🍪"
                          className="flex-1"
                          maxLength={4}
                        />
                        <div className="flex gap-1">
                          {['🍪', '⚙️', '📊', '🔒'].map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => updateConfig('floatingIcon.text', emoji)}
                              className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-lg"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <ColorPickerComponent
                        label="Colore Sfondo"
                        value={config.floatingIcon?.backgroundColor || '#4f46e5'}
                        onChange={(value) => updateConfig('floatingIcon.backgroundColor', value)}
                      />
                      <ColorPickerComponent
                        label="Colore Testo"
                        value={config.floatingIcon?.textColor || '#ffffff'}
                        onChange={(value) => updateConfig('floatingIcon.textColor', value)}
                      />
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">💡 Come Funziona</h4>
                      <p className="text-sm text-blue-800 leading-relaxed">
                        L'icona appare automaticamente dopo che l'utente ha accettato o rifiutato i cookie. 
                        Cliccando sull'icona si riaprono le impostazioni dei cookie per modificare le preferenze.
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Anteprima */}
          <div className="lg:sticky lg:top-24">
            <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  👀 Anteprima Live
                </CardTitle>
                <CardDescription>
                  Vedi come apparirà il banner sul tuo sito
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BannerPreview />
                
                {/* Info Script */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">🚀 Codice di Integrazione</h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm overflow-x-auto">
                    {`<script src="${typeof window !== 'undefined' ? window.location.origin : 'https://cookie-facile.com'}/api/script/${projectId}" async></script>`}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Copia questo codice e incollalo nel tuo sito web prima del tag &lt;/body&gt;
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        .banner-preview-container.mobile-view {
          max-width: 400px;
          margin: 0 auto;
        }
        
        .banner-preview-container.mobile-view .cookie-banner-content {
          flex-direction: column !important;
          text-align: center;
          gap: 16px !important;
        }
        
        .banner-preview-container.mobile-view .cookie-banner-buttons {
          width: 100%;
          justify-content: center;
          flex-direction: column;
          gap: 8px !important;
        }
        
        .position-indicator {
          position: absolute;
          top: -12px;
          right: 0;
        }
        
        .color-picker-group {
          background: rgba(249, 250, 251, 0.8);
          padding: 16px;
          border-radius: 8px;
          border: 1px solid rgba(229, 231, 235, 0.8);
        }
        
        .floating-icon-preview:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }
        
        .floating-icon-preview:hover .floating-icon-tooltip {
          opacity: 1;
          visibility: visible;
        }
        
        .floating-icon-preview:active {
          transform: translateY(0) scale(0.95);
        }
        
        .banner-preview-container {
          position: relative;
        }
        
        .banner-preview-container.mobile-view .floating-icon-preview {
          width: 50px;
          height: 50px;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
} 