import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../../db';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = params.id;
    
    console.log(`GET /api/analytics/${projectId}/export`);
    
    try {
      // Query per ottenere tutti i consensi del progetto
      const consentsQuery = `
        SELECT 
          id,
          project_id,
          session_id,
          ip_address,
          user_agent,
          domain,
          necessary,
          analytics,
          marketing,
          preferences,
          timestamp,
          created_at
        FROM consents 
        WHERE project_id = ?
        ORDER BY created_at DESC
      `;
      
      const consents = await db.execute({
        sql: consentsQuery,
        args: [projectId]
      });
      
      const consentRows = consents.rows || [];
      
      // Genera CSV
      const csvHeader = [
        'ID',
        'Project ID',
        'Session ID',
        'IP Address',
        'User Agent',
        'Domain',
        'Necessary',
        'Analytics',
        'Marketing',
        'Preferences',
        'Timestamp',
        'Created At'
      ].join(',');
      
      const csvRows = consentRows.map((row: any) => {
        return [
          row.id,
          row.project_id,
          row.session_id,
          row.ip_address || '',
          `"${(row.user_agent || '').replace(/"/g, '""')}"`, // Escape quotes
          row.domain || '',
          row.necessary ? 'Si' : 'No',
          row.analytics ? 'Si' : 'No',
          row.marketing ? 'Si' : 'No',
          row.preferences ? 'Si' : 'No',
          row.timestamp || '',
          row.created_at || ''
        ].join(',');
      });
      
      const csvContent = [csvHeader, ...csvRows].join('\n');
      
      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="analytics-${projectId}-${new Date().toISOString().split('T')[0]}.csv"`
        }
      });
      
    } catch (dbError) {
      console.error('Errore database:', dbError);
      
      // Ritorna CSV vuoto se il database non è disponibile
      const csvHeader = [
        'ID',
        'Project ID',
        'Session ID',
        'IP Address',
        'User Agent',
        'Domain',
        'Necessary',
        'Analytics',
        'Marketing',
        'Preferences',
        'Timestamp',
        'Created At'
      ].join(',');
      
      const csvContent = csvHeader + '\n# Nessun dato disponibile';
      
      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="analytics-${projectId}-${new Date().toISOString().split('T')[0]}.csv"`
        }
      });
    }
  } catch (error) {
    console.error('GET /api/analytics/[id]/export - Errore:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
} 