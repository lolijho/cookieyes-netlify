import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../db';
import { AuthManager } from '../../../../lib/auth';

// GET - Recupera dettagli di un progetto specifico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;
    console.log('GET /api/projects/[id] - Progetto ID:', projectId);
    
    // Verifica autenticazione
    const user = await AuthManager.getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Accesso non autorizzato' },
        { status: 401 }
      );
    }

    // Recupera il progetto
    const result = await db.execute({
      sql: 'SELECT * FROM projects WHERE id = ? AND is_active = 1',
      args: [projectId]
    });

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Progetto non trovato' },
        { status: 404 }
      );
    }

    const project = result.rows[0] as any;

    // Verifica autorizzazione
    if (!AuthManager.isAdmin(user) && project.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Non hai il permesso di accedere a questo progetto' },
        { status: 403 }
      );
    }

    // Formatta e restituisce il progetto
    const formattedProject = {
      id: project.id,
      name: project.name,
      domain: project.domain,
      language: project.language,
      banner_config: project.banner_config ? JSON.parse(project.banner_config) : null,
      is_active: Boolean(project.is_active),
      created_at: project.created_at,
      updated_at: project.updated_at,
      user_id: project.user_id
    };

    return NextResponse.json({
      success: true,
      project: formattedProject
    });

  } catch (error) {
    console.error('GET /api/projects/[id] - Errore:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

// PUT - Aggiorna un progetto
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;
    console.log('PUT /api/projects/[id] - Progetto ID:', projectId);
    
    // Verifica autenticazione
    const user = await AuthManager.getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Accesso non autorizzato' },
        { status: 401 }
      );
    }

    // Verifica che il progetto esista e l'utente abbia i permessi
    const canAccess = await AuthManager.canAccessProject(user, projectId);
    if (!canAccess) {
      return NextResponse.json(
        { error: 'Non hai il permesso di modificare questo progetto' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, domain, language, banner_config } = body;

    const now = new Date().toISOString();
    
    // Aggiorna il progetto
    await db.execute({
      sql: `
        UPDATE projects 
        SET name = ?, domain = ?, language = ?, banner_config = ?, updated_at = ?
        WHERE id = ? AND is_active = 1
      `,
      args: [
        name || null,
        domain || null,
        language || null,
        banner_config ? JSON.stringify(banner_config) : null,
        now,
        projectId
      ]
    });

    // Log dell'aggiornamento
    await db.execute({
      sql: `
        INSERT INTO audit_logs (
          user_id, action, resource, resource_id, details,
          ip_address, user_agent, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        user.id,
        'update_project',
        'project',
        projectId,
        JSON.stringify({ name, domain, language }),
        request.headers.get('x-forwarded-for') || 'unknown',
        request.headers.get('user-agent') || 'unknown',
        now
      ]
    });

    return NextResponse.json({
      success: true,
      message: 'Progetto aggiornato con successo'
    });

  } catch (error) {
    console.error('PUT /api/projects/[id] - Errore:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

// DELETE - Elimina un progetto
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;
    console.log('DELETE /api/projects/[id] - Progetto ID:', projectId);
    
    // Verifica autenticazione
    const user = await AuthManager.getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Accesso non autorizzato' },
        { status: 401 }
      );
    }

    // Recupera il progetto per verificare l'owner
    const result = await db.execute({
      sql: 'SELECT user_id FROM projects WHERE id = ? AND is_active = 1',
      args: [projectId]
    });

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Progetto non trovato' },
        { status: 404 }
      );
    }

    const project = result.rows[0] as any;

    // Verifica autorizzazione: solo l'owner o admin possono eliminare
    if (!AuthManager.isAdmin(user) && project.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Non hai il permesso di eliminare questo progetto' },
        { status: 403 }
      );
    }

    // Elimina il progetto (soft delete)
    const now = new Date().toISOString();
    await db.execute({
      sql: 'UPDATE projects SET is_active = 0, updated_at = ? WHERE id = ?',
      args: [now, projectId]
    });

    // Elimina anche i consensi associati
    await db.execute({
      sql: 'DELETE FROM consents WHERE project_id = ?',
      args: [projectId]
    });

    // Aggiorna contatore progetti utilizzati se non è admin
    if (!AuthManager.isAdmin(user) && project.user_id === user.id) {
      await db.execute({
        sql: 'UPDATE users SET projects_used = CASE WHEN projects_used > 0 THEN projects_used - 1 ELSE 0 END WHERE id = ?',
        args: [user.id]
      });
    }

    // Log dell'eliminazione
    await db.execute({
      sql: `
        INSERT INTO audit_logs (
          user_id, action, resource, resource_id, details,
          ip_address, user_agent, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        user.id,
        'delete_project',
        'project',
        projectId,
        JSON.stringify({ owner_id: project.user_id }),
        request.headers.get('x-forwarded-for') || 'unknown',
        request.headers.get('user-agent') || 'unknown',
        now
      ]
    });

    console.log('DELETE /api/projects/[id] - Progetto eliminato:', projectId);

    return NextResponse.json({
      success: true,
      message: 'Progetto eliminato con successo'
    });

  } catch (error) {
    console.error('DELETE /api/projects/[id] - Errore:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
} 