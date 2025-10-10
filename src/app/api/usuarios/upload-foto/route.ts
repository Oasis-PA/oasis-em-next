import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

// Inicializa o Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function POST(req: NextRequest) {
  try {
    // 1. Extrai e valida o JWT token
    const authHeader = req.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Token não fornecido" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // Remove "Bearer "
    
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      return NextResponse.json(
        { error: "Token inválido ou expirado" },
        { status: 401 }
      );
    }

    const userId = decoded.id_usuario || decoded.userId || decoded.id;
    
    if (!userId) {
      return NextResponse.json(
        { error: "Token inválido" },
        { status: 401 }
      );
    }

    // 2. Extrai o arquivo
    const formData = await req.formData();
    const file = formData.get("foto") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado" },
        { status: 400 }
      );
    }

    // 3. Validações
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

    // 4. Busca foto antiga para deletar
    const usuario = await prisma.usuario.findUnique({
      where: { id_usuario: parseInt(userId) },
      select: { url_foto: true }
    });

    // 5. Deleta foto antiga do Supabase Storage
    if (usuario?.url_foto) {
      try {
        const urlObj = new URL(usuario.url_foto);
        const pathParts = urlObj.pathname.split("/");
        const bucketIndex = pathParts.findIndex(part => part === "perfil-fotos");
        
        if (bucketIndex !== -1) {
          const filePath = pathParts.slice(bucketIndex + 1).join("/");
          await supabase.storage.from("perfil-fotos").remove([filePath]);
        }
      } catch (err) {
        console.warn("Erro ao deletar foto antiga:", err);
      }
    }

    // 6. Prepara novo arquivo
    const timestamp = Date.now();
    const extension = file.name.split(".").pop() || "jpg";
    const fileName = `perfil_${timestamp}.${extension}`;
    const filePath = `${userId}/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 7. Upload para Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("perfil-fotos")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
        cacheControl: "3600"
      });

    if (uploadError) {
      console.error("Erro no upload:", uploadError);
      return NextResponse.json(
        { error: "Erro ao fazer upload da imagem" },
        { status: 500 }
      );
    }

    // 8. Gera URL pública
    const { data: urlData } = supabase.storage
      .from("perfil-fotos")
      .getPublicUrl(filePath);

    const url_foto = urlData.publicUrl;

    // 9. Atualiza no banco de dados
    await prisma.usuario.update({
      where: { id_usuario: parseInt(userId) },
      data: { url_foto }
    });

    // 10. Retorna sucesso
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
      { error: "Erro ao processar upload" },
      { status: 500 }
    );
  }
}