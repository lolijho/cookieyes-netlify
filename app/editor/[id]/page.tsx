'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LocalProjectsManager, ProjectLocal } from '@/lib/localStorage';
import { TursoBackup } from '@/lib/tursoBackup';

interface ColorPicker {
  label: string;
  value: string;
  onChange: (value: string) => void;
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
  
  const [project, setProject] = useState<ProjectLocal | null>(null);
  const [config, setConfig] = useState<any>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    const foundProject = LocalProjectsManager.getById(projectId);
    if (foundProject) {
      setProject(foundProject);
      
      // Assicurati che la configurazione includa l'icona persistente
      let bannerConfig = foundProject.banner_config;
      if (!bannerConfig.floatingIcon) {
        bannerConfig.floatingIcon = {
          enabled: true,
          position: 'bottom-right',
          text: '🍪',
          backgroundColor: '#4f46e5',
          textColor: '#ffffff'
        };
        // Salva la configurazione aggiornata
        LocalProjectsManager.update(projectId, { banner_config: bannerConfig });
      }
      
      setConfig(bannerConfig);
    } else {
      router.push('/dashboard');
    }
  }, [projectId, router]);

  const updateConfig = (key: string, value: any) => {
    if (!config) return;
    
    const newConfig = { ...config };
    const keys = key.split('.');
    let current = newConfig;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    setConfig(newConfig);
  };

  const saveBannerConfig = async () => {
    if (!project || !config) return;
    
    setSaving(true);
    try {
      LocalProjectsManager.update(projectId, { banner_config: config });
      TursoBackup.forceBackup();
      setSavedMessage('Configurazione salvata con successo!');
      setTimeout(() => setSavedMessage(''), 3000);
    } catch (error) {
      console.error('Errore nel salvaggio:', error);
    } finally {
      setSaving(false);
    }
  };

  if (!project || !config) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento editor...</p>
        </div>
      </div>
    );
  }

  const BannerPreview = () => (
    <div className={`banner-preview-container ${previewMode === 'mobile' ? 'mobile-view' : 'desktop-view'}`}>
      <div 
        className="cookie-banner-preview"
        style={{
          background: config.colors.background,
          color: config.colors.text,
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
              {config.texts.title}
            </h3>
            <p style={{ 
              margin: '0', 
              opacity: '0.9',
              lineHeight: '1.5',
              fontSize: '14px'
            }}>
              {config.texts.description}
            </p>
          </div>
          <div className="cookie-banner-buttons" style={{ 
            display: 'flex', 
            gap: '12px', 
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <button style={{
              background: config.colors.button_accept,
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
              {config.texts.accept_all}
            </button>
            <button style={{
              background: config.colors.button_reject,
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              minWidth: '120px'
            }}>
              {config.texts.reject_all}
            </button>
            <button style={{
              background: 'transparent',
              color: config.colors.button_settings,
              border: `2px solid ${config.colors.button_settings}`,
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              minWidth: '120px'
            }}>
              {config.texts.settings}
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
                <span className="text-green-600 font-medium text-sm">
                  ✅ {savedMessage}
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
                    value={config.colors.background}
                    onChange={(value) => updateConfig('colors.background', value)}
                  />
                  <ColorPickerComponent
                    label="Colore Testo"
                    value={config.colors.text}
                    onChange={(value) => updateConfig('colors.text', value)}
                  />
                  <ColorPickerComponent
                    label="Pulsante Accetta"
                    value={config.colors.button_accept}
                    onChange={(value) => updateConfig('colors.button_accept', value)}
                  />
                  <ColorPickerComponent
                    label="Pulsante Rifiuta"
                    value={config.colors.button_reject}
                    onChange={(value) => updateConfig('colors.button_reject', value)}
                  />
                  <ColorPickerComponent
                    label="Pulsante Impostazioni"
                    value={config.colors.button_settings}
                    onChange={(value) => updateConfig('colors.button_settings', value)}
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
                    value={config.texts.title}
                    onChange={(e) => updateConfig('texts.title', e.target.value)}
                    placeholder="Utilizziamo i cookie"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-700">Descrizione</Label>
                  <textarea
                    value={config.texts.description}
                    onChange={(e) => updateConfig('texts.description', e.target.value)}
                    placeholder="Questo sito utilizza cookie per migliorare la tua esperienza di navigazione."
                    rows={3}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Testo "Accetta"</Label>
                    <Input
                      value={config.texts.accept_all}
                      onChange={(e) => updateConfig('texts.accept_all', e.target.value)}
                      placeholder="Accetta tutti"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Testo "Rifiuta"</Label>
                    <Input
                      value={config.texts.reject_all}
                      onChange={(e) => updateConfig('texts.reject_all', e.target.value)}
                      placeholder="Rifiuta"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Testo "Personalizza"</Label>
                    <Input
                      value={config.texts.settings}
                      onChange={(e) => updateConfig('texts.settings', e.target.value)}
                      placeholder="Personalizza"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Testo "Salva"</Label>
                    <Input
                      value={config.texts.save_preferences}
                      onChange={(e) => updateConfig('texts.save_preferences', e.target.value)}
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
                    />
                    <div>
                      <span className="font-medium text-gray-700">🔒 Necessari</span>
                      <p className="text-xs text-gray-500">Sempre attivi</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={config.categories.analytics}
                      onChange={(e) => updateConfig('categories.analytics', e.target.checked)}
                      className="mr-3"
                    />
                    <div>
                      <span className="font-medium text-gray-700">📊 Analytics</span>
                      <p className="text-xs text-gray-500">Statistiche uso</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={config.categories.marketing}
                      onChange={(e) => updateConfig('categories.marketing', e.target.checked)}
                      className="mr-3"
                    />
                    <div>
                      <span className="font-medium text-gray-700">📢 Marketing</span>
                      <p className="text-xs text-gray-500">Pubblicità</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={config.categories.preferences}
                      onChange={(e) => updateConfig('categories.preferences', e.target.checked)}
                      className="mr-3"
                    />
                    <div>
                      <span className="font-medium text-gray-700">⚙️ Preferenze</span>
                      <p className="text-xs text-gray-500">Impostazioni</p>
                    </div>
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
                    {`<script src="${window.location.origin}/api/script/${projectId}" async></script>`}
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