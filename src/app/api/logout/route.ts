// src/app/api/usuarios/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ 
      message: "Logout realizado com sucesso!",
      success: true 
    });

    // Remove o cookie de autenticação
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: -1, // Expira imediatamente
    });

    return response;
  } catch (error) {
    console.error("Erro no logout:", error);
    return NextResponse.json(
      { message: "Erro ao fazer logout." },
      { status: 500 }
    );
  }
}