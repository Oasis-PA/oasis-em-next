// src/app/api/admin/auth/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Credenciais do admin (use .env em produção!)
const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin123';

// POST = Login
export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Valida credenciais
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
      
      const response = NextResponse.json(
        { message: 'Login realizado com sucesso' },
        { status: 200 }
      );

      // Define o cookie de autenticação
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
    console.error('Erro no login:', error);
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