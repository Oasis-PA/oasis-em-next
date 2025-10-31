import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Não usar jsonwebtoken no middleware (Edge Runtime)
// Apenas verificar se o token existe (validação completa na API)

const protectedRoutes = ['/perfil'];
const authRoutes = ['/login', '/cadastro', '/cadastro2'];
const adminRoutes = ['/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ========== PROTEÇÃO DO ADMIN ==========
  if (pathname.startsWith('/admin')) {
    const adminToken = request.cookies.get('admin-auth-token')?.value;

    if (!adminToken && pathname !== '/admin/login') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    if (adminToken && pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin/artigos', request.url));
    }

    return NextResponse.next();
  }

  // ========== PROTEÇÃO DE USUÁRIO COMUM ==========
  const userToken = request.cookies.get('auth-token')?.value;

  // NOTA: Edge Runtime não suporta jsonwebtoken
  // Apenas checamos se o token existe
  // Validação completa é feita no lado do servidor/API
  const hasUserToken = !!userToken;

  // Se o usuário tem token e tenta acessar login/cadastro, redireciona para home
  if (hasUserToken && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Se o usuário NÃO tem token e tenta acessar rota protegida, redireciona para login
  if (!hasUserToken && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)',
  ],
};