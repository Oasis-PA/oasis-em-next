import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";

interface TokenPayload {
  id: number;
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: "Não autorizado" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    const decoded = payload as unknown as TokenPayload;

    // buscar usuário
    const usuario = await prisma.usuario.findUnique({
      where: { id_usuario: decoded.id },
      select: { id_usuario: true, nome: true, email: true }
    });

    if (!usuario) {
      return NextResponse.json({ success: false, error: "Usuário não encontrado" }, { status: 404 });
    }

    // buscar a resposta mais recente do usuário (se houver)
    const resposta = await prisma.questionarioResposta.findFirst({
      where: { id_usuario: decoded.id },
      orderBy: { atualizado_em: "desc" },
    });

    const questionario = resposta ? resposta.respostas ?? null : null;

    return NextResponse.json({
      success: true,
      data: {
        nome: usuario.nome,
        questionario,
      },
    });
  } catch (error: any) {
    console.error("Erro GET /api/usuarios/perfil/questionario:", error);
    return NextResponse.json({ success: false, error: "Erro ao obter perfil" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Verificar token
    const token = req.cookies.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Não autorizado" },
        { status: 401 }
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    const decoded = payload as unknown as TokenPayload;

    // 2. Pegar dados do body
    const body = await req.json();
    const { slug, respostas } = body;

    // 3. Buscar o questionário pelo slug
    const questionario = await prisma.questionario.findUnique({
      where: { slug },
    });

    if (!questionario) {
      return NextResponse.json(
        { success: false, error: "Questionário não encontrado" },
        { status: 404 }
      );
    }

    // 4. Salvar ou atualizar respostas
    const resultado = await prisma.questionarioResposta.upsert({
      where: {
        // ajuste para o nome do unique composto gerado pelo prisma no seu schema
        id_usuario_id_questionario: {
          id_usuario: decoded.id,
          id_questionario: questionario.id_questionario,
        },
      },
      update: {
        respostas: respostas,
        atualizado_em: new Date(),
      },
      create: {
        id_usuario: decoded.id,
        id_questionario: questionario.id_questionario,
        respostas: respostas,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Questionário salvo com sucesso!",
      data: resultado,
    });
  } catch (error: any) {
    console.error("Erro ao salvar questionário:", error);
    return NextResponse.json(
      { success: false, error: "Erro ao salvar respostas" },
      { status: 500 }
    );
  }
}