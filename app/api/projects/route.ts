import { NextRequest, NextResponse } from 'next/server';

// API passthrough per progetti - gestiti lato client con localStorage
export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/projects - Richiesta ricevuta');
    
    // Questa API ora è solo un placeholder
    // I progetti vengono gestiti lato client con localStorage
    return NextResponse.json({ 
      message: 'API progetti attiva - gestione lato client con localStorage',
      status: 'ready'
    });
  } catch (error) {
    console.error('GET /api/projects - Errore:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/projects - Richiesta ricevuta');

    const body = await request.json();
    console.log('POST /api/projects - Body ricevuto:', body);

    const { userId, name, domain, language } = body;

    // Validazione base
    if (!userId || !name || !domain) {
      return NextResponse.json(
        { error: 'Parametri mancanti: userId, name, domain sono richiesti' },
        { status: 400 }
      );
    }

    // Validazione dominio
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(domain)) {
      return NextResponse.json(
        { error: 'Formato dominio non valido' },
        { status: 400 }
      );
    }

    // Generiamo l'ID e la configurazione che il client userà
    const projectId = 'project_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    const bannerConfig = {
      layout: 'bottom',
      colors: {
        background: '#ffffff',
        text: '#333333',
        button_accept: '#4f46e5',
        button_reject: '#6b7280',
        button_settings: '#4f46e5'
      },
      texts: {
        title: 'Utilizziamo i cookie',
        description: 'Questo sito utilizza cookie per migliorare la tua esperienza di navigazione.',
        accept_all: 'Accetta tutti',
        reject_all: 'Rifiuta',
        settings: 'Personalizza',
        save_preferences: 'Salva Preferenze'
      },
      categories: {
        necessary: true,
        analytics: true,
        marketing: true,
        preferences: true
      }
    };

    const now = new Date().toISOString();
    
    // Restituiamo il progetto formattato che il client salverà in localStorage
    const project = {
      id: projectId,
      user_id: userId,
      name,
      domain,
      language: language || 'it',
      banner_config: bannerConfig,
      created_at: now,
      updated_at: now
    };

    console.log('POST /api/projects - Progetto generato:', project);

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('POST /api/projects - Errore:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
} 