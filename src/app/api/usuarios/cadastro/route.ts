// src/app/api/usuarios/cadastro/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { z, ZodError } from "zod";

// Schema manual simples - apenas campos obrigatórios
const cadastroSchema = z.object({
  nome: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
  id_genero: z.number().int().positive().optional().default(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    console.log("📥 Dados recebidos:", body); // Debug

    // Validação com Zod
    const validatedData = cadastroSchema.parse(body);
    
    console.log("✅ Dados validados:", validatedData); // Debug

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
    
    console.log("🎉 Usuário criado:", novoUsuario); // Debug

    return NextResponse.json({ 
      message: "Conta criada com sucesso!", 
      usuario: novoUsuario
    });
    
  } catch (error: unknown) {
    console.error("❌ Erro completo:", error); // Debug
    
    // Tratamento de erros de validação Zod
    if (error instanceof ZodError) {
      console.error("❌ Erros de validação:", error.errors); // Debug
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