// Caminho: src/app/api/usuarios/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({
      message: "Logout realizado com sucesso.",
      success: true,
    });

    // Apaga o cookie 'auth-token' ao definir a sua data de expiração para o passado.
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      path: '/',
      maxAge: -1, // Diz ao navegador para expirar o cookie imediatamente
    });

    return response;

  } catch (error) {
    return NextResponse.json({ message: "Erro ao fazer logout." }, { status: 500 });
  }
}