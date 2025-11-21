import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function check() {
  const artigo = await prisma.artigo.findFirst({
    where: { slug: 'suplementos-para-cabelo-funcionam-mesmo' },
    include: { ArtigoTag: { include: { Tag: true } } }
  });

  if (artigo) {
    console.log(`[INFO] Artigo encontrado!\n`);
    console.log(`ID: ${artigo.id}`);
    console.log(`Titulo: ${artigo.titulo}`);
    console.log(`Slug: ${artigo.slug}`);
    const resumoStart = artigo.resumo ? artigo.resumo.substring(0, 100) : '';
    console.log(`Resumo: ${resumoStart}...\n`);
    console.log(`Conteudo (primeiras 250 chars):`);
    const conteudoStart = artigo.conteudo ? artigo.conteudo.substring(0, 250) : '';
    console.log(conteudoStart + '\n');
    const tags = artigo.ArtigoTag.map(at => at.Tag.nome).join(', ');
    console.log(`Tags: ${tags}`);
  }

  await prisma.$disconnect();
}

check();
