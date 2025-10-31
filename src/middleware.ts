import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const protectedRoutes = ['/perfil'];
const authRoutes = ['/login', '/cadastro', '/cadastro2'];
const adminRoutes = ['/admin'];

export async function middleware(request: NextRequest) {
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

  console.log('🔍 [MIDDLEWARE DEBUG]', {
    pathname,
    hasToken: !!userToken,
    token: userToken ? `${userToken.substring(0, 20)}...` : 'none',
    jwtSecret: process.env.JWT_SECRET ? 'exists' : 'missing'
  });

  // VALIDAR SE O TOKEN É VÁLIDO (NOVO)
  let isValidToken = false;
  if (userToken) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      await jwtVerify(userToken, secret);
      isValidToken = true;
      console.log('✅ Token válido');
    } catch (error) {
      console.log('❌ Token inválido:', error instanceof Error ? error.message : 'unknown error');
      // Token inválido ou expirado - limpar cookie
      const response = NextResponse.next();
      response.cookies.delete('auth-token');
      isValidToken = false;
    }
  }

  // Se o usuário está REALMENTE logado (token válido) e tenta acessar login/cadastro
  if (isValidToken && authRoutes.includes(pathname)) {
    console.log('🔄 Redirecionando usuário logado de', pathname, 'para /');
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Se o usuário não está logado e tenta acessar rota protegida
  if (!isValidToken && protectedRoutes.includes(pathname)) {
    console.log('🔒 Redirecionando usuário não autenticado de', pathname, 'para /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)',
  ],
};