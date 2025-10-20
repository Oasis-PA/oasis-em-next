// Em: middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rotas que exigem login
const protectedRoutes = [
  '/perfil',
  
  // Adicione aqui outras rotas que devem ser protegidas
];

// Rotas de autenticação (usuário logado não deve acessar)
const authRoutes = ['/login', '/cadastro', '/cadastro2'];

// Rotas ADMIN (exigem autenticação de admin)
const adminRoutes = ['/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ========== PROTEÇÃO DO ADMIN ==========
  if (pathname.startsWith('/admin')) {
    const adminToken = request.cookies.get('admin-auth-token')?.value;

    // Se não tiver token e não estiver na página de login do admin
    if (!adminToken && pathname !== '/admin/login') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Se tiver token mas estiver na página de login, redireciona para dashboard
    if (adminToken && pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin/artigos', request.url));
    }

    // Admin autenticado, permite o acesso
    return NextResponse.next();
  }

  // ========== PROTEÇÃO DE USUÁRIO COMUM ==========
  const userToken = request.cookies.get('auth-token')?.value;

  // Se o usuário está logado e tenta acessar uma página de login/cadastro,
  // redirecione para a página inicial.
  if (userToken && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Se o usuário não está logado e tenta acessar uma rota protegida,
  // redirecione para o login.
  if (!userToken && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Caso contrário, permite o acesso.
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)',
  ],
};
