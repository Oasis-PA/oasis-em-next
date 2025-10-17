// src/app/api/admin/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const tipo = (formData.get('tipo') as string) || 'conteudo';
    const rawSlug = (formData.get('slug') as string) || '';

    if (!file) {
      return NextResponse.json(
        { error: 'Arquivo não enviado' },
        { status: 400 }
      );
    }

    if (!rawSlug || !rawSlug.trim()) {
      return NextResponse.json(
        { error: 'Slug é obrigatório para uploads' },
        { status: 400 }
      );
    }

    // Validações de arquivo
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Arquivo deve ser uma imagem' },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Imagem muito grande. Máximo 5MB' },
        { status: 400 }
      );
    }

    // Sanitize slug
    const safeSlug = rawSlug
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9-_]/g, '-')
      .replace(/-+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 100);

    const ext = (file.name.split('.').pop() || 'jpg').replace(/[^a-z0-9]/gi, '');
    const rolePart = tipo === 'header' ? 'header' : 'conteudo';
    const timestamp = Date.now();

    // Nome do arquivo: <slug>-<tipo>-<timestamp>.<ext>
    const fileName = `${safeSlug}-${rolePart}-${timestamp}.${ext}`;
    const filePath = `artigos/${fileName}`;

    // Converte o arquivo para buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload para Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from('artigos-imagens')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
        cacheControl: '3600'
      });

    if (uploadError) {
      console.error('Erro no upload do Supabase:', uploadError);
      return NextResponse.json(
        { error: 'Erro ao fazer upload da imagem' },
        { status: 500 }
      );
    }

    // Gera URL pública
    const { data: urlData } = supabaseAdmin.storage
      .from('artigos-imagens')
      .getPublicUrl(filePath);

    const url = urlData.publicUrl;

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error('Erro ao fazer upload:', error);
    return NextResponse.json(
      { error: 'Erro ao fazer upload da imagem' },
      { status: 500 }
    );
  }
}