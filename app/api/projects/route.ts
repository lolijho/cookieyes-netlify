import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../db';
import { AuthManager } from '../../../lib/auth';

// GET - Recupera progetti (filtrati per utente o tutti per admin)
export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/projects - Richiesta ricevuta');
    
    // Verifica autenticazione
    const user = await AuthManager.getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Accesso non autorizzato' },
        { status: 401 }
      );
    }

    let projects;
    
    if (AuthManager.isAdmin(user)) {
      // Admin vede tutti i progetti
      console.log('GET /api/projects - Admin: recupero tutti i progetti');
      const result = await db.execute({
        sql: `
          SELECT p.*, u.email as owner_email, u.first_name, u.last_name
          FROM projects p
          JOIN users u ON p.user_id = u.id
          WHERE p.is_active = 1
          ORDER BY p.created_at DESC
        `,
        args: []
      });
      
      projects = result.rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        domain: row.domain,
        language: row.language,
        banner_config: row.banner_config ? JSON.parse(row.banner_config) : null,
        is_active: Boolean(row.is_active),
        created_at: row.created_at,
        updated_at: row.updated_at,
        user_id: row.user_id,
        owner_email: row.owner_email,
        owner_name: row.first_name ? `${row.first_name} ${row.last_name}`.trim() : row.owner_email
      }));
    } else {
      // Cliente vede solo i propri progetti
      console.log('GET /api/projects - Cliente: recupero progetti per user_id:', user.id);
      const result = await db.execute({
        sql: `
          SELECT * FROM projects 
          WHERE user_id = ? AND is_active = 1
          ORDER BY created_at DESC
        `,
        args: [user.id]
      });
      
      projects = result.rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        domain: row.domain,
        language: row.language,
        banner_config: row.banner_config ? JSON.parse(row.banner_config) : null,
        is_active: Boolean(row.is_active),
        created_at: row.created_at,
        updated_at: row.updated_at,
        user_id: row.user_id
      }));
    }

    console.log(`GET /api/projects - Trovati ${projects.length} progetti`);
    
    return NextResponse.json({ 
      success: true,
      projects: projects,
      user_role: user.role
    });
  } catch (error) {
    console.error('GET /api/projects - Errore:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

// POST - Crea nuovo progetto (solo se autorizzato)
export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/projects - Richiesta ricevuta');

    // Verifica autenticazione
    const user = await AuthManager.getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Accesso non autorizzato' },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('POST /api/projects - Body ricevuto:', body);

    const { name, domain, language } = body;

    // Validazione base
    if (!name || !domain) {
      return NextResponse.json(
        { error: 'Parametri mancanti: name, domain sono richiesti' },
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

    // Verifica se l'utente ha raggiunto il limite di progetti (se non è admin)
    if (!AuthManager.isAdmin(user)) {
      const hasReachedLimit = await AuthManager.hasReachedProjectLimit(user);
      if (hasReachedLimit) {
        return NextResponse.json(
          { error: 'Hai raggiunto il limite massimo di progetti per il tuo piano' },
          { status: 403 }
        );
      }
    }

    // Verifica se esiste già un progetto con lo stesso nome/dominio per questo utente
    const existingResult = await db.execute({
      sql: 'SELECT id FROM projects WHERE user_id = ? AND (name = ? OR domain = ?) AND is_active = 1',
      args: [user.id, name, domain]
    });

    if (existingResult.rows.length > 0) {
      return NextResponse.json(
        { error: 'Esiste già un progetto con questo nome o dominio' },
        { status: 409 }
      );
    }

    // Generiamo l'ID e la configurazione del progetto
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
      },
      floatingIcon: {
        enabled: true,
        position: 'bottom-right',
        text: '🍪',
        backgroundColor: '#4f46e5',
        textColor: '#ffffff'
      }
    };

    const now = new Date().toISOString();
    
    // Salva il progetto nel database
    await db.execute({
      sql: `
        INSERT INTO projects (
          id, user_id, name, domain, language, banner_config, 
          is_active, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        projectId,
        user.id,
        name,
        domain,
        language || 'it',
        JSON.stringify(bannerConfig),
        1,
        now,
        now
      ]
    });

    // Aggiorna contatore progetti utilizzati se non è admin
    if (!AuthManager.isAdmin(user)) {
      await db.execute({
        sql: 'UPDATE users SET projects_used = projects_used + 1 WHERE id = ?',
        args: [user.id]
      });
    }

    // Log della creazione
    await db.execute({
      sql: `
        INSERT INTO audit_logs (
          user_id, action, resource, resource_id, details,
          ip_address, user_agent, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        user.id,
        'create_project',
        'project',
        projectId,
        JSON.stringify({ name, domain, language }),
        request.headers.get('x-forwarded-for') || 'unknown',
        request.headers.get('user-agent') || 'unknown',
        now
      ]
    });

    const project = {
      id: projectId,
      user_id: user.id,
      name,
      domain,
      language: language || 'it',
      banner_config: bannerConfig,
      is_active: true,
      created_at: now,
      updated_at: now
    };

    console.log('POST /api/projects - Progetto creato:', project);

    return NextResponse.json({ 
      success: true,
      project: project 
    }, { status: 201 });
  } catch (error) {
    console.error('POST /api/projects - Errore:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
} 