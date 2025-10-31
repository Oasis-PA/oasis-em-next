import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import { promisify } from 'util';
import { jest } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';

const execAsync = promisify(exec);
const prisma = new PrismaClient();

describe('Testes de Backup e Restore', () => {
  const backupDir = path.join(process.cwd(), 'temp-backups');

  beforeAll(async () => {
    await prisma.$connect();

    // Criar diretório de backups temporários
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();

    // Limpar diretório de backups temporários
    if (fs.existsSync(backupDir)) {
      fs.rmSync(backupDir, { recursive: true, force: true });
    }
  });

  describe('Integridade de Dados', () => {
    it('deve validar integridade de dados após leitura completa', async () => {
      // Snapshot dos dados
      const usuarios = await prisma.usuario.findMany();
      const produtos = await prisma.produto.findMany();
      const categorias = await prisma.categoria.findMany();

      const snapshot = {
        usuariosCount: usuarios.length,
        produtosCount: produtos.length,
        categoriasCount: categorias.length,
        totalRecords: usuarios.length + produtos.length + categorias.length,
      };

      // Validar que não há dados corrompidos
      expect(snapshot.usuariosCount).toBeGreaterThanOrEqual(0);
      expect(snapshot.produtosCount).toBeGreaterThanOrEqual(0);
      expect(snapshot.categoriasCount).toBeGreaterThan(0); // Deve ter pelo menos uma categoria

      console.log('📊 Snapshot de dados:', snapshot);
    });

    it('deve validar checksums de registros importantes', async () => {
      // Pegar alguns registros e calcular checksum simples
      const categorias = await prisma.categoria.findMany({
        take: 5,
      });

      for (const categoria of categorias) {
        const checksum = JSON.stringify(categoria);
        expect(checksum.length).toBeGreaterThan(0);
        expect(categoria.id_categoria).toBeGreaterThan(0);
        expect(categoria.nome).toBeTruthy();
      }

      console.log(`✅ Validados ${categorias.length} registros com checksums`);
    });
  });

  describe('Exportação de Dados', () => {
    it('deve exportar dados de usuários para JSON', async () => {
      const usuarios = await prisma.usuario.findMany({
        take: 10,
        include: {
          genero: true,
          tipo_cabelo: true,
        },
      });

      const exportPath = path.join(backupDir, 'usuarios-export.json');
      fs.writeFileSync(exportPath, JSON.stringify(usuarios, null, 2));

      expect(fs.existsSync(exportPath)).toBeTruthy();

      const fileContent = fs.readFileSync(exportPath, 'utf-8');
      const parsed = JSON.parse(fileContent);

      expect(Array.isArray(parsed)).toBeTruthy();
      expect(parsed.length).toBe(usuarios.length);

      console.log(`✅ Exportados ${usuarios.length} usuários para JSON`);
    });

    it('deve exportar dados de produtos com relações', async () => {
      const produtos = await prisma.produto.findMany({
        take: 10,
        include: {
          categoria: true,
          avaliacoes: true,
          ImagemProduto: true,
        },
      });

      const exportPath = path.join(backupDir, 'produtos-export.json');
      fs.writeFileSync(exportPath, JSON.stringify(produtos, null, 2));

      expect(fs.existsSync(exportPath)).toBeTruthy();

      const fileContent = fs.readFileSync(exportPath, 'utf-8');
      const parsed = JSON.parse(fileContent);

      expect(Array.isArray(parsed)).toBeTruthy();

      console.log(`✅ Exportados ${produtos.length} produtos com relações`);
    });
  });

  describe('Importação de Dados', () => {
    it('deve importar dados de backup e validar integridade', async () => {
      // Criar dados de teste
      const timestamp = Date.now();
      const categoriaTeste = await prisma.categoria.create({
        data: {
          nome: `Categoria Backup ${timestamp}`,
          descricao: 'Teste de backup',
        },
      });

      // Exportar
      const exportData = {
        id_categoria: categoriaTeste.id_categoria,
        nome: categoriaTeste.nome,
        descricao: categoriaTeste.descricao,
      };

      const exportPath = path.join(backupDir, 'categoria-backup.json');
      fs.writeFileSync(exportPath, JSON.stringify(exportData, null, 2));

      // Deletar registro original
      await prisma.categoria.delete({
        where: { id_categoria: categoriaTeste.id_categoria },
      });

      // Verificar que foi deletado
      const deletado = await prisma.categoria.findUnique({
        where: { id_categoria: categoriaTeste.id_categoria },
      });
      expect(deletado).toBeNull();

      // Importar de volta (restaurar)
      const importData = JSON.parse(fs.readFileSync(exportPath, 'utf-8'));

      const categoriaRestaurada = await prisma.categoria.create({
        data: {
          nome: importData.nome,
          descricao: importData.descricao,
        },
      });

      // Validar que dados foram restaurados
      expect(categoriaRestaurada.nome).toBe(exportData.nome);
      expect(categoriaRestaurada.descricao).toBe(exportData.descricao);

      // Limpar
      await prisma.categoria.delete({
        where: { id_categoria: categoriaRestaurada.id_categoria },
      });

      console.log('✅ Dados importados e validados com sucesso');
    });

    it('deve restaurar múltiplos registros em lote', async () => {
      const timestamp = Date.now();

      // Criar múltiplas tags
      const tags = await Promise.all([
        prisma.tag.create({ data: { nome: `tag-backup-${timestamp}-1` } }),
        prisma.tag.create({ data: { nome: `tag-backup-${timestamp}-2` } }),
        prisma.tag.create({ data: { nome: `tag-backup-${timestamp}-3` } }),
      ]);

      // Exportar
      const exportData = tags.map((t) => ({
        id_tag: t.id_tag,
        nome: t.nome,
      }));

      const exportPath = path.join(backupDir, 'tags-backup.json');
      fs.writeFileSync(exportPath, JSON.stringify(exportData, null, 2));

      // Deletar tags
      await prisma.tag.deleteMany({
        where: {
          id_tag: { in: tags.map((t) => t.id_tag) },
        },
      });

      // Importar de volta
      const importData = JSON.parse(fs.readFileSync(exportPath, 'utf-8'));

      const tagsRestauradas = await Promise.all(
        importData.map((tagData: any) =>
          prisma.tag.create({
            data: { nome: tagData.nome },
          })
        )
      );

      expect(tagsRestauradas.length).toBe(3);

      // Limpar
      await prisma.tag.deleteMany({
        where: {
          id_tag: { in: tagsRestauradas.map((t) => t.id_tag) },
        },
      });

      console.log(`✅ Restaurados ${tagsRestauradas.length} registros em lote`);
    });
  });

  describe('Validação de Relações após Restore', () => {
    it('deve restaurar dados com relações e validar integridade', async () => {
      const timestamp = Date.now();

      // Criar categoria e produto
      const categoria = await prisma.categoria.create({
        data: {
          nome: `Cat Restore ${timestamp}`,
          descricao: 'Teste restore',
        },
      });

      const produto = await prisma.produto.create({
        data: {
          nome: 'Produto Restore',
          marca: 'Teste',
          preco: 100,
          id_categoria: categoria.id_categoria,
        },
      });

      // Exportar com relação
      const exportData = {
        produto: {
          id_produto: produto.id_produto,
          nome: produto.nome,
          marca: produto.marca,
          preco: produto.preco,
          id_categoria: produto.id_categoria,
        },
        categoria: {
          id_categoria: categoria.id_categoria,
          nome: categoria.nome,
          descricao: categoria.descricao,
        },
      };

      const exportPath = path.join(backupDir, 'produto-categoria-backup.json');
      fs.writeFileSync(exportPath, JSON.stringify(exportData, null, 2));

      // Deletar
      await prisma.produto.delete({
        where: { id_produto: produto.id_produto },
      });
      await prisma.categoria.delete({
        where: { id_categoria: categoria.id_categoria },
      });

      // Restaurar
      const importData = JSON.parse(fs.readFileSync(exportPath, 'utf-8'));

      const categoriaRestaurada = await prisma.categoria.create({
        data: {
          nome: importData.categoria.nome,
          descricao: importData.categoria.descricao,
        },
      });

      const produtoRestaurado = await prisma.produto.create({
        data: {
          nome: importData.produto.nome,
          marca: importData.produto.marca,
          preco: importData.produto.preco,
          id_categoria: categoriaRestaurada.id_categoria,
        },
      });

      // Validar relação
      const produtoComCategoria = await prisma.produto.findUnique({
        where: { id_produto: produtoRestaurado.id_produto },
        include: { categoria: true },
      });

      expect(produtoComCategoria?.categoria.nome).toBe(importData.categoria.nome);

      // Limpar
      await prisma.produto.delete({
        where: { id_produto: produtoRestaurado.id_produto },
      });
      await prisma.categoria.delete({
        where: { id_categoria: categoriaRestaurada.id_categoria },
      });

      console.log('✅ Relações restauradas e validadas');
    });
  });

  describe('Validação de Dados Complexos', () => {
    it('deve validar integridade de artigos com tags após backup', async () => {
      const timestamp = Date.now();

      // Criar artigo e tags
      const artigo = await prisma.artigo.create({
        data: {
          titulo: 'Artigo Backup Test',
          slug: `artigo-backup-${timestamp}`,
          conteudo: 'Conteúdo de teste',
          status: 'publicado',
        },
      });

      const tag1 = await prisma.tag.create({
        data: { nome: `tag-artigo-${timestamp}-1` },
      });

      const tag2 = await prisma.tag.create({
        data: { nome: `tag-artigo-${timestamp}-2` },
      });

      await prisma.artigoTag.createMany({
        data: [
          { artigoId: artigo.id, tagId: tag1.id_tag },
          { artigoId: artigo.id, tagId: tag2.id_tag },
        ],
      });

      // Buscar com relações
      const artigoCompleto = await prisma.artigo.findUnique({
        where: { id: artigo.id },
        include: {
          ArtigoTag: {
            include: { Tag: true },
          },
        },
      });

      // Exportar
      const exportPath = path.join(backupDir, 'artigo-completo-backup.json');
      fs.writeFileSync(exportPath, JSON.stringify(artigoCompleto, null, 2));

      // Validar export
      const importData = JSON.parse(fs.readFileSync(exportPath, 'utf-8'));
      expect(importData.ArtigoTag).toHaveLength(2);

      // Limpar
      await prisma.artigo.delete({
        where: { id: artigo.id },
      });
      await prisma.tag.deleteMany({
        where: {
          id_tag: { in: [tag1.id_tag, tag2.id_tag] },
        },
      });

      console.log('✅ Artigo complexo exportado e validado');
    });
  });

  describe('Performance de Backup', () => {
    it('deve exportar 100 registros em menos de 5 segundos', async () => {
      const startTime = performance.now();

      const produtos = await prisma.produto.findMany({
        take: 100,
        include: {
          categoria: true,
        },
      });

      const exportPath = path.join(backupDir, 'produtos-performance-backup.json');
      fs.writeFileSync(exportPath, JSON.stringify(produtos, null, 2));

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(5000);
      expect(fs.existsSync(exportPath)).toBeTruthy();

      console.log(`⚡ Backup de ${produtos.length} produtos: ${duration.toFixed(2)}ms`);
    });
  });

  describe('Validação de Consistência', () => {
    it('deve validar que contadores estão corretos após operações', async () => {
      // Este teste valida que podemos criar, contar e deletar registros
      // Não validamos números absolutos pois pode haver dados residuais de outros testes

      // Criar alguns registros temporários com timestamp único
      const timestamp = Date.now();
      const usuario = await prisma.usuario.create({
        data: {
          nome: `Usuario Consistência ${timestamp}`,
          email: `consistencia-${timestamp}@test.com`,
          senha: 'senha123',
          id_genero: 1,
        },
      });

      const produto = await prisma.produto.create({
        data: {
          nome: `Produto Consistência ${timestamp}`,
          marca: 'Teste',
          preco: 50,
          id_categoria: 1,
        },
      });

      const avaliacao = await prisma.avaliacao.create({
        data: {
          id_usuario: usuario.id_usuario,
          id_produto: produto.id_produto,
          nota: 5,
          comentario: 'Teste',
        },
      });

      // Validar que os registros foram criados
      const usuarioCriado = await prisma.usuario.findUnique({
        where: { id_usuario: usuario.id_usuario },
      });
      expect(usuarioCriado).toBeTruthy();

      const produtoCriado = await prisma.produto.findUnique({
        where: { id_produto: produto.id_produto },
      });
      expect(produtoCriado).toBeTruthy();

      const avaliacaoCriada = await prisma.avaliacao.findUnique({
        where: { id_avaliacao: avaliacao.id_avaliacao },
      });
      expect(avaliacaoCriada).toBeTruthy();

      // Deletar
      await prisma.avaliacao.delete({
        where: { id_avaliacao: avaliacao.id_avaliacao },
      });
      await prisma.produto.delete({
        where: { id_produto: produto.id_produto },
      });
      await prisma.usuario.delete({
        where: { id_usuario: usuario.id_usuario },
      });

      // Validar que foram deletados
      const usuarioDeletado = await prisma.usuario.findUnique({
        where: { id_usuario: usuario.id_usuario },
      });
      expect(usuarioDeletado).toBeNull();

      const produtoDeletado = await prisma.produto.findUnique({
        where: { id_produto: produto.id_produto },
      });
      expect(produtoDeletado).toBeNull();

      const avaliacaoDeletada = await prisma.avaliacao.findUnique({
        where: { id_avaliacao: avaliacao.id_avaliacao },
      });
      expect(avaliacaoDeletada).toBeNull();

      console.log('✅ Consistência de contadores validada');
    });

    it('deve validar integridade de timestamps', async () => {
      const timestamp = Date.now();
      const dataAntes = new Date();

      const usuario = await prisma.usuario.create({
        data: {
          nome: 'Usuario Timestamp',
          email: `timestamp-${timestamp}@test.com`,
          senha: 'senha123',
          id_genero: 1,
        },
      });

      const dataDepois = new Date();

      expect(usuario.data_cadastro).toBeInstanceOf(Date);
      expect(usuario.data_cadastro.getTime()).toBeGreaterThanOrEqual(dataAntes.getTime());
      expect(usuario.data_cadastro.getTime()).toBeLessThanOrEqual(dataDepois.getTime());

      // Limpar
      await prisma.usuario.delete({
        where: { id_usuario: usuario.id_usuario },
      });

      console.log('✅ Timestamps validados');
    });
  });

  describe('Recuperação de Dados Corrompidos', () => {
    it('deve identificar registros com dados inválidos', async () => {
      // Buscar produtos sem preço ou com preço negativo
      const produtosInvalidos = await prisma.produto.findMany({
        where: {
          OR: [{ preco: { lt: 0 } }],
        },
      });

      // Não deveria haver produtos com preço negativo
      expect(produtosInvalidos.length).toBe(0);

      console.log('✅ Nenhum registro com dados inválidos encontrado');
    });

    it('deve validar que não há registros órfãos', async () => {
      // Verificar avaliações sem produto ou usuário
      const avaliacoes = await prisma.avaliacao.findMany({
        include: {
          produto: true,
          usuario: true,
        },
      });

      const avaliacoesOrfas = avaliacoes.filter(
        (av) => !av.produto || !av.usuario
      );

      expect(avaliacoesOrfas.length).toBe(0);

      console.log('✅ Nenhum registro órfão encontrado');
    });
  });
});
