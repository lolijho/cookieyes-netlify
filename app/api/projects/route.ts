import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@libsql/client';
import { v4 as uuidv4 } from 'uuid';

// Inizializza client Turso
const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

// GET - Lista tutti i progetti dell'utente
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID richiesto' },
        { status: 400 }
      );
    }

    // Recupera tutti i progetti dell'utente
    const result = await client.execute({
      sql: `
        SELECT p.*, 
               COUNT(c.id) as total_consents,
               COUNT(CASE WHEN c.created_at > datetime('now', '-7 days') THEN 1 END) as recent_consents
        FROM projects p
        LEFT JOIN consents c ON p.id = c.project_id
        WHERE p.user_id = ?
        GROUP BY p.id
        ORDER BY p.created_at DESC
      `,
      args: [userId]
    });

    return NextResponse.json({
      projects: result.rows
    });

  } catch (error) {
    console.error('Errore nel recupero progetti:', error);
    return NextResponse.json(
      { message: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

// POST - Crea un nuovo progetto
export async function POST(request: NextRequest) {
  console.log('API /api/projects POST: Inizio richiesta');
  try {
    const body = await request.json();
    console.log('API /api/projects POST: Body ricevuto:', body);
    
    const { 
      userId, 
      name, 
      domain, 
      language = 'it',
      bannerPosition = 'bottom',
      bannerTitle = 'Utilizziamo i cookie',
      bannerDescription = 'Questo sito utilizza cookie per migliorare la tua esperienza di navigazione.',
      bannerAcceptText = 'Accetta tutti',
      bannerRejectText = 'Rifiuta',
      bannerCustomizeText = 'Personalizza',
      bannerBgColor = '#ffffff',
      bannerTextColor = '#333333',
      bannerAcceptBgColor = '#4f46e5',
      bannerAcceptTextColor = '#ffffff',
      bannerRejectBgColor = '#6b7280',
      bannerRejectTextColor = '#ffffff'
    } = body;

    // Validazione
    console.log('API /api/projects POST: Inizio validazione');
    if (!userId || !name || !domain) {
      console.error('API /api/projects POST: Validazione fallita - dati mancanti');
      return NextResponse.json(
        { message: 'userId, name e domain sono richiesti' },
        { status: 400 }
      );
    }

    // Validazione dominio
    try {
      new URL(`https://${domain}`);
    } catch {
      console.error('API /api/projects POST: Validazione fallita - formato dominio non valido');
      return NextResponse.json(
        { message: 'Formato dominio non valido' },
        { status: 400 }
      );
    }
    console.log('API /api/projects POST: Validazione completata');

    const projectId = uuidv4();
    const now = Math.floor(Date.now() / 1000);

    // Inizio transazione database
    console.log(`API /api/projects POST: Inizio inserimento progetto con ID: ${projectId}`);
    
    // Crea il progetto
    await client.execute({
      sql: `
        INSERT INTO projects (
          id, user_id, name, domain, language,
          banner_position, banner_title, banner_description,
          banner_accept_text, banner_reject_text, banner_customize_text,
          banner_bg_color, banner_text_color,
          banner_accept_bg_color, banner_accept_text_color,
          banner_reject_bg_color, banner_reject_text_color,
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        projectId, userId, name, domain, language,
        bannerPosition, bannerTitle, bannerDescription,
        bannerAcceptText, bannerRejectText, bannerCustomizeText,
        bannerBgColor, bannerTextColor,
        bannerAcceptBgColor, bannerAcceptTextColor,
        bannerRejectBgColor, bannerRejectTextColor,
        now, now
      ]
    });
    console.log('API /api/projects POST: Progetto inserito con successo');

    // Crea le categorie di cookie predefinite
    const categories = [
      {
        id: uuidv4(),
        name: 'necessary',
        displayName: 'Cookie Necessari',
        description: 'Cookie essenziali per il funzionamento del sito',
        isRequired: true,
        isEnabled: true
      },
      {
        id: uuidv4(),
        name: 'analytics',
        displayName: 'Cookie di Analisi',
        description: 'Cookie per raccogliere statistiche anonime sui visitatori',
        isRequired: false,
        isEnabled: true
      },
      {
        id: uuidv4(),
        name: 'marketing',
        displayName: 'Cookie di Marketing',
        description: 'Cookie per personalizzare pubblicità e contenuti',
        isRequired: false,
        isEnabled: true
      },
      {
        id: uuidv4(),
        name: 'preferences',
        displayName: 'Cookie di Preferenze',
        description: 'Cookie per ricordare le tue preferenze',
        isRequired: false,
        isEnabled: true
      }
    ];

    console.log('API /api/projects POST: Inizio inserimento categorie cookie');
    for (const category of categories) {
      await client.execute({
        sql: `
          INSERT INTO cookie_categories (
            id, project_id, name, display_name, description, 
            is_required, is_enabled, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        args: [
          uuidv4(), projectId, category.name, category.displayName, 
          category.description, category.isRequired, category.isEnabled, now
        ]
      });
    }
    console.log('API /api/projects POST: Categorie inserite con successo');

    // Recupera il progetto creato
    console.log('API /api/projects POST: Recupero progetto creato');
    const createdProject = await client.execute({
      sql: 'SELECT * FROM projects WHERE id = ?',
      args: [projectId]
    });

    console.log('API /api/projects POST: Richiesta completata con successo');
    return NextResponse.json({
      message: 'Progetto creato con successo',
      project: createdProject.rows[0]
    }, { status: 201 });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Errore sconosciuto';
    console.error('💥 ERRORE CRITICO in /api/projects POST:', errorMessage);
    
    // Aggiungo il dettaglio dell'errore nella risposta per il debug
    return NextResponse.json(
      { 
        message: 'Errore interno del server durante la creazione del progetto.',
        error: errorMessage
      },
      { status: 500 }
    );
  }
} 