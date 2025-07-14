import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AuthManager } from './lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Route pubbliche che non richiedono autenticazione
  const publicRoutes = ['/login', '/register', '/api/auth/', '/api/script/', '/api/consents', '/api/init-db']
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
  
  // Bypass per le API script e consensi (devono essere pubbliche)
  if (pathname.startsWith('/api/script/') || pathname.startsWith('/api/consents')) {
    const response = NextResponse.next()
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return response
  }
  
  // Bypass per le API di autenticazione
  if (pathname.startsWith('/api/auth/')) {
    const response = NextResponse.next()
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return response
  }
  
  // Per le altre API, verifica autenticazione
  if (pathname.startsWith('/api/')) {
    const user = await AuthManager.getAuthenticatedUser(request)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Autenticazione richiesta' },
        { status: 401 }
      )
    }
    
    // Verifica accesso admin per route amministrative
    if (pathname.startsWith('/api/admin/') && !AuthManager.isAdmin(user)) {
      return NextResponse.json(
        { error: 'Accesso non autorizzato' },
        { status: 403 }
      )
    }
    
    const response = NextResponse.next()
    
    // Aggiungi informazioni utente agli headers per le API
    response.headers.set('X-User-ID', user.id)
    response.headers.set('X-User-Role', user.role)
    response.headers.set('X-User-Plan', user.plan_id || 'none')
    
    return response
  }
  
  // Verifica autenticazione per le route protette
  if (!isPublicRoute) {
    const user = await AuthManager.getAuthenticatedUser(request)
    
    if (!user) {
      // Reindirizza alla pagina di login
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
    
    // Verifica accesso admin per route amministrative
    if (pathname.startsWith('/admin') && !AuthManager.isAdmin(user)) {
      return NextResponse.json(
        { error: 'Accesso amministratore richiesto' },
        { status: 403 }
      )
    }
    
    // Aggiungi informazioni utente per le pagine
    const response = NextResponse.next()
    response.headers.set('X-User-ID', user.id)
    response.headers.set('X-User-Role', user.role)
    
    return response
  }
  
  // Per le route pubbliche, procedi normalmente
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
} 