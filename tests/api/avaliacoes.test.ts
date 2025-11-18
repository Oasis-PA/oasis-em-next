// tests/api/avaliacoes.test.ts
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { prisma } from '@/lib/prisma';

describe('API de Avaliações', () => {
  let testUserId: number;
  let testProdutoId: number;
  let testAvaliacaoId: number;

  beforeAll(async () => {
    // Criar usuário de teste
    const genero = await prisma.genero.findFirst();
    const usuario = await prisma.usuario.create({
      data: {
        nome: 'Test User Avaliacao',
        email: `test-avaliacao-${Date.now()}@test.com`,
        senha: 'hashedpassword',
        id_genero: genero!.id_genero,
      },
    });
    testUserId = usuario.id_usuario;

    // Criar produto de teste
    const categoria = await prisma.categoria.findFirst();
    const produto = await prisma.produto.create({
      data: {
        nome: 'Produto Teste Avaliacao',
        marca: 'Marca Teste',
        preco: 29.99,
        id_categoria: categoria!.id_categoria,
      },
    });
    testProdutoId = produto.id_produto;
  });

  afterAll(async () => {
    // Limpar dados de teste
    if (testAvaliacaoId) {
      await prisma.avaliacao.deleteMany({
        where: { id_avaliacao: testAvaliacaoId },
      });
    }
    await prisma.produto.delete({
      where: { id_produto: testProdutoId },
    });
    await prisma.usuario.delete({
      where: { id_usuario: testUserId },
    });
  });

  it('deve criar uma avaliação', async () => {
    const avaliacao = await prisma.avaliacao.create({
      data: {
        nota: 5,
        comentario: 'Produto excelente!',
        id_usuario: testUserId,
        id_produto: testProdutoId,
      },
    });

    testAvaliacaoId = avaliacao.id_avaliacao;

    expect(avaliacao).toBeDefined();
    expect(avaliacao.nota).toBe(5);
    expect(avaliacao.comentario).toBe('Produto excelente!');
  });

  it('deve listar avaliações de um produto', async () => {
    const avaliacoes = await prisma.avaliacao.findMany({
      where: { id_produto: testProdutoId },
      include: {
        usuario: {
          select: {
            nome: true,
          },
        },
      },
    });

    expect(avaliacoes).toBeDefined();
    expect(avaliacoes.length).toBeGreaterThan(0);
    expect(avaliacoes[0].id_produto).toBe(testProdutoId);
  });

  it('deve atualizar uma avaliação', async () => {
    const avaliacaoAtualizada = await prisma.avaliacao.update({
      where: { id_avaliacao: testAvaliacaoId },
      data: {
        nota: 4,
        comentario: 'Produto muito bom!',
      },
    });

    expect(avaliacaoAtualizada.nota).toBe(4);
    expect(avaliacaoAtualizada.comentario).toBe('Produto muito bom!');
  });

  it('deve calcular média de avaliações', async () => {
    const stats = await prisma.avaliacao.aggregate({
      where: { id_produto: testProdutoId },
      _avg: {
        nota: true,
      },
      _count: true,
    });

    expect(stats._avg.nota).toBeDefined();
    expect(stats._count).toBeGreaterThan(0);
  });
});
