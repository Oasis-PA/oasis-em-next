// tests/integration/produtos.integration.test.ts
import { describe, it, expect } from '@jest/globals';
import { prisma } from './setup';

describe('Testes de Integração - Produtos', () => {

  describe('Criação de Produto', () => {
    it('deve criar um produto com sucesso no banco de dados', async () => {
      const produto = await prisma.produto.create({
        data: {
          nome: 'Condicionador Nutritivo',
          marca: 'Dove',
          preco: 25.90,
          id_categoria: 1,
          descricao: 'Condicionador para cabelos secos',
        },
      });

      expect(produto).toHaveProperty('id_produto');
      expect(produto.nome).toBe('Condicionador Nutritivo');
      expect(produto.marca).toBe('Dove');
      expect(produto.preco).toBe(25.90);
      expect(produto.id_categoria).toBe(1);
      expect(produto.data_cadastro).toBeInstanceOf(Date);
    });

    it('deve criar produto com relacionamentos (categoria, tag, tipo de cabelo)', async () => {
      const produto = await prisma.produto.create({
        data: {
          nome: 'Shampoo Hidratante',
          marca: 'Natura',
          preco: 35.50,
          id_categoria: 1,
          id_tag: 1, // Hidratação
          id_tipo_cabelo: 3, // Cacheado
        },
      });

      // Buscar com relacionamentos
      const produtoComRelacionamentos = await prisma.produto.findUnique({
        where: { id_produto: produto.id_produto },
        include: {
          categoria: true,
          tag: true,
          tipo_cabelo: true,
        },
      });

      expect(produtoComRelacionamentos?.categoria?.nome).toBe('Shampoo');
      expect(produtoComRelacionamentos?.tag?.nome).toBe('Hidratação');
      expect(produtoComRelacionamentos?.tipo_cabelo?.nome).toBe('Cacheado');
    });

    it('deve criar produto com múltiplas imagens', async () => {
      const produto = await prisma.produto.create({
        data: {
          nome: 'Máscara Capilar',
          marca: 'Lola Cosmetics',
          preco: 45.00,
          id_categoria: 3,
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

    it('deve rejeitar criação de produto sem categoria (constraint NOT NULL)', async () => {
      await expect(
        prisma.produto.create({
          data: {
            nome: 'Produto Sem Categoria',
            marca: 'Marca Teste',
            preco: 20.00,
            // id_categoria ausente (obrigatório)
          } as any,
        })
      ).rejects.toThrow();
    });
  });

  describe('Leitura de Produtos', () => {
    it('deve listar produtos com paginação', async () => {
      // Criar 15 produtos
      for (let i = 1; i <= 15; i++) {
        await prisma.produto.create({
          data: {
            nome: `Produto ${i}`,
            marca: `Marca ${i}`,
            preco: i * 10,
            id_categoria: 1,
          },
        });
      }

      // Buscar primeira página (12 produtos)
      const primeiraPagina = await prisma.produto.findMany({
        take: 12,
        skip: 0,
        orderBy: { data_cadastro: 'desc' },
      });

      // Buscar segunda página (3 produtos restantes)
      const segundaPagina = await prisma.produto.findMany({
        take: 12,
        skip: 12,
        orderBy: { data_cadastro: 'desc' },
      });

      expect(primeiraPagina.length).toBe(12);
      expect(segundaPagina.length).toBe(3);
    });

    it('deve filtrar produtos por categoria', async () => {
      // Criar produtos de diferentes categorias
      await prisma.produto.create({
        data: {
          nome: 'Shampoo Teste',
          marca: 'Marca A',
          preco: 20.00,
          id_categoria: 1, // Shampoo
        },
      });

      await prisma.produto.create({
        data: {
          nome: 'Condicionador Teste',
          marca: 'Marca B',
          preco: 25.00,
          id_categoria: 2, // Condicionador
        },
      });

      // Filtrar por categoria
      const shampoos = await prisma.produto.findMany({
        where: { id_categoria: 1 },
      });

      const condicionadores = await prisma.produto.findMany({
        where: { id_categoria: 2 },
      });

      expect(shampoos.length).toBe(1);
      expect(shampoos[0].nome).toBe('Shampoo Teste');
      expect(condicionadores.length).toBe(1);
      expect(condicionadores[0].nome).toBe('Condicionador Teste');
    });

    it('deve filtrar produtos por múltiplos critérios', async () => {
      // Criar produtos
      await prisma.produto.create({
        data: {
          nome: 'Shampoo Hidratante para Cacheados',
          marca: 'Dove',
          preco: 30.00,
          id_categoria: 1,
          id_tipo_cabelo: 3, // Cacheado
          id_tag: 1, // Hidratação
        },
      });

      await prisma.produto.create({
        data: {
          nome: 'Shampoo Nutritivo para Lisos',
          marca: 'Pantene',
          preco: 35.00,
          id_categoria: 1,
          id_tipo_cabelo: 1, // Liso
          id_tag: 2, // Nutrição
        },
      });

      // Filtrar por categoria + tipo de cabelo + tag
      const produtosFiltrados = await prisma.produto.findMany({
        where: {
          id_categoria: 1,
          id_tipo_cabelo: 3,
          id_tag: 1,
        },
      });

      expect(produtosFiltrados.length).toBe(1);
      expect(produtosFiltrados[0].nome).toBe('Shampoo Hidratante para Cacheados');
    });

    it('deve buscar produtos por marca (case insensitive)', async () => {
      await prisma.produto.create({
        data: {
          nome: 'Produto Dove',
          marca: 'Dove',
          preco: 25.00,
          id_categoria: 1,
        },
      });

      // Buscar ignorando maiúsculas/minúsculas
      const produtos = await prisma.produto.findMany({
        where: {
          marca: {
            equals: 'dove',
            mode: 'insensitive',
          },
        },
      });

      expect(produtos.length).toBe(1);
      expect(produtos[0].marca).toBe('Dove');
    });
  });

  describe('Atualização de Produto', () => {
    it('deve atualizar dados do produto', async () => {
      const produto = await prisma.produto.create({
        data: {
          nome: 'Produto Original',
          marca: 'Marca Original',
          preco: 20.00,
          id_categoria: 1,
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
      expect(produtoAtualizado.marca).toBe('Marca Original'); // Não alterado
    });

    it('deve atualizar apenas preço (atualização parcial)', async () => {
      const produto = await prisma.produto.create({
        data: {
          nome: 'Produto Teste',
          marca: 'Marca Teste',
          preco: 30.00,
          id_categoria: 1,
        },
      });

      const produtoAtualizado = await prisma.produto.update({
        where: { id_produto: produto.id_produto },
        data: { preco: 35.00 },
      });

      expect(produtoAtualizado.preco).toBe(35.00);
      expect(produtoAtualizado.nome).toBe('Produto Teste');
    });
  });

  describe('Deleção de Produto', () => {
    it('deve deletar produto do banco de dados', async () => {
      const produto = await prisma.produto.create({
        data: {
          nome: 'Produto para Deletar',
          marca: 'Marca Teste',
          preco: 20.00,
          id_categoria: 1,
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
      const produto = await prisma.produto.create({
        data: {
          nome: 'Produto com Imagens',
          marca: 'Marca Teste',
          preco: 30.00,
          id_categoria: 1,
          ImagemProduto: {
            create: [
              { url_imagem: 'https://exemplo.com/img1.jpg', ordem: 1 },
              { url_imagem: 'https://exemplo.com/img2.jpg', ordem: 2 },
            ],
          },
        },
      });

      // Deletar produto
      await prisma.produto.delete({
        where: { id_produto: produto.id_produto },
      });

      // Verificar que imagens foram deletadas em cascade
      const imagens = await prisma.imagemProduto.findMany({
        where: { id_produto: produto.id_produto },
      });

      expect(imagens.length).toBe(0);
    });

    it('deve deletar produto e seus favoritos em cascade', async () => {
      // Criar usuário
      const usuario = await prisma.usuario.create({
        data: {
          nome: 'João',
          email: 'joao@teste.com',
          senha: 'hash',
          id_genero: 1,
        },
      });

      // Criar produto
      const produto = await prisma.produto.create({
        data: {
          nome: 'Produto Favorito',
          marca: 'Marca Teste',
          preco: 25.00,
          id_categoria: 1,
        },
      });

      // Adicionar aos favoritos
      await prisma.favorito.create({
        data: {
          id_usuario: usuario.id_usuario,
          id_produto: produto.id_produto,
        },
      });

      // Deletar produto
      await prisma.produto.delete({
        where: { id_produto: produto.id_produto },
      });

      // Verificar que favoritos foram deletados em cascade
      const favoritos = await prisma.favorito.findMany({
        where: { id_produto: produto.id_produto },
      });

      expect(favoritos.length).toBe(0);
    });
  });

  describe('Relacionamentos de Produto', () => {
    it('deve criar produto com avaliações', async () => {
      // Criar usuário
      const usuario = await prisma.usuario.create({
        data: {
          nome: 'João',
          email: 'joao@teste.com',
          senha: 'hash',
          id_genero: 1,
        },
      });

      // Criar produto com avaliação
      const produto = await prisma.produto.create({
        data: {
          nome: 'Produto Avaliado',
          marca: 'Marca Teste',
          preco: 40.00,
          id_categoria: 1,
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
      expect(produto.avaliacoes[0].comentario).toBe('Produto excelente!');
    });

    it('deve calcular média de avaliações do produto', async () => {
      // Criar usuários
      const usuario1 = await prisma.usuario.create({
        data: { nome: 'João', email: 'joao@teste.com', senha: 'hash', id_genero: 1 },
      });

      const usuario2 = await prisma.usuario.create({
        data: { nome: 'Maria', email: 'maria@teste.com', senha: 'hash', id_genero: 2 },
      });

      // Criar produto
      const produto = await prisma.produto.create({
        data: {
          nome: 'Produto com Múltiplas Avaliações',
          marca: 'Marca Teste',
          preco: 35.00,
          id_categoria: 1,
        },
      });

      // Criar avaliações
      await prisma.avaliacao.createMany({
        data: [
          { id_produto: produto.id_produto, id_usuario: usuario1.id_usuario, nota: 5, comentario: 'Ótimo!' },
          { id_produto: produto.id_produto, id_usuario: usuario2.id_usuario, nota: 4, comentario: 'Muito bom!' },
        ],
      });

      // Calcular média
      const avaliacoes = await prisma.avaliacao.findMany({
        where: { id_produto: produto.id_produto },
      });

      const media = avaliacoes.reduce((acc, av) => acc + av.nota, 0) / avaliacoes.length;

      expect(media).toBe(4.5);
      expect(avaliacoes.length).toBe(2);
    });
  });
});
