import { prisma } from '../src/lib/prisma';
import * as fs from 'fs';
import * as path from 'path';
import { hash } from 'bcryptjs';

async function importData() {
  try {
    // Buscar o arquivo mais recente
    const backupDir = path.join(process.cwd(), 'backups');

    if (!fs.existsSync(backupDir)) {
      console.error('❌ Pasta de backups não encontrada!');
      process.exit(1);
    }

    const files = fs.readdirSync(backupDir).filter(f => f.startsWith('backup-') && f.endsWith('.json'));

    if (files.length === 0) {
      console.error('❌ Nenhum backup encontrado!');
      process.exit(1);
    }

    const latestFile = files.sort().pop();
    const filepath = path.join(backupDir, latestFile!);

    console.log(`📦 Importando dados de: ${latestFile}\n`);

    const data = JSON.parse(fs.readFileSync(filepath, 'utf-8'));

    // Limpar tabelas existentes
    console.log('🗑️ Limpando tabelas existentes...');
    await prisma.imagemProduto.deleteMany();
    await prisma.favorito.deleteMany();
    await prisma.favoritoArtigo.deleteMany();
    await prisma.avaliacao.deleteMany();
    await prisma.passwordReset.deleteMany();
    await prisma.usuario.deleteMany();
    await prisma.produto.deleteMany();
    await prisma.artigo.deleteMany();
    await prisma.artigoTag.deleteMany();
    await prisma.categoria.deleteMany();
    await prisma.tipoCabelo.deleteMany();
    console.log('✅ Tabelas limpas\n');

    // Importar categorias
    if (data.categorias && data.categorias.length > 0) {
      console.log('📁 Importando categorias...');
      for (const cat of data.categorias) {
        await prisma.categoria.create({
          data: {
            id_categoria: cat.id_categoria,
            nome: cat.nome,
            descricao: cat.descricao,
          }
        });
      }
      console.log(`✅ ${data.categorias.length} categorias importadas\n`);
    }

    // Importar tipos de cabelo
    if (data.tiposCabelo && data.tiposCabelo.length > 0) {
      console.log('💇 Importando tipos de cabelo...');
      for (const tipo of data.tiposCabelo) {
        await prisma.tipoCabelo.create({
          data: {
            id_tipo_cabelo: tipo.id_tipo_cabelo,
            nome: tipo.nome,
            descricao: tipo.descricao,
          }
        });
      }
      console.log(`✅ ${data.tiposCabelo.length} tipos de cabelo importados\n`);
    }

    // Importar gêneros (se existirem)
    const generos = await prisma.genero.findMany();
    if (generos.length === 0) {
      console.log('👥 Criando gêneros base...');
      await prisma.genero.create({ data: { nome: 'Masculino', sigla: 'M' } });
      await prisma.genero.create({ data: { nome: 'Feminino', sigla: 'F' } });
      console.log('✅ Gêneros criados\n');
    }

    // Importar usuários
    if (data.usuarios && data.usuarios.length > 0) {
      console.log('👥 Importando usuários...');
      const genero1 = await prisma.genero.findFirst();
      for (const user of data.usuarios) {
        // Gerar senha aleatória hasheada
        const defaultPassword = 'senha123';
        const hashedPassword = await hash(defaultPassword, 10);

        await prisma.usuario.create({
          data: {
            id_usuario: user.id_usuario,
            nome: user.nome,
            email: user.email,
            telefone: user.telefone,
            senha: hashedPassword,
            data_nascimento: user.data_nascimento ? new Date(user.data_nascimento) : null,
            sobrenome: user.sobrenome,
            sobre: user.sobre,
            id_genero: genero1?.id_genero || 1,
            data_cadastro: new Date(user.data_cadastro),
          }
        });
      }
      console.log(`✅ ${data.usuarios.length} usuários importados (senha padrão: senha123)\n`);
    }

    // Importar produtos
    if (data.produtos && data.produtos.length > 0) {
      console.log('📦 Importando produtos...');
      for (const prod of data.produtos) {
        await prisma.produto.create({
          data: {
            id_produto: prod.id_produto,
            nome: prod.nome,
            marca: prod.marca,
            preco: prod.preco,
            descricao: prod.descricao,
            composicao: prod.composicao,
            qualidades: prod.qualidades,
            mais_detalhes: prod.mais_detalhes,
            url_imagem: prod.url_imagem,
            url_loja: prod.url_loja,
            id_categoria: 1, // Default
            data_cadastro: new Date(prod.data_cadastro),
          }
        });
      }
      console.log(`✅ ${data.produtos.length} produtos importados\n`);
    }

    // Importar artigos
    if (data.artigos && data.artigos.length > 0) {
      console.log('📝 Importando artigos...');
      for (const art of data.artigos) {
        await prisma.artigo.create({
          data: {
            id: art.id,
            titulo: art.titulo,
            slug: art.slug,
            conteudo: art.conteudo || art.resumo || '',
            resumo: art.resumo,
            imagemHeader: art.imagemHeader,
            status: art.status || 'rascunho',
            criadoEm: new Date(art.criadoEm),
            atualizadoEm: new Date(art.criadoEm),
            dataPublicacao: art.dataPublicacao ? new Date(art.dataPublicacao) : null,
            themeDark: art.themeDark || false,
          }
        });
      }
      console.log(`✅ ${data.artigos.length} artigos importados\n`);
    }

    console.log('🎉 Todos os dados foram importados com sucesso!');
    console.log(`📊 Resumo:`);
    console.log(`   Usuários: ${data.usuarios?.length || 0}`);
    console.log(`   Produtos: ${data.produtos?.length || 0}`);
    console.log(`   Artigos: ${data.artigos?.length || 0}`);

  } catch (error) {
    console.error('❌ Erro ao importar dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importData();
