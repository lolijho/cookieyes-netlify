import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../db';
import { AuthManager } from '../../../../lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Verifica che l'utente sia amministratore
    const admin = await AuthManager.getAuthenticatedUser(request);
    if (!admin || !AuthManager.isAdmin(admin)) {
      return NextResponse.json(
        { error: 'Accesso amministratore richiesto' },
        { status: 403 }
      );
    }

    console.log('👑 Admin richiede statistiche sistema');

    // Statistiche generali
    const [
      usersStats,
      projectsStats,
      consentsStats,
      plansStats,
      sessionsStats
    ] = await Promise.all([
      // Statistiche utenti
      db.execute(`
        SELECT 
          COUNT(*) as total_users,
          COUNT(CASE WHEN role = 'admin' THEN 1 END) as admin_users,
          COUNT(CASE WHEN role = 'client' THEN 1 END) as client_users,
          COUNT(CASE WHEN is_active = 1 THEN 1 END) as active_users,
          COUNT(CASE WHEN email_verified = 1 THEN 1 END) as verified_users,
          COUNT(CASE WHEN last_login > datetime('now', '-30 days') THEN 1 END) as active_last_30_days
        FROM users
      `),
      
      // Statistiche progetti
      db.execute(`
        SELECT 
          COUNT(*) as total_projects,
          COUNT(CASE WHEN is_active = 1 THEN 1 END) as active_projects,
          SUM(total_views) as total_views,
          SUM(total_consents) as total_project_consents,
          AVG(total_views) as avg_views_per_project
        FROM projects
      `),
      
      // Statistiche consensi
      db.execute(`
        SELECT 
          COUNT(*) as total_consents,
          COUNT(CASE WHEN necessary = 1 THEN 1 END) as necessary_consents,
          COUNT(CASE WHEN analytics = 1 THEN 1 END) as analytics_consents,
          COUNT(CASE WHEN marketing = 1 THEN 1 END) as marketing_consents,
          COUNT(CASE WHEN preferences = 1 THEN 1 END) as preferences_consents,
          COUNT(CASE WHEN created_at > datetime('now', '-24 hours') THEN 1 END) as consents_last_24h,
          COUNT(CASE WHEN created_at > datetime('now', '-7 days') THEN 1 END) as consents_last_7_days
        FROM consents
      `),
      
      // Statistiche per piano
      db.execute(`
        SELECT 
          p.id as plan_id,
          p.display_name,
          p.price,
          COUNT(u.id) as user_count,
          COUNT(CASE WHEN u.is_active = 1 THEN 1 END) as active_user_count,
          SUM(u.projects_used) as total_projects_used
        FROM plans p
        LEFT JOIN users u ON p.id = u.plan_id
        WHERE p.is_active = 1
        GROUP BY p.id, p.display_name, p.price
        ORDER BY p.price ASC
      `),
      
      // Statistiche sessioni
      db.execute(`
        SELECT 
          COUNT(*) as total_sessions,
          COUNT(CASE WHEN expires_at > datetime('now') THEN 1 END) as active_sessions,
          COUNT(CASE WHEN created_at > datetime('now', '-24 hours') THEN 1 END) as sessions_last_24h
        FROM sessions
      `)
    ]);

    // Statistiche giornaliere degli ultimi 30 giorni
    const dailyStatsResult = await db.execute(`
      SELECT 
        DATE(created_at) as date,
        COUNT(CASE WHEN resource = 'user' AND action = 'create_user' THEN 1 END) as new_users,
        COUNT(CASE WHEN resource = 'user' AND action = 'login_success' THEN 1 END) as logins,
        COUNT(CASE WHEN resource = 'project' AND action = 'create_project' THEN 1 END) as new_projects
      FROM audit_logs 
      WHERE created_at > datetime('now', '-30 days')
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `);

    // Top progetti per consensi
    const topProjectsResult = await db.execute(`
      SELECT 
        p.id,
        p.name,
        p.domain,
        p.total_views,
        p.total_consents,
        u.email as owner_email,
        u.first_name,
        u.last_name
      FROM projects p
      JOIN users u ON p.user_id = u.id
      WHERE p.is_active = 1
      ORDER BY p.total_consents DESC
      LIMIT 10
    `);

    // Recenti azioni di audit
    const recentActivityResult = await db.execute(`
      SELECT 
        al.*,
        u.email as user_email,
        u.first_name,
        u.last_name
      FROM audit_logs al
      LEFT JOIN users u ON al.user_id = u.id
      ORDER BY al.created_at DESC
      LIMIT 20
    `);

    const stats = {
      overview: {
        totalUsers: usersStats.rows[0]?.total_users || 0,
        adminUsers: usersStats.rows[0]?.admin_users || 0,
        clientUsers: usersStats.rows[0]?.client_users || 0,
        activeUsers: usersStats.rows[0]?.active_users || 0,
        verifiedUsers: usersStats.rows[0]?.verified_users || 0,
        activeUsersLast30Days: usersStats.rows[0]?.active_last_30_days || 0,
        
        totalProjects: projectsStats.rows[0]?.total_projects || 0,
        activeProjects: projectsStats.rows[0]?.active_projects || 0,
        totalViews: projectsStats.rows[0]?.total_views || 0,
        totalConsents: consentsStats.rows[0]?.total_consents || 0,
        avgViewsPerProject: Math.round(Number(projectsStats.rows[0]?.avg_views_per_project) || 0),
        
        consentsLast24h: consentsStats.rows[0]?.consents_last_24h || 0,
        consentsLast7days: consentsStats.rows[0]?.consents_last_7_days || 0,
        
        totalSessions: sessionsStats.rows[0]?.total_sessions || 0,
        activeSessions: sessionsStats.rows[0]?.active_sessions || 0,
        sessionsLast24h: sessionsStats.rows[0]?.sessions_last_24h || 0
      },
      
      consentCategories: {
        necessary: consentsStats.rows[0]?.necessary_consents || 0,
        analytics: consentsStats.rows[0]?.analytics_consents || 0,
        marketing: consentsStats.rows[0]?.marketing_consents || 0,
        preferences: consentsStats.rows[0]?.preferences_consents || 0
      },
      
      planDistribution: plansStats.rows.map((row: any) => ({
        planId: row.plan_id,
        planName: row.display_name,
        price: row.price,
        userCount: row.user_count || 0,
        activeUserCount: row.active_user_count || 0,
        totalProjectsUsed: row.total_projects_used || 0
      })),
      
      dailyStats: dailyStatsResult.rows.map((row: any) => ({
        date: row.date,
        newUsers: row.new_users || 0,
        logins: row.logins || 0,
        newProjects: row.new_projects || 0
      })),
      
      topProjects: topProjectsResult.rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        domain: row.domain,
        totalViews: row.total_views || 0,
        totalConsents: row.total_consents || 0,
        ownerEmail: row.owner_email,
        ownerName: `${row.first_name || ''} ${row.last_name || ''}`.trim() || 'N/A'
      })),
      
      recentActivity: recentActivityResult.rows.map((row: any) => ({
        id: row.id,
        action: row.action,
        resource: row.resource,
        resourceId: row.resource_id,
        details: row.details ? JSON.parse(row.details) : null,
        userEmail: row.user_email,
        userName: `${row.first_name || ''} ${row.last_name || ''}`.trim() || 'Sistema',
        ipAddress: row.ip_address,
        createdAt: row.created_at
      }))
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error('❌ Errore ottenimento statistiche:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
} 