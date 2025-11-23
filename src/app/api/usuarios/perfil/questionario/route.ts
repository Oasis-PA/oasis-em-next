import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";

interface TokenPayload {
  id: number;
}

// Mapeamento de campos do banco para o frontend
const CAMPO_MAPPING: Record<string, string> = {
  'porosidade_capilar': 'porosidade',
  'tipo_pele': 'tipo_pele_facial',
  'estilo_cabelo': 'estado_cabelo',
};

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: "Não autorizado" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    const decoded = payload as unknown as TokenPayload;

    const usuario = await prisma.usuario.findUnique({
      where: { id_usuario: decoded.id },
      select: { id_usuario: true, nome: true, email: true }
    });

    if (!usuario) {
      return NextResponse.json({ success: false, error: "Usuário não encontrado" }, { status: 404 });
    }

    const resposta = await prisma.questionarioResposta.findFirst({
      where: { id_usuario: decoded.id },
      orderBy: { atualizado_em: "desc" },
      include: {
        Questionario: {
          include: {
            Pergunta: {
              include: {
                OpcaoResposta: true
              }
            }
          }
        }
      }
    });

    if (!resposta || !resposta.respostas) {
      return NextResponse.json({
        success: true,
        data: {
          nome: usuario.nome,
          questionario: null,
        },
      });
    }

    const respostasObj = resposta.respostas as Record<string, string>;
    const questionarioComTextos: Record<string, string> = {};

    console.log("=== DEBUG GET ===");
    console.log("Respostas do banco:", respostasObj);

    for (const pergunta of resposta.Questionario.Pergunta) {
      const campo_bd = pergunta.campo_bd;
      const valorResposta = respostasObj[campo_bd];

      console.log(`\nCampo: ${campo_bd}`);
      console.log(`Valor salvo: ${valorResposta}`);
      console.log(`Opções disponíveis:`, pergunta.OpcaoResposta.map(o => ({ valor: o.valor, texto: o.texto })));

      if (valorResposta !== undefined && valorResposta !== null) {
        const opcaoSelecionada = pergunta.OpcaoResposta.find(
          (opcao) => opcao.valor === valorResposta
        );

        console.log(`Opção encontrada:`, opcaoSelecionada);

        const textoFinal = opcaoSelecionada?.texto || valorResposta;
        const campoFrontend = CAMPO_MAPPING[campo_bd] || campo_bd;
        
        questionarioComTextos[campoFrontend] = textoFinal;
        console.log(`Campo frontend: ${campoFrontend} = ${textoFinal}`);
      }
    }

    console.log("\nResposta final:", questionarioComTextos);

    return NextResponse.json({
      success: true,
      data: {
        nome: usuario.nome,
        questionario: questionarioComTextos,
      },
    });
  } catch (error: any) {
    console.error("Erro GET /api/usuarios/perfil/questionario:", error);
    return NextResponse.json({ success: false, error: "Erro ao obter perfil" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
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

    const body = await req.json();
    const { slug, respostas } = body;

    const questionario = await prisma.questionario.findUnique({
      where: { slug },
    });

    if (!questionario) {
      return NextResponse.json(
        { success: false, error: "Questionário não encontrado" },
        { status: 404 }
      );
    }

    // Deletar resposta existente e criar nova (solução temporária)
    await prisma.questionarioResposta.deleteMany({
      where: {
        id_usuario: decoded.id,
        id_questionario: questionario.id_questionario,
      }
    });

    const resultado = await prisma.questionarioResposta.create({
      data: {
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
      { success: false, error: error?.message || "Erro ao salvar respostas" },
      { status: 500 }
    );
  }
}