// src/app/api/usuarios/cadastro/route.ts
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { ZodError } from "zod";
import { cadastroSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  // Rate Limiting: 3 cadastros a cada 1 hora por IP (previne spam)
  const clientIp = getClientIp(req);
  const rateLimitResult = rateLimit(clientIp, {
    id: 'cadastro',
    limit: 3,
    window: 3600, // 1 hora
  });

  if (!rateLimitResult.success) {
    const waitMinutes = Math.ceil((rateLimitResult.resetTime - Date.now()) / 60000);
    return NextResponse.json(
      {
        error: 'Muitos cadastros. Tente novamente em ' + waitMinutes + ' minutos.',
        retryAfter: rateLimitResult.resetTime,
      },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();

    if (process.env.NODE_ENV === 'development') {
    }

    // Validação com Zod
    const validatedData = cadastroSchema.parse(body);
    

    // Verifica se o email já existe
    const usuarioExistente = await prisma.usuario.findUnique({ 
      where: { email: validatedData.email } 
    });
    
    if (usuarioExistente) {
      return NextResponse.json(
        { message: "Já existe um usuário com este email." },
        { status: 400 }
      );
    }

    // Hash da senha com bcrypt
    const senhaHash = await bcrypt.hash(validatedData.senha, 10);

    // Cria o usuário no banco
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome: validatedData.nome,
        email: validatedData.email,
        senha: senhaHash,
        id_genero: validatedData.id_genero,
      },
      select: {
        id_usuario: true,
        nome: true,
        email: true,
        data_cadastro: true,
      }
    });
    

    return NextResponse.json({ 
      message: "Conta criada com sucesso!", 
      usuario: novoUsuario
    });
    
  } catch (error: unknown) {
    
    // Tratamento de erros de validação Zod
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

    return NextResponse.json(
      { message: "Erro no servidor.", error: String(error) },
      { status: 500 }
    );
  }
}