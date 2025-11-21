import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

interface ArtigoData {
  id: number;
  titulo: string;
  slug: string;
  resumo: string;
  conteudo: string;
}

async function seedArtigos() {
  try {
    console.log("📚 Importando artigos...\n");

    const artigos: ArtigoData[] = JSON.parse(
      fs.readFileSync("./scripts/artigos-data.json", "utf-8")
    );

    // Limpar artigos existentes
    await prisma.artigo.deleteMany({});
    console.log("✅ Banco limpo\n");

    console.log(`📝 Adicionando ${artigos.length} artigos...\n`);

    for (const artigo of artigos) {
      const created = await prisma.artigo.create({
        data: {
          titulo: artigo.titulo,
          slug: artigo.slug,
          conteudo: artigo.conteudo,
          resumo: artigo.resumo,
          status: "publicado",
          dataPublicacao: new Date(),
        },
      });

      console.log(`✅ ${created.id} - ${created.titulo}`);
    }

    console.log(`\n🎉 ${artigos.length} artigos criados com sucesso!`);
  } catch (error) {
    console.error("❌ Erro ao criar artigos:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedArtigos();
