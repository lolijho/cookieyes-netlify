import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@libsql/client';

// Inizializza client Turso
const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

// GET - Recupera un progetto specifico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID richiesto' },
        { status: 400 }
      );
    }

    // Recupera il progetto con le sue categorie
    const projectResult = await client.execute({
      sql: `
        SELECT p.*, 
               COUNT(c.id) as total_consents,
               COUNT(CASE WHEN c.created_at > datetime('now', '-7 days') THEN 1 END) as recent_consents
        FROM projects p
        LEFT JOIN consents c ON p.id = c.project_id
        WHERE p.id = ? AND p.user_id = ?
        GROUP BY p.id
      `,
      args: [projectId, userId]
    });

    if (projectResult.rows.length === 0) {
      return NextResponse.json(
        { message: 'Progetto non trovato' },
        { status: 404 }
      );
    }

    // Recupera le categorie del progetto
    const categoriesResult = await client.execute({
      sql: 'SELECT * FROM cookie_categories WHERE project_id = ? ORDER BY created_at ASC',
      args: [projectId]
    });

    // Recupera gli script di tracciamento
    const scriptsResult = await client.execute({
      sql: 'SELECT * FROM tracking_scripts WHERE project_id = ? ORDER BY created_at ASC',
      args: [projectId]
    });

    return NextResponse.json({
      project: projectResult.rows[0],
      categories: categoriesResult.rows,
      scripts: scriptsResult.rows
    });

  } catch (error) {
    console.error('Errore nel recupero progetto:', error);
    return NextResponse.json(
      { message: 'Errore interno del server' },
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
    const body = await request.json();
    const { 
      userId,
      name, 
      domain, 
      language,
      bannerPosition,
      bannerTitle,
      bannerDescription,
      bannerAcceptText,
      bannerRejectText,
      bannerCustomizeText,
      bannerBgColor,
      bannerTextColor,
      bannerAcceptBgColor,
      bannerAcceptTextColor,
      bannerRejectBgColor,
      bannerRejectTextColor
    } = body;

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID richiesto' },
        { status: 400 }
      );
    }

    // Verifica che il progetto appartenga all'utente
    const checkResult = await client.execute({
      sql: 'SELECT id FROM projects WHERE id = ? AND user_id = ?',
      args: [projectId, userId]
    });

    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { message: 'Progetto non trovato' },
        { status: 404 }
      );
    }

    const now = Math.floor(Date.now() / 1000);

    // Costruisci la query di aggiornamento dinamicamente
    const updateFields = [];
    const updateValues = [];

    if (name !== undefined) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (domain !== undefined) {
      updateFields.push('domain = ?');
      updateValues.push(domain);
    }
    if (language !== undefined) {
      updateFields.push('language = ?');
      updateValues.push(language);
    }
    if (bannerPosition !== undefined) {
      updateFields.push('banner_position = ?');
      updateValues.push(bannerPosition);
    }
    if (bannerTitle !== undefined) {
      updateFields.push('banner_title = ?');
      updateValues.push(bannerTitle);
    }
    if (bannerDescription !== undefined) {
      updateFields.push('banner_description = ?');
      updateValues.push(bannerDescription);
    }
    if (bannerAcceptText !== undefined) {
      updateFields.push('banner_accept_text = ?');
      updateValues.push(bannerAcceptText);
    }
    if (bannerRejectText !== undefined) {
      updateFields.push('banner_reject_text = ?');
      updateValues.push(bannerRejectText);
    }
    if (bannerCustomizeText !== undefined) {
      updateFields.push('banner_customize_text = ?');
      updateValues.push(bannerCustomizeText);
    }
    if (bannerBgColor !== undefined) {
      updateFields.push('banner_bg_color = ?');
      updateValues.push(bannerBgColor);
    }
    if (bannerTextColor !== undefined) {
      updateFields.push('banner_text_color = ?');
      updateValues.push(bannerTextColor);
    }
    if (bannerAcceptBgColor !== undefined) {
      updateFields.push('banner_accept_bg_color = ?');
      updateValues.push(bannerAcceptBgColor);
    }
    if (bannerAcceptTextColor !== undefined) {
      updateFields.push('banner_accept_text_color = ?');
      updateValues.push(bannerAcceptTextColor);
    }
    if (bannerRejectBgColor !== undefined) {
      updateFields.push('banner_reject_bg_color = ?');
      updateValues.push(bannerRejectBgColor);
    }
    if (bannerRejectTextColor !== undefined) {
      updateFields.push('banner_reject_text_color = ?');
      updateValues.push(bannerRejectTextColor);
    }

    if (updateFields.length === 0) {
      return NextResponse.json(
        { message: 'Nessun campo da aggiornare' },
        { status: 400 }
      );
    }

    updateFields.push('updated_at = ?');
    updateValues.push(now);
    updateValues.push(projectId);

    await client.execute({
      sql: `UPDATE projects SET ${updateFields.join(', ')} WHERE id = ?`,
      args: updateValues
    });

    // Recupera il progetto aggiornato
    const updatedProject = await client.execute({
      sql: 'SELECT * FROM projects WHERE id = ?',
      args: [projectId]
    });

    return NextResponse.json({
      message: 'Progetto aggiornato con successo',
      project: updatedProject.rows[0]
    });

  } catch (error) {
    console.error('Errore nell\'aggiornamento progetto:', error);
    return NextResponse.json(
      { message: 'Errore interno del server' },
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
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID richiesto' },
        { status: 400 }
      );
    }

    // Verifica che il progetto appartenga all'utente
    const checkResult = await client.execute({
      sql: 'SELECT id FROM projects WHERE id = ? AND user_id = ?',
      args: [projectId, userId]
    });

    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { message: 'Progetto non trovato' },
        { status: 404 }
      );
    }

    // Elimina il progetto (CASCADE eliminerà automaticamente le relazioni)
    await client.execute({
      sql: 'DELETE FROM projects WHERE id = ?',
      args: [projectId]
    });

    return NextResponse.json({
      message: 'Progetto eliminato con successo'
    });

  } catch (error) {
    console.error('Errore nell\'eliminazione progetto:', error);
    return NextResponse.json(
      { message: 'Errore interno del server' },
      { status: 500 }
    );
  }
} 