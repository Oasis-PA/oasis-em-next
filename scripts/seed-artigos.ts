import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

interface ArtigoData {
  id: number;
  titulo: string;
  slug: string;
  tags: string;
  resumo: string;
  conteudo: string;
}

async function seedArtigos() {
  try {
    console.log("[INFO] Importando artigos...\n");

    const artigos: ArtigoData[] = JSON.parse(
      fs.readFileSync("./scripts/artigos-data.json", "utf-8")
    );

    // Limpar artigos existentes
    await prisma.artigoTag.deleteMany({});
    await prisma.artigo.deleteMany({});
    console.log("[OK] Banco limpo\n");

    console.log(`[INFO] Adicionando ${artigos.length} artigos...\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const artigo of artigos) {
      try {
        // Parse tags
        const tagNames = artigo.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0);

        // Create or get tags
        const tags = [];
        for (const tagName of tagNames) {
          let tag = await prisma.tag.findUnique({
            where: { nome: tagName },
          });

          if (!tag) {
            tag = await prisma.tag.create({
              data: {
                nome: tagName,
              },
            });
          }
          tags.push(tag);
        }

        // Create article
        const created = await prisma.artigo.create({
          data: {
            titulo: artigo.titulo,
            slug: artigo.slug,
            conteudo: artigo.conteudo,
            resumo: artigo.resumo,
            status: "publicado",
            dataPublicacao: new Date(),
            ArtigoTag: {
              create: tags.map((tag) => ({
                tagId: tag.id_tag,
              })),
            },
          },
        });

        successCount++;
        console.log(`[OK] ${created.id}. ${created.titulo}`);
      } catch (error: any) {
        errorCount++;
        console.error(`[ERRO] ${artigo.id}. ${artigo.titulo}: ${error.message}`);
      }
    }

    console.log(`\n[RESUMO] Importacao concluida!`);
    console.log(`[SUCCESS] ${successCount} artigos criados`);
    if (errorCount > 0) {
      console.log(`[ERROR] ${errorCount} artigos com erro`);
    }
  } catch (error) {
    console.error("[FATAL] Erro ao importar artigos:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedArtigos();
