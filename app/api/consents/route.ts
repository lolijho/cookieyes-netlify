import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../db';
import { v4 as uuidv4 } from 'uuid';
import { createHash } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      projectId, 
      consents, 
      domain, 
      userAgent, 
      timestamp 
    } = body;

    if (!projectId || !consents) {
      return NextResponse.json(
        { message: 'ProjectId e consents sono richiesti' },
        { status: 400 }
      );
    }

    // Verifica che il progetto esista
    const projectResult = await db.execute({
      sql: 'SELECT id FROM projects WHERE id = ?',
      args: [projectId]
    });

    if (projectResult.rows.length === 0) {
      return NextResponse.json(
        { message: 'Progetto non trovato' },
        { status: 404 }
      );
    }

    // Genera hash anonimi per privacy
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const ipHash = createHash('sha256').update(clientIP + projectId).digest('hex');
    
    // Crea session ID unico basato su IP, User Agent e timestamp
    const sessionData = `${clientIP}_${userAgent}_${domain}_${projectId}`;
    const sessionId = createHash('sha256').update(sessionData).digest('hex');

    const consentId = uuidv4();
    const now = Math.floor(Date.now() / 1000);
    const consentTimestamp = timestamp ? Math.floor(new Date(timestamp).getTime() / 1000) : now;

    // Verifica se esiste già un consenso per questa sessione nelle ultime 24 ore
    const existingConsent = await db.execute({
      sql: `
        SELECT id FROM consents 
        WHERE session_id = ? AND project_id = ? 
        AND created_at > datetime('now', '-1 day')
        ORDER BY created_at DESC 
        LIMIT 1
      `,
      args: [sessionId, projectId]
    });

    if (existingConsent.rows.length > 0) {
      // Aggiorna il consenso esistente
      await db.execute({
        sql: `
          UPDATE consents SET
            necessary = ?,
            analytics = ?,
            marketing = ?,
            preferences = ?,
            consent_timestamp = ?,
            created_at = ?
          WHERE id = ?
        `,
        args: [
          consents.necessary || false,
          consents.analytics || false,
          consents.marketing || false,
          consents.preferences || false,
          consentTimestamp,
          now,
          existingConsent.rows[0].id
        ]
      });

      return NextResponse.json({ 
        message: 'Consenso aggiornato con successo',
        consentId: existingConsent.rows[0].id
      });
    } else {
      // Crea nuovo consenso
      await db.execute({
        sql: `
          INSERT INTO consents (
            id, project_id, session_id, ip_hash, user_agent, domain,
            necessary, analytics, marketing, preferences,
            consent_timestamp, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        args: [
          consentId, projectId, sessionId, ipHash, userAgent, domain,
          consents.necessary || false,
          consents.analytics || false,
          consents.marketing || false,
          consents.preferences || false,
          consentTimestamp, now
        ]
      });

      return NextResponse.json({ 
        message: 'Consenso registrato con successo',
        consentId: consentId
      });
    }

  } catch (error) {
    console.error('Errore nel salvataggio consenso:', error);
    return NextResponse.json(
      { message: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

// GET - Recupera statistiche consensi per un progetto
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const userId = searchParams.get('userId');

    if (!projectId || !userId) {
      return NextResponse.json(
        { message: 'ProjectId e userId sono richiesti' },
        { status: 400 }
      );
    }

    // Verifica che il progetto appartenga all'utente
    const projectResult = await db.execute({
      sql: 'SELECT id FROM projects WHERE id = ? AND user_id = ?',
      args: [projectId, userId]
    });

    if (projectResult.rows.length === 0) {
      return NextResponse.json(
        { message: 'Progetto non trovato' },
        { status: 404 }
      );
    }

    // Statistiche consensi
    const statsResult = await db.execute({
      sql: `
        SELECT 
          COUNT(*) as total_consents,
          COUNT(CASE WHEN necessary = 1 THEN 1 END) as necessary_consents,
          COUNT(CASE WHEN analytics = 1 THEN 1 END) as analytics_consents,
          COUNT(CASE WHEN marketing = 1 THEN 1 END) as marketing_consents,
          COUNT(CASE WHEN preferences = 1 THEN 1 END) as preferences_consents,
          COUNT(CASE WHEN created_at > datetime('now', '-7 days') THEN 1 END) as recent_consents,
          COUNT(CASE WHEN created_at > datetime('now', '-1 day') THEN 1 END) as today_consents
        FROM consents 
        WHERE project_id = ?
      `,
      args: [projectId]
    });

    // Consensi per giorno negli ultimi 30 giorni
    const dailyStats = await db.execute({
      sql: `
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as count,
          COUNT(CASE WHEN analytics = 1 THEN 1 END) as analytics_count,
          COUNT(CASE WHEN marketing = 1 THEN 1 END) as marketing_count
        FROM consents 
        WHERE project_id = ? AND created_at > datetime('now', '-30 days')
        GROUP BY DATE(created_at)
        ORDER BY date DESC
      `,
      args: [projectId]
    });

    return NextResponse.json({
      stats: statsResult.rows[0] || {},
      dailyStats: dailyStats.rows || []
    });

  } catch (error) {
    console.error('Errore nel recupero statistiche:', error);
    return NextResponse.json(
      { message: 'Errore interno del server' },
      { status: 500 }
    );
  }
} 