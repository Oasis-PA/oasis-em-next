import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Não usar jsonwebtoken no middleware (Edge Runtime)
// Apenas verificar se o token existe (validação completa na API)

const protectedRoutes = ['/perfil'];
const authRoutes = ['/login', '/cadastro', '/cadastro2'];
const adminRoutes = ['/admin'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ========== PROTEÇÃO DO ADMIN ==========
  if (pathname.startsWith('/admin')) {
    const adminToken = request.cookies.get('admin-auth-token')?.value;

    // Se não tem token e não está na página de login, redireciona
    if (!adminToken && pathname !== '/admin/login') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Se tem token, valida JWT
    if (adminToken) {
      try {
        const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET!);
        await jwtVerify(adminToken, secret, {
          issuer: 'oasis-admin',
          audience: 'oasis-admin-panel',
        });

        // Token válido - se está no login, redireciona para dashboard
        if (pathname === '/admin/login') {
          return NextResponse.redirect(new URL('/admin/artigos', request.url));
        }

        return NextResponse.next();
      } catch (error) {
        // Token inválido ou expirado - limpa cookie e redireciona para login
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.delete('admin-auth-token');
        return response;
      }
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
