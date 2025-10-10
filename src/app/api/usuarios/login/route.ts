// src/app/api/usuarios/login/route.ts
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { z, ZodError } from "zod";

// Schema simples para login
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(1, "Senha é obrigatória"),
});

export async function POST(req: NextRequest) {
  try {
    console.log("[LOGIN] Iniciando processo de login");

    const body = await req.json();
    console.log("[LOGIN] Body recebido, email:", body.email);

    const { email, senha } = loginSchema.parse(body);
    console.log("[LOGIN] Schema validado com sucesso");

    console.log("[LOGIN] Buscando usuário no banco...");
    const user = await prisma.usuario.findUnique({
      where: { email },
      include: {
        genero: true,
        tipo_cabelo: true,
      }
    });
    console.log("[LOGIN] Usuário encontrado:", !!user);

    if (!user) {
      return NextResponse.json(
        { message: "Email ou senha incorretos." },
        { status: 401 }
      );
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);
    
    if (!senhaValida) {
      return NextResponse.json(
        { message: "Email ou senha incorretos." },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { 
        id: user.id_usuario, 
        email: user.email, 
        hasProfile: !!user.nome,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const { senha: _, ...usuarioSemSenha } = user;

    const res = NextResponse.json({ 
      message: "Login realizado com sucesso",
      success: true,
      usuario: usuarioSemSenha
    });

    // CORREÇÃO AQUI: Mudar o nome do cookie para 'auth-token'
    res.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    return res;
    
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      console.error("[LOGIN] Erro de validação:", error.errors);
      return NextResponse.json(
        {
          message: "Dados inválidos",
          errors: error.errors.map(err => ({
            campo: err.path.join('.'),
            mensagem: err.message
          }))
        },
        { status: 400 }
      );
    }

    console.error("[LOGIN] Erro crítico:", error);
    console.error("[LOGIN] Stack:", error instanceof Error ? error.stack : 'N/A');
    console.error("[LOGIN] DATABASE_URL definida?", !!process.env.DATABASE_URL);
    console.error("[LOGIN] JWT_SECRET definido?", !!process.env.JWT_SECRET);

    return NextResponse.json(
      {
        message: "Erro interno no servidor.",
        details: process.env.NODE_ENV === "development" ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}