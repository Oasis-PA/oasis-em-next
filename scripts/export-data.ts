import { prisma } from '../src/lib/prisma';
import * as fs from 'fs';
import * as path from 'path';

async function exportData() {
  try {
    console.log('📦 Exportando dados do banco de dados...\n');

    // Buscar todos os dados
    const usuarios = await prisma.usuario.findMany({
      select: {
        id_usuario: true,
        nome: true,
        email: true,
        telefone: true,
        sobrenome: true,
        sobre: true,
        data_nascimento: true,
        data_cadastro: true,
      }
    });

    const produtos = await prisma.produto.findMany({
      select: {
        id_produto: true,
        nome: true,
        marca: true,
        preco: true,
        descricao: true,
        composicao: true,
        qualidades: true,
        mais_detalhes: true,
        url_imagem: true,
        url_loja: true,
        data_cadastro: true,
      }
    });

    const artigos = await prisma.artigo.findMany({
      select: {
        id: true,
        titulo: true,
        slug: true,
        resumo: true,
        imagemHeader: true,
        status: true,
        criadoEm: true,
      }
    });

    const categorias = await prisma.categoria.findMany({
      select: {
        id_categoria: true,
        nome: true,
        descricao: true,
      }
    });

    const tiposCabelo = await prisma.tipoCabelo.findMany({
      select: {
        id_tipo_cabelo: true,
        nome: true,
        descricao: true,
      }
    });

    // Criar objeto com todos os dados
    const exportData = {
      exportDate: new Date().toISOString(),
      summary: {
        usuarios: usuarios.length,
        produtos: produtos.length,
        artigos: artigos.length,
        categorias: categorias.length,
        tiposCabelo: tiposCabelo.length,
      },
      usuarios,
      produtos,
      artigos,
      categorias,
      tiposCabelo,
    };

    // Criar pasta se não existir
    const backupDir = path.join(process.cwd(), 'backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Salvar arquivo com timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `backup-${timestamp}.json`;
    const filepath = path.join(backupDir, filename);

    fs.writeFileSync(filepath, JSON.stringify(exportData, null, 2), 'utf-8');

    console.log('✅ Dados exportados com sucesso!\n');
    console.log('📊 Resumo:');
    console.log(`   Usuários: ${usuarios.length}`);
    console.log(`   Produtos: ${produtos.length}`);
    console.log(`   Artigos: ${artigos.length}`);
    console.log(`   Categorias: ${categorias.length}`);
    console.log(`   Tipos de Cabelo: ${tiposCabelo.length}\n`);
    console.log(`📁 Arquivo salvo em: ${filepath}`);

  } catch (error) {
    console.error('❌ Erro ao exportar dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

exportData();
