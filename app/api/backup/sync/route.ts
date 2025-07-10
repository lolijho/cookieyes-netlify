import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projects, timestamp } = body;

    if (!projects || !Array.isArray(projects)) {
      return NextResponse.json(
        { error: 'Progetti non validi' },
        { status: 400 }
      );
    }

    console.log(`🔄 Sincronizzazione ${projects.length} progetti su Turso`);

    // Inizializza la tabella se non esiste
    await db.execute({
      sql: `
        CREATE TABLE IF NOT EXISTS project_backups (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          name TEXT NOT NULL,
          domain TEXT NOT NULL,
          language TEXT NOT NULL,
          banner_config TEXT NOT NULL,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          backup_timestamp TEXT NOT NULL
        )
      `,
      args: []
    });

    // Sincronizza ogni progetto
    let syncCount = 0;
    for (const project of projects) {
      try {
        // Usa INSERT OR REPLACE per aggiornare o inserire
        await db.execute({
          sql: `
            INSERT OR REPLACE INTO project_backups (
              id, user_id, name, domain, language, banner_config, 
              created_at, updated_at, backup_timestamp
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `,
          args: [
            project.id,
            project.user_id,
            project.name,
            project.domain,
            project.language,
            JSON.stringify(project.banner_config),
            project.created_at,
            project.updated_at,
            timestamp
          ]
        });
        syncCount++;
      } catch (error) {
        console.error(`Errore sync progetto ${project.id}:`, error);
      }
    }

    console.log(`✅ Sincronizzati ${syncCount}/${projects.length} progetti`);

    return NextResponse.json({
      message: 'Backup completato',
      syncedProjects: syncCount,
      totalProjects: projects.length,
      timestamp: timestamp
    });

  } catch (error) {
    console.error('Errore sincronizzazione Turso:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
} 