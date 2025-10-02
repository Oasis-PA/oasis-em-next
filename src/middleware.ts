import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rotas que exigem login
const protectedRoutes = [
  '/perfil',
  '/favoritos',
  // Adicione aqui outras rotas que devem ser protegidas
];

// Rotas de autenticação (usuário logado não deve acessar)
const authRoutes = ['/login', '/cadastro', '/cadastro2'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Se o usuário está logado e tenta acessar uma página de login/cadastro,
  // redirecione para a página inicial.
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Se o usuário não está logado e tenta acessar uma rota protegida,
  // redirecione para o login.
  if (!token && protectedRoutes.includes(pathname)) {
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