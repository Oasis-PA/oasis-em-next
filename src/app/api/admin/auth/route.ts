// src/app/api/admin/auth/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

// Validação de variáveis de ambiente obrigatórias
if (!process.env.ADMIN_USERNAME) {
  throw new Error('ADMIN_USERNAME must be set in environment variables');
}
if (!process.env.ADMIN_PASSWORD) {
  throw new Error('ADMIN_PASSWORD must be set in environment variables');
}
if (!process.env.ADMIN_JWT_SECRET) {
  throw new Error('ADMIN_JWT_SECRET must be set in environment variables');
}

const ADMIN_USER = process.env.ADMIN_USERNAME;
const ADMIN_PASS = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.ADMIN_JWT_SECRET;

// POST = Login
export async function POST(request: NextRequest) {
  // Rate Limiting: 3 tentativas a cada 15 minutos por IP
  const clientIp = getClientIp(request);
  const rateLimitResult = rateLimit(clientIp, {
    id: 'admin-login',
    limit: 3,
    window: 180, // 3 minutos
  });

  if (!rateLimitResult.success) {
    const waitMinutes = Math.ceil((rateLimitResult.resetTime - Date.now()) / 60000);
    return NextResponse.json(
      {
        error: 'Muitas tentativas de login admin. Tente novamente em ' + waitMinutes + ' minutos.',
        retryAfter: rateLimitResult.resetTime,
      },
      { status: 429 }
    );
  }

  try {
    const { username, password } = await request.json();

    // Valida credenciais
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      // Gera JWT assinado com jose
      const secret = new TextEncoder().encode(JWT_SECRET);
      const token = await new SignJWT({
        username,
        role: 'admin',
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .setIssuer('oasis-admin')
        .setAudience('oasis-admin-panel')
        .sign(secret);

      const response = NextResponse.json(
        { message: 'Login realizado com sucesso' },
        { status: 200 }
      );

      // Define o cookie de autenticação com JWT
      response.cookies.set('admin-auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 dias
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Usuário ou senha incorretos' },
      { status: 401 }
    );
  } catch (error) {
    // Não loga detalhes do erro em produção
    if (process.env.NODE_ENV === 'development') {
    }
    return NextResponse.json(
      { error: 'Erro ao processar login' },
      { status: 500 }
    );
  }
}

// DELETE = Logout
export async function DELETE() {
  const response = NextResponse.json(
    { message: 'Logout realizado com sucesso' },
    { status: 200 }
  );

  // Remove o cookie de autenticação
  response.cookies.delete('admin-auth-token');

  return response;
}
