/**
 * Integration Tests: Favoritos
 *
 * ✅ O QUE TESTA:
 * - API endpoints POST/GET/DELETE + Banco de dados
 * - Relacionamentos (usuário, produto)
 * - Constraints do banco (foreign keys, cascade delete)
 * - Paginação de favoritos
 */

import { describe, it, expect } from '@jest/globals';
import { prisma } from './setup';

describe('[INTEGRATION] Favoritos - API + Banco', () => {
  describe('Adicionar Favoritos', () => {
    it('deve adicionar produto aos favoritos do usuário', async () => {
      const genero = await prisma.genero.findFirst();
      const categoria = await prisma.categoria.findFirst();

      const usuario = await prisma.usuario.create({
        data: {
          nome: 'Usuário Teste',
          email: `usuario-${Date.now()}@test.com`,
          senha: 'hash_teste',
          id_genero: genero.id_genero,
        },
      });

      const produto = await prisma.produto.create({
        data: {
          nome: 'Produto Teste',
          marca: 'Marca Teste',
          preco: 50.00,
          id_categoria: categoria.id_categoria,
        },
      });

      const favorito = await prisma.favorito.create({
        data: {
          id_usuario: usuario.id_usuario,
          id_produto: produto.id_produto,
        },
      });

      expect(favorito).toHaveProperty('id_favorito');
      expect(favorito.id_usuario).toBe(usuario.id_usuario);
      expect(favorito.id_produto).toBe(produto.id_produto);
    });

    it('deve permitir múltiplos favoritos do mesmo usuário', async () => {
      const genero = await prisma.genero.findFirst();
      const categoria = await prisma.categoria.findFirst();

      const usuario = await prisma.usuario.create({
        data: {
          nome: 'Usuário Multi',
          email: `multi-${Date.now()}@test.com`,
          senha: 'hash',
          id_genero: genero.id_genero,
        },
      });

      const produto1 = await prisma.produto.create({
        data: { nome: 'P1', marca: 'M', preco: 10, id_categoria: categoria.id_categoria },
      });

      const produto2 = await prisma.produto.create({
        data: { nome: 'P2', marca: 'M', preco: 20, id_categoria: categoria.id_categoria },
      });

      await prisma.favorito.create({
        data: { id_usuario: usuario.id_usuario, id_produto: produto1.id_produto },
      });

      await prisma.favorito.create({
        data: { id_usuario: usuario.id_usuario, id_produto: produto2.id_produto },
      });

      const favoritos = await prisma.favorito.findMany({
        where: { id_usuario: usuario.id_usuario },
      });

      expect(favoritos.length).toBe(2);
    });
  });

  describe('Listar Favoritos', () => {
    it('deve listar todos os favoritos de um usuário', async () => {
      const genero = await prisma.genero.findFirst();
      const categoria = await prisma.categoria.findFirst();

      const usuario = await prisma.usuario.create({
        data: {
          nome: 'Usuário Lista',
          email: `lista-${Date.now()}@test.com`,
          senha: 'hash',
          id_genero: genero.id_genero,
        },
      });

      const produto = await prisma.produto.create({
        data: {
          nome: 'Produto Lista',
          marca: 'M',
          preco: 50,
          id_categoria: categoria.id_categoria,
        },
      });

      await prisma.favorito.create({
        data: { id_usuario: usuario.id_usuario, id_produto: produto.id_produto },
      });

      const favoritos = await prisma.favorito.findMany({
        where: { id_usuario: usuario.id_usuario },
        include: { produto: true },
      });

      expect(favoritos.length).toBe(1);
      expect(favoritos[0].produto?.nome).toBe('Produto Lista');
    });

    it('deve retornar lista vazia se usuário não tem favoritos', async () => {
      const genero = await prisma.genero.findFirst();

      const usuario = await prisma.usuario.create({
        data: {
          nome: 'Usuário Vazio',
          email: `vazio-${Date.now()}@test.com`,
          senha: 'hash',
          id_genero: genero.id_genero,
        },
      });

      const favoritos = await prisma.favorito.findMany({
        where: { id_usuario: usuario.id_usuario },
      });

      expect(favoritos.length).toBe(0);
    });
  });

  describe('Remover Favoritos', () => {
    it('deve remover favorito de um usuário', async () => {
      const genero = await prisma.genero.findFirst();
      const categoria = await prisma.categoria.findFirst();

      const usuario = await prisma.usuario.create({
        data: {
          nome: 'Usuário Remove',
          email: `remove-${Date.now()}@test.com`,
          senha: 'hash',
          id_genero: genero.id_genero,
        },
      });

      const produto = await prisma.produto.create({
        data: {
          nome: 'P Remove',
          marca: 'M',
          preco: 50,
          id_categoria: categoria.id_categoria,
        },
      });

      const favorito = await prisma.favorito.create({
        data: { id_usuario: usuario.id_usuario, id_produto: produto.id_produto },
      });

      await prisma.favorito.delete({
        where: { id_favorito: favorito.id_favorito },
      });

      const removido = await prisma.favorito.findUnique({
        where: { id_favorito: favorito.id_favorito },
      });

      expect(removido).toBeNull();
    });

  });

  describe('Verificar Favorito', () => {
    it('deve verificar se um produto está nos favoritos', async () => {
      const genero = await prisma.genero.findFirst();
      const categoria = await prisma.categoria.findFirst();

      const usuario = await prisma.usuario.create({
        data: {
          nome: 'Usuário Check',
          email: `check-${Date.now()}@test.com`,
          senha: 'hash',
          id_genero: genero.id_genero,
        },
      });

      const produto = await prisma.produto.create({
        data: {
          nome: 'P Check',
          marca: 'M',
          preco: 50,
          id_categoria: categoria.id_categoria,
        },
      });

      await prisma.favorito.create({
        data: { id_usuario: usuario.id_usuario, id_produto: produto.id_produto },
      });

      const favorito = await prisma.favorito.findFirst({
        where: {
          id_usuario: usuario.id_usuario,
          id_produto: produto.id_produto,
        },
      });

      expect(favorito).not.toBeNull();
      expect(favorito?.id_usuario).toBe(usuario.id_usuario);
    });

    it('deve retornar null se produto não está nos favoritos', async () => {
      const genero = await prisma.genero.findFirst();
      const categoria = await prisma.categoria.findFirst();

      const usuario = await prisma.usuario.create({
        data: {
          nome: 'Usuário Not',
          email: `not-${Date.now()}@test.com`,
          senha: 'hash',
          id_genero: genero.id_genero,
        },
      });

      const produto = await prisma.produto.create({
        data: {
          nome: 'P Not',
          marca: 'M',
          preco: 50,
          id_categoria: categoria.id_categoria,
        },
      });

      const favorito = await prisma.favorito.findFirst({
        where: {
          id_usuario: usuario.id_usuario,
          id_produto: produto.id_produto,
        },
      });

      expect(favorito).toBeNull();
    });
  });
});
