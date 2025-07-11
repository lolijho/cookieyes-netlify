import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../db';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = params.id;
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('range') || '30d';
    
    console.log(`GET /api/analytics/${projectId} - Range: ${timeRange}`);
    
    // Calcola la data di inizio basata sul range
    const now = new Date();
    const daysBack = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - daysBack);
    
    try {
      // Query per ottenere tutti i consensi del progetto nel range specificato
      const consentsQuery = `
        SELECT * FROM consents 
        WHERE project_id = ? 
        AND created_at >= ? 
        ORDER BY created_at DESC
      `;
      
      const consents = await db.execute({
        sql: consentsQuery,
        args: [projectId, startDate.toISOString()]
      });
      const consentRows = consents.rows || [];
      
      // Calcola le statistiche
      const totalVisitors = consentRows.length;
      const acceptedAll = consentRows.filter((row: any) => 
        row.necessary && row.analytics && row.marketing && row.preferences
      ).length;
      const rejectedAll = consentRows.filter((row: any) => 
        row.necessary && !row.analytics && !row.marketing && !row.preferences
      ).length;
      const customized = totalVisitors - acceptedAll - rejectedAll;
      const acceptanceRate = totalVisitors > 0 ? ((acceptedAll + customized) / totalVisitors * 100) : 0;
      
      // Statistiche per categoria
      const categoryStats = {
        necessary: consentRows.filter((row: any) => row.necessary).length,
        analytics: consentRows.filter((row: any) => row.analytics).length,
        marketing: consentRows.filter((row: any) => row.marketing).length,
        preferences: consentRows.filter((row: any) => row.preferences).length
      };
      
      // Statistiche giornaliere
      const dailyStats = [];
      for (let i = daysBack - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const dayConsents = consentRows.filter((row: any) => 
          row.created_at?.startsWith(dateStr)
        );
        
        const accepted = dayConsents.filter((row: any) => 
          row.analytics || row.marketing || row.preferences
        ).length;
        const rejected = dayConsents.filter((row: any) => 
          row.necessary && !row.analytics && !row.marketing && !row.preferences
        ).length;
        
        dailyStats.push({
          date: dateStr,
          accepted,
          rejected,
          visitors: dayConsents.length
        });
      }
      
      // Formatta i consensi recenti
      const recentConsents = consentRows.slice(0, 10).map((row: any) => ({
        id: row.id,
        project_id: row.project_id,
        session_id: row.session_id,
        ip_address: row.ip_address,
        user_agent: row.user_agent,
        domain: row.domain,
        necessary: Boolean(row.necessary),
        analytics: Boolean(row.analytics),
        marketing: Boolean(row.marketing),
        preferences: Boolean(row.preferences),
        timestamp: row.timestamp,
        created_at: row.created_at
      }));
      
      const analytics = {
        totalVisitors,
        acceptedAll,
        rejectedAll,
        customized,
        acceptanceRate,
        categoryStats,
        recentConsents,
        dailyStats
      };
      
      console.log(`Analytics per progetto ${projectId}:`, analytics);
      
      return NextResponse.json(analytics);
    } catch (dbError) {
      console.error('Errore database:', dbError);
      
      // Ritorna dati mock se il database non è disponibile
      return NextResponse.json({
        totalVisitors: 0,
        acceptedAll: 0,
        rejectedAll: 0,
        customized: 0,
        acceptanceRate: 0,
        categoryStats: {
          necessary: 0,
          analytics: 0,
          marketing: 0,
          preferences: 0
        },
        recentConsents: [],
        dailyStats: []
      });
    }
  } catch (error) {
    console.error('GET /api/analytics/[id] - Errore:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
} 