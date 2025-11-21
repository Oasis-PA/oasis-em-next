import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function check() {
  const artigo = await prisma.artigo.findFirst({
    where: { slug: 'como-escolher-o-corte-ideal-para-o-formato-do-rosto' }
  });

  if (artigo) {
    console.log(`[OK] Artigo 35 encontrado!\n`);
    console.log(`Titulo: ${artigo.titulo}`);
    console.log(`\nConteudo (primeiros 400 chars):`);
    const conteudoStart = artigo.conteudo ? artigo.conteudo.substring(0, 400) : '';
    console.log(conteudoStart);
  } else {
    console.log(`[ERRO] Artigo nao encontrado`);
  }

  await prisma.$disconnect();
}

check();
