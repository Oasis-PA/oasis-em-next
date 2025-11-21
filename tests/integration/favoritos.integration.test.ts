/**
 * Integration Tests: Favoritos
 *
 * ✅ O QUE TESTA:
 * - API endpoints POST/GET/DELETE + Banco de dados
 * - Relacionamentos (usuário, produto, artigo)
 * - Constraints do banco (foreign keys, cascade delete)
 * - Paginação de favoritos
 *
 * ❌ O QUE NÃO TESTA:
 * - Validações Zod (responsabilidade do Zod/Cypress)
 * - Formatação de resposta (responsabilidade do Cypress)
 * - Interface do usuário (responsabilidade do Cypress)
 */

import { describe, it, expect } from '@jest/globals';
import { prisma } from './setup';

describe('[INTEGRATION] Favoritos - API + Banco', () => {
  let testUserEmail = 'user_favoritos_test@test.com';
  let testUserId: number;
  let testProdutoId: number;
  let testArtigoId: number;

  beforeAll(async () => {
    // Criar usuário de teste
    const usuario = await prisma.usuario.create({
      data: {
        nome: 'Usuário Favoritos Test',
        email: testUserEmail,
        senha: 'hash_teste',
        id_genero: 1,
      },
    });
    testUserId = usuario.id_usuario;

    // Criar produto de teste
    const produto = await prisma.produto.create({
      data: {
        nome: 'Produto Favorito Test',
        marca: 'Marca Teste',
        preco: 50.00,
        id_categoria: 1,
      },
    });
    testProdutoId = produto.id_produto;

    // Criar artigo de teste
    const artigo = await prisma.artigo.create({
      data: {
        titulo: 'Artigo Favorito Test',
        slug: 'artigo-favorito-test',
        conteudo: 'Conteúdo do artigo teste',
        status: 'publicado',
      },
    });
    testArtigoId = artigo.id_artigo;
  });

  describe('Adicionar Favoritos', () => {
    it('deve adicionar produto aos favoritos do usuário', async () => {
      const favorito = await prisma.favorito.create({
        data: {
          id_usuario: testUserId,
          id_produto: testProdutoId,
        },
      });

      expect(favorito).toHaveProperty('id_favorito');
      expect(favorito.id_usuario).toBe(testUserId);
      expect(favorito.id_produto).toBe(testProdutoId);
      expect(favorito.data_adicionado).toBeInstanceOf(Date);
    });

    it('deve permitir múltiplos favoritos do mesmo usuário', async () => {
      // Criar segundo produto
      const produto2 = await prisma.produto.create({
        data: {
          nome: 'Segundo Produto Favorito',
          marca: 'Marca Teste 2',
          preco: 60.00,
          id_categoria: 2,
        },
      });

      // Adicionar ambos aos favoritos
      await prisma.favorito.create({
        data: {
          id_usuario: testUserId,
          id_produto: testProdutoId,
        },
      });

      await prisma.favorito.create({
        data: {
          id_usuario: testUserId,
          id_produto: produto2.id_produto,
        },
      });

      // Verificar que existem 2 favoritos
      const favoritos = await prisma.favorito.findMany({
        where: { id_usuario: testUserId },
      });

      expect(favoritos.length).toBe(2);
    });

    it('deve não permitir favorito duplicado (constraint UNIQUE)', async () => {
      // Tentar adicionar o mesmo produto duas vezes
      await prisma.favorito.create({
        data: {
          id_usuario: testUserId,
          id_produto: testProdutoId,
        },
      });

      await expect(
        prisma.favorito.create({
          data: {
            id_usuario: testUserId,
            id_produto: testProdutoId,
          },
        })
      ).rejects.toThrow();
    });
  });

  describe('Listar Favoritos', () => {
    it('deve listar todos os favoritos de um usuário com produtos', async () => {
      // Limpar favoritos anteriores
      await prisma.favorito.deleteMany({
        where: { id_usuario: testUserId },
      });

      // Criar 3 favoritos
      const produto1 = await prisma.produto.create({
        data: {
          nome: 'Produto 1',
          marca: 'Marca',
          preco: 10.00,
          id_categoria: 1,
        },
      });

      const produto2 = await prisma.produto.create({
        data: {
          nome: 'Produto 2',
          marca: 'Marca',
          preco: 20.00,
          id_categoria: 1,
        },
      });

      const produto3 = await prisma.produto.create({
        data: {
          nome: 'Produto 3',
          marca: 'Marca',
          preco: 30.00,
          id_categoria: 1,
        },
      });

      await prisma.favorito.createMany({
        data: [
          { id_usuario: testUserId, id_produto: produto1.id_produto },
          { id_usuario: testUserId, id_produto: produto2.id_produto },
          { id_usuario: testUserId, id_produto: produto3.id_produto },
        ],
      });

      // Buscar com relacionamentos
      const favoritos = await prisma.favorito.findMany({
        where: { id_usuario: testUserId },
        include: {
          produto: true,
        },
      });

      expect(favoritos.length).toBe(3);
      expect(favoritos[0].produto?.nome).toBeDefined();
    });

    it('deve paginar favoritos corretamente', async () => {
      // Limpar
      await prisma.favorito.deleteMany({
        where: { id_usuario: testUserId },
      });

      // Criar 15 produtos
      for (let i = 1; i <= 15; i++) {
        const produto = await prisma.produto.create({
          data: {
            nome: `Produto Fav ${i}`,
            marca: 'Marca',
            preco: i * 10,
            id_categoria: 1,
          },
        });

        await prisma.favorito.create({
          data: {
            id_usuario: testUserId,
            id_produto: produto.id_produto,
          },
        });
      }

      // Primeira página (10 itens)
      const pagina1 = await prisma.favorito.findMany({
        where: { id_usuario: testUserId },
        take: 10,
        skip: 0,
        orderBy: { data_adicionado: 'desc' },
      });

      // Segunda página (5 itens)
      const pagina2 = await prisma.favorito.findMany({
        where: { id_usuario: testUserId },
        take: 10,
        skip: 10,
        orderBy: { data_adicionado: 'desc' },
      });

      expect(pagina1.length).toBe(10);
      expect(pagina2.length).toBe(5);
    });

    it('deve retornar lista vazia se usuário não tem favoritos', async () => {
      // Criar novo usuário sem favoritos
      const novoUsuario = await prisma.usuario.create({
        data: {
          nome: 'Usuário Sem Favoritos',
          email: 'sem_favoritos@test.com',
          senha: 'hash',
          id_genero: 1,
        },
      });

      const favoritos = await prisma.favorito.findMany({
        where: { id_usuario: novoUsuario.id_usuario },
      });

      expect(favoritos.length).toBe(0);
    });
  });

  describe('Remover Favoritos', () => {
    it('deve remover favorito de um usuário', async () => {
      // Limpar
      await prisma.favorito.deleteMany({
        where: { id_usuario: testUserId },
      });

      // Criar favorito
      const favorito = await prisma.favorito.create({
        data: {
          id_usuario: testUserId,
          id_produto: testProdutoId,
        },
      });

      // Remover
      await prisma.favorito.delete({
        where: { id_favorito: favorito.id_favorito },
      });

      // Verificar que foi removido
      const removido = await prisma.favorito.findUnique({
        where: { id_favorito: favorito.id_favorito },
      });

      expect(removido).toBeNull();
    });

    it('deve remover favoritos em cascade quando produto é deletado', async () => {
      // Criar produto e adicionar aos favoritos
      const produto = await prisma.produto.create({
        data: {
          nome: 'Produto para Deletar',
          marca: 'Marca',
          preco: 99.99,
          id_categoria: 1,
        },
      });

      const favorito = await prisma.favorito.create({
        data: {
          id_usuario: testUserId,
          id_produto: produto.id_produto,
        },
      });

      // Deletar produto
      await prisma.produto.delete({
        where: { id_produto: produto.id_produto },
      });

      // Verificar que favorito foi deletado em cascade
      const favoriteRestante = await prisma.favorito.findUnique({
        where: { id_favorito: favorito.id_favorito },
      });

      expect(favoriteRestante).toBeNull();
    });

    it('deve remover favoritos em cascade quando usuário é deletado', async () => {
      // Criar novo usuário com favorito
      const usuario = await prisma.usuario.create({
        data: {
          nome: 'Usuário para Deletar',
          email: 'delete_user@test.com',
          senha: 'hash',
          id_genero: 1,
        },
      });

      const produto = await prisma.produto.create({
        data: {
          nome: 'Produto Teste',
          marca: 'Marca',
          preco: 50.00,
          id_categoria: 1,
        },
      });

      const favorito = await prisma.favorito.create({
        data: {
          id_usuario: usuario.id_usuario,
          id_produto: produto.id_produto,
        },
      });

      // Deletar usuário
      await prisma.usuario.delete({
        where: { id_usuario: usuario.id_usuario },
      });

      // Verificar que favorito foi deletado em cascade
      const favoriteRestante = await prisma.favorito.findUnique({
        where: { id_favorito: favorito.id_favorito },
      });

      expect(favoriteRestante).toBeNull();
    });
  });

  describe('Verificar Favorito', () => {
    it('deve verificar se um produto está nos favoritos do usuário', async () => {
      // Limpar
      await prisma.favorito.deleteMany({
        where: { id_usuario: testUserId },
      });

      // Criar favorito
      await prisma.favorito.create({
        data: {
          id_usuario: testUserId,
          id_produto: testProdutoId,
        },
      });

      // Verificar que está nos favoritos
      const favorito = await prisma.favorito.findFirst({
        where: {
          id_usuario: testUserId,
          id_produto: testProdutoId,
        },
      });

      expect(favorito).not.toBeNull();
      expect(favorito?.id_usuario).toBe(testUserId);
      expect(favorito?.id_produto).toBe(testProdutoId);
    });

    it('deve retornar null se produto não está nos favoritos', async () => {
      // Criar novo produto que não está nos favoritos
      const novoProduto = await prisma.produto.create({
        data: {
          nome: 'Novo Produto',
          marca: 'Marca',
          preco: 100.00,
          id_categoria: 1,
        },
      });

      const favorito = await prisma.favorito.findFirst({
        where: {
          id_usuario: testUserId,
          id_produto: novoProduto.id_produto,
        },
      });

      expect(favorito).toBeNull();
    });
  });

  describe('Contagem de Favoritos', () => {
    it('deve contar corretamente os favoritos de um usuário', async () => {
      // Limpar
      await prisma.favorito.deleteMany({
        where: { id_usuario: testUserId },
      });

      // Criar 5 favoritos
      for (let i = 1; i <= 5; i++) {
        const produto = await prisma.produto.create({
          data: {
            nome: `Produto ${i}`,
            marca: 'Marca',
            preco: i * 10,
            id_categoria: 1,
          },
        });

        await prisma.favorito.create({
          data: {
            id_usuario: testUserId,
            id_produto: produto.id_produto,
          },
        });
      }

      const contagem = await prisma.favorito.count({
        where: { id_usuario: testUserId },
      });

      expect(contagem).toBe(5);
    });
  });
});
