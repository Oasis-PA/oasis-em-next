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

async function fixArtigos() {
  try {
    console.log("🔧 Limpando todos os artigos...\n");

    // Deletar TODOS os artigos
    const deleted = await prisma.artigo.deleteMany({});

    console.log(`✅ ${deleted.count} artigos deletados\n`);

    // Ler dados corretos
    const artigos: ArtigoData[] = JSON.parse(
      fs.readFileSync("./scripts/artigos-data.json", "utf-8")
    );

    console.log(`📝 Adicionando ${artigos.length} artigos corrigidos...\n`);

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

    console.log(`\n🎉 Artigos corrigidos com sucesso!`);
  } catch (error) {
    console.error("❌ Erro:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

fixArtigos();
