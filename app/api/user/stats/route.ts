import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../db';

export async function GET(request: NextRequest) {
  try {
    // Ottieni session ID dai cookie
    const sessionId = request.cookies.get('session_id')?.value;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Accesso non autorizzato' },
        { status: 401 }
      );
    }

    // Verifica la sessione e ottieni l'utente
    const sessionResult = await db.execute({
      sql: `
        SELECT u.id 
        FROM sessions s 
        JOIN users u ON s.user_id = u.id 
        WHERE s.id = ? AND s.expires_at > datetime('now')
      `,
      args: [sessionId]
    });

    if (sessionResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Sessione non valida' },
        { status: 401 }
      );
    }

    const userId = sessionResult.rows[0].id as string;

    // Conta progetti totali dell'utente
    const projectsResult = await db.execute({
      sql: 'SELECT COUNT(*) as count FROM projects WHERE user_id = ?',
      args: [userId]
    });

    const totalProjects = projectsResult.rows[0]?.count as number || 0;

    // Conta consensi totali per tutti i progetti dell'utente
    const consentsResult = await db.execute({
      sql: `
        SELECT COUNT(*) as count 
        FROM consents c 
        JOIN projects p ON c.project_id = p.id 
        WHERE p.user_id = ?
      `,
      args: [userId]
    });

    const totalConsents = consentsResult.rows[0]?.count as number || 0;

    // Conta consensi di questo mese
    const thisMonthResult = await db.execute({
      sql: `
        SELECT COUNT(*) as count 
        FROM consents c 
        JOIN projects p ON c.project_id = p.id 
        WHERE p.user_id = ? 
        AND c.created_at >= date('now', 'start of month')
      `,
      args: [userId]
    });

    const thisMonthConsents = thisMonthResult.rows[0]?.count as number || 0;

    // Statistiche aggiuntive
    const projectsThisMonthResult = await db.execute({
      sql: `
        SELECT COUNT(*) as count 
        FROM projects 
        WHERE user_id = ? 
        AND created_at >= date('now', 'start of month')
      `,
      args: [userId]
    });

    const projectsThisMonth = projectsThisMonthResult.rows[0]?.count as number || 0;

    // Media consensi per progetto
    const avgConsentsPerProject = totalProjects > 0 ? Math.round(totalConsents / totalProjects) : 0;

    return NextResponse.json({
      totalProjects,
      totalConsents,
      thisMonthConsents,
      projectsThisMonth,
      avgConsentsPerProject,
      lastUpdate: new Date().toISOString()
    });

  } catch (error) {
    console.error('Errore recupero statistiche utente:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
} 