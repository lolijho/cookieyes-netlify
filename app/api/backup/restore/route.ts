import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../db';

export async function GET(request: NextRequest) {
  try {
    console.log('📥 Ripristino progetti da Turso');

    // Controlla se la tabella esiste
    const tableExists = await db.execute({
      sql: `
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name='project_backups'
      `,
      args: []
    });

    if (tableExists.rows.length === 0) {
      console.log('📦 Nessuna tabella backup trovata');
      return NextResponse.json({
        message: 'Nessun backup trovato',
        projects: []
      });
    }

    // Recupera tutti i progetti dal backup
    const result = await db.execute({
      sql: `
        SELECT id, user_id, name, domain, language, banner_config, 
               created_at, updated_at, backup_timestamp
        FROM project_backups
        ORDER BY backup_timestamp DESC
      `,
      args: []
    });

    const projects = result.rows.map(row => ({
      id: row.id,
      user_id: row.user_id,
      name: row.name,
      domain: row.domain,
      language: row.language,
      banner_config: JSON.parse(row.banner_config as string),
      created_at: row.created_at,
      updated_at: row.updated_at,
      backup_timestamp: row.backup_timestamp
    }));

    console.log(`✅ Ripristinati ${projects.length} progetti da Turso`);

    return NextResponse.json({
      message: 'Ripristino completato',
      projects: projects,
      count: projects.length
    });

  } catch (error) {
    console.error('Errore ripristino da Turso:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
} 