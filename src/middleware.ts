// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = [
    '/',
    '/login',
    '/cadastro',
    '/cadastro2',
    '/resetar',
    '/hair-care',
    '/skincare',
    '/artigo1',
    '/artigo2',
    '/corte',
    '/tela-de-produto',
    '/pagina-em-manutencao'
  ];

  // Rotas de API públicas
  const publicApiRoutes = [
    '/api/usuarios/login',
    '/api/usuarios/cadastro',
    '/api/usuarios/check-email',
    '/api/usuarios/esqueceusenha'
  ];

  // Se é uma rota de API pública, permite
  if (publicApiRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Se é rota pública, permite
  if (publicRoutes.includes(pathname) || pathname.startsWith('/api/produtos') || pathname.startsWith('/api/tags')) {
    // Se está logado e tenta acessar login/cadastro, redireciona para dashboard
    if ((pathname === '/login' || pathname === '/cadastro' || pathname === '/cadastro2') && token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET!);
        return NextResponse.redirect(new URL('/dashboard', request.url));
      } catch {
        // Token inválido, permite continuar
      }
    }
    return NextResponse.next();
  }

  // Rotas protegidas - requerem autenticação
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch (error) {
    // Token inválido, redireciona para login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|logo-oasis-icon.ico).*)',
  ],
};