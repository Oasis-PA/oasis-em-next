// src/app/api/admin/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

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
        { error: 'Slug é obrigatório para uploads de header' },
        { status: 400 }
      );
    }

    // sanitize slug
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

    // Nome deve ser apenas: <slug>-header.<ext>
    const fileName = `${safeSlug}-${rolePart}.${ext}`;

    // Cria diretório se não existir
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'artigos');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Diretório já existe
    }

    // Salva o arquivo
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // Retorna a URL pública
    const url = `/images/artigos/${fileName}`;

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error('Erro ao fazer upload:', error);
    return NextResponse.json(
      { error: 'Erro ao fazer upload da imagem' },
      { status: 500 }
    );
  }
}