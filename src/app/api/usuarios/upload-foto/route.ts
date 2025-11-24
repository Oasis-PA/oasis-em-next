// Caminho: src/app/api/usuarios/upload-foto/route.ts

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    // 1. Extrai o token do cookie (não do header Authorization)
    const token = req.cookies.get("auth-token")?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: "Não autorizado: Token não encontrado" },
        { status: 401 }
      );
    }

    // 2. Valida o token
    let decoded: any;
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const result = await jwtVerify(token, secret);
      decoded = result.payload;
    } catch (error) {
      return NextResponse.json(
        { error: "Token inválido ou expirado" },
        { status: 401 }
      );
    }

    const userId = decoded.id || decoded.id_usuario || decoded.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: "Token inválido: ID não encontrado" },
        { status: 401 }
      );
    }

    // 3. Extrai o arquivo
    const formData = await req.formData();
    const file = formData.get("foto") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado" },
        { status: 400 }
      );
    }

    // 4. Validações
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Arquivo deve ser uma imagem" },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Imagem muito grande. Máximo 5MB" },
        { status: 400 }
      );
    }

    // 5. Busca foto antiga para deletar
    const usuario = await prisma.usuario.findUnique({
      where: { id_usuario: parseInt(userId) },
      select: { url_foto: true }
    });

    // 6. Deleta foto antiga do Supabase Storage
    if (usuario?.url_foto) {
      try {
        const urlObj = new URL(usuario.url_foto);
        const pathParts = urlObj.pathname.split("/");
        const bucketIndex = pathParts.findIndex(part => part === "perfil-fotos");
        
        if (bucketIndex !== -1) {
          const filePath = pathParts.slice(bucketIndex + 1).join("/");
          await supabaseAdmin.storage.from("perfil-fotos").remove([filePath]);
        }
      } catch (err) {
        console.log("Erro ao deletar foto antiga:", err);
      }
    }

    // 7. Prepara novo arquivo
    const timestamp = Date.now();
    const extension = file.name.split(".").pop() || "jpg";
    const fileName = `perfil_${timestamp}.${extension}`;
    const filePath = `${userId}/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 8. Upload para Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from("perfil-fotos")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
        cacheControl: "3600"
      });

    if (uploadError) {
      console.error("Erro no upload:", uploadError);
      return NextResponse.json(
        { error: "Erro ao fazer upload da imagem: " + uploadError.message },
        { status: 500 }
      );
    }

    // 9. Gera URL pública
    const { data: urlData } = supabaseAdmin.storage
      .from("perfil-fotos")
      .getPublicUrl(filePath);

    const url_foto = urlData.publicUrl;

    // 10. Atualiza no banco de dados
    await prisma.usuario.update({
      where: { id_usuario: parseInt(userId) },
      data: { url_foto }
    });

    // 11. Retorna sucesso
    return NextResponse.json(
      { 
        message: "Foto atualizada com sucesso",
        url_foto
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erro no upload:", error);
    return NextResponse.json(
      { error: "Erro ao processar upload: " + (error instanceof Error ? error.message : "desconhecido") },
      { status: 500 }
    );
  }
}