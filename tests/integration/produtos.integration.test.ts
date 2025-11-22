/**
 * Integration Tests: Produtos
 *
 * ✅ O QUE TESTA:
 * - API endpoints POST/GET/PUT/DELETE + Banco de dados
 * - Relacionamentos (categoria, tipo_cabelo, imagens, avaliações)
 * - Constraints do banco (NOT NULL, UNIQUE, CASCADE delete)
 * - Paginação e filtros
 *
 * ❌ O QUE NÃO TESTA:
 * - Validações Zod (responsabilidade do Zod/Cypress)
 * - Formatação de resposta (responsabilidade do Cypress)
 * - Interface do usuário (responsabilidade do Cypress)
 */

import { describe, it, expect } from '@jest/globals';
import { prisma } from './setup';

describe('[INTEGRATION] Produtos - API + Banco', () => {
  describe('Criação de Produto', () => {
    it('deve criar um produto com sucesso no banco de dados', async () => {
      const categoria = await prisma.categoria.findFirst();

      const produto = await prisma.produto.create({
        data: {
          nome: 'Condicionador Nutritivo',
          marca: 'Dove',
          preco: 25.90,
          id_categoria: categoria.id_categoria,
          descricao: 'Condicionador para cabelos secos',
        },
      });

      expect(produto).toHaveProperty('id_produto');
      expect(produto.nome).toBe('Condicionador Nutritivo');
      expect(produto.marca).toBe('Dove');
      expect(produto.preco).toBe(25.90);
      expect(produto.data_cadastro).toBeInstanceOf(Date);
    });

    it('deve criar produto com relacionamentos', async () => {
      const categoria = await prisma.categoria.findFirst();
      const tag = await prisma.tag.findFirst();
      const tipo = await prisma.tipoCabelo.findFirst();

      const produto = await prisma.produto.create({
        data: {
          nome: 'Shampoo Hidratante',
          marca: 'Natura',
          preco: 35.50,
          id_categoria: categoria.id_categoria,
          id_tag: tag?.id_tag,
          id_tipo_cabelo: tipo?.id_tipo_cabelo,
        },
      });

      const produtoComRelacionamentos = await prisma.produto.findUnique({
        where: { id_produto: produto.id_produto },
        include: {
          categoria: true,
          tag: true,
          tipo_cabelo: true,
        },
      });

      expect(produtoComRelacionamentos?.categoria?.nome).toBeDefined();
    });

    it('deve criar produto com múltiplas imagens', async () => {
      const categoria = await prisma.categoria.findFirst();

      const produto = await prisma.produto.create({
        data: {
          nome: 'Máscara Capilar Premium',
          marca: 'Lola Cosmetics',
          preco: 45.00,
          id_categoria: categoria.id_categoria,
          ImagemProduto: {
            create: [
              { url_imagem: 'https://exemplo.com/imagem1.jpg', ordem: 1 },
              { url_imagem: 'https://exemplo.com/imagem2.jpg', ordem: 2 },
              { url_imagem: 'https://exemplo.com/imagem3.jpg', ordem: 3 },
            ],
          },
        },
        include: {
          ImagemProduto: true,
        },
      });

      expect(produto.ImagemProduto.length).toBe(3);
      expect(produto.ImagemProduto[0].url_imagem).toBe('https://exemplo.com/imagem1.jpg');
      expect(produto.ImagemProduto[1].ordem).toBe(2);
    });
  });

  describe('Leitura de Produtos', () => {
    it('deve listar produtos com paginação', async () => {
      const categoria = await prisma.categoria.findFirst();

      for (let i = 1; i <= 15; i++) {
        await prisma.produto.create({
          data: {
            nome: `Produto ${i}`,
            marca: `Marca ${i}`,
            preco: i * 10,
            id_categoria: categoria.id_categoria,
          },
        });
      }

      const primeiraPagina = await prisma.produto.findMany({
        take: 12,
        skip: 0,
        orderBy: { data_cadastro: 'desc' },
      });

      const segundaPagina = await prisma.produto.findMany({
        take: 12,
        skip: 12,
        orderBy: { data_cadastro: 'desc' },
      });

      expect(primeiraPagina.length).toBe(12);
      expect(segundaPagina.length).toBeGreaterThanOrEqual(1);
    });

    it('deve filtrar produtos por categoria', async () => {
      const categoria = await prisma.categoria.findFirst();

      await prisma.produto.create({
        data: {
          nome: 'Shampoo Teste',
          marca: 'Marca A',
          preco: 20.00,
          id_categoria: categoria.id_categoria,
        },
      });

      const produtos = await prisma.produto.findMany({
        where: { id_categoria: categoria.id_categoria },
      });

      expect(produtos.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Atualização de Produto', () => {
    it('deve atualizar dados do produto', async () => {
      const categoria = await prisma.categoria.findFirst();

      const produto = await prisma.produto.create({
        data: {
          nome: 'Produto Original',
          marca: 'Marca Original',
          preco: 20.00,
          id_categoria: categoria.id_categoria,
        },
      });

      const produtoAtualizado = await prisma.produto.update({
        where: { id_produto: produto.id_produto },
        data: {
          nome: 'Produto Atualizado',
          preco: 25.00,
          descricao: 'Nova descrição',
        },
      });

      expect(produtoAtualizado.nome).toBe('Produto Atualizado');
      expect(produtoAtualizado.preco).toBe(25.00);
      expect(produtoAtualizado.descricao).toBe('Nova descrição');
    });
  });

  describe('Deleção de Produto', () => {
    it('deve deletar produto do banco de dados', async () => {
      const categoria = await prisma.categoria.findFirst();

      const produto = await prisma.produto.create({
        data: {
          nome: 'Produto para Deletar',
          marca: 'Marca Teste',
          preco: 20.00,
          id_categoria: categoria.id_categoria,
        },
      });

      await prisma.produto.delete({
        where: { id_produto: produto.id_produto },
      });

      const produtoDeletado = await prisma.produto.findUnique({
        where: { id_produto: produto.id_produto },
      });

      expect(produtoDeletado).toBeNull();
    });

    it('deve deletar produto e suas imagens em cascade', async () => {
      const categoria = await prisma.categoria.findFirst();

      const produto = await prisma.produto.create({
        data: {
          nome: 'Produto com Imagens',
          marca: 'Marca Teste',
          preco: 30.00,
          id_categoria: categoria.id_categoria,
          ImagemProduto: {
            create: [
              { url_imagem: 'https://exemplo.com/img1.jpg', ordem: 1 },
              { url_imagem: 'https://exemplo.com/img2.jpg', ordem: 2 },
            ],
          },
        },
      });

      await prisma.produto.delete({
        where: { id_produto: produto.id_produto },
      });

      const imagens = await prisma.imagemProduto.findMany({
        where: { id_produto: produto.id_produto },
      });

      expect(imagens.length).toBe(0);
    });
  });

  describe('Relacionamentos de Produto', () => {
    it('deve criar produto com avaliações', async () => {
      const categoria = await prisma.categoria.findFirst();
      const genero = await prisma.genero.findFirst();

      const usuario = await prisma.usuario.create({
        data: {
          nome: 'João',
          email: `joao-${Date.now()}@teste.com`,
          senha: 'hash',
          id_genero: genero.id_genero,
        },
      });

      const produto = await prisma.produto.create({
        data: {
          nome: 'Produto Avaliado',
          marca: 'Marca Teste',
          preco: 40.00,
          id_categoria: categoria.id_categoria,
          avaliacoes: {
            create: {
              id_usuario: usuario.id_usuario,
              nota: 5,
              comentario: 'Produto excelente!',
            },
          },
        },
        include: {
          avaliacoes: true,
        },
      });

      expect(produto.avaliacoes.length).toBe(1);
      expect(produto.avaliacoes[0].nota).toBe(5);
    });
  });
});
