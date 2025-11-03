// src/app/api/usuarios/login/route.ts
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { ZodError } from "zod";
import { loginSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  // Rate Limiting: 5 tentativas a cada 15 minutos por IP
  const clientIp = getClientIp(req);
  const rateLimitResult = rateLimit(clientIp, {
    id: 'login',
    limit: 5,
    window: 900, // 15 minutos
  });

  if (!rateLimitResult.success) {
    const waitMinutes = Math.ceil((rateLimitResult.resetTime - Date.now()) / 60000);
    return NextResponse.json(
      {
        error: 'Muitas tentativas de login. Tente novamente em ' + waitMinutes + ' minutos.',
        retryAfter: rateLimitResult.resetTime,
      },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();

    const { email, senha } = loginSchema.parse(body);

    const user = await prisma.usuario.findUnique({ 
      where: { email },
      include: {
        genero: true,
        tipo_cabelo: true,
      }
    });

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

    console.error("Erro no login:", error);
    return NextResponse.json(
      { message: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}