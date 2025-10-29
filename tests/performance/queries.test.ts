import { PrismaClient } from '@prisma/client';
import { jest } from '@jest/globals';

const prisma = new PrismaClient();

describe('Testes de Performance de Queries', () => {
  const TIMEOUT_THRESHOLD = 1000; // 1 segundo
  const SLOW_QUERY_THRESHOLD = 500; // 500ms

  beforeAll(async () => {
    // Conectar ao banco de dados
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Queries Simples', () => {
    it('deve buscar um usuário por ID em menos de 500ms', async () => {
      const startTime = performance.now();

      // Criar um usuário para testar
      const usuario = await prisma.usuario.create({
        data: {
          nome: 'Teste Performance',
          email: `perf-${Date.now()}@test.com`,
          senha: 'senha123',
          id_genero: 1,
        },
      });

      // Medir tempo da query
      const queryStartTime = performance.now();
      const resultado = await prisma.usuario.findUnique({
        where: { id_usuario: usuario.id_usuario },
      });
      const queryEndTime = performance.now();

      const queryTime = queryEndTime - queryStartTime;

      // Limpar dados
      await prisma.usuario.delete({
        where: { id_usuario: usuario.id_usuario },
      });

      expect(resultado).toBeDefined();
      expect(queryTime).toBeLessThan(SLOW_QUERY_THRESHOLD);
      console.log(`⚡ Query simples por ID: ${queryTime.toFixed(2)}ms`);
    });

    it('deve buscar um usuário por email (índice único) rapidamente', async () => {
      const email = `perf-email-${Date.now()}@test.com`;

      const usuario = await prisma.usuario.create({
        data: {
          nome: 'Teste Email',
          email,
          senha: 'senha123',
          id_genero: 1,
        },
      });

      const queryStartTime = performance.now();
      const resultado = await prisma.usuario.findUnique({
        where: { email },
      });
      const queryEndTime = performance.now();

      const queryTime = queryEndTime - queryStartTime;

      await prisma.usuario.delete({
        where: { id_usuario: usuario.id_usuario },
      });

      expect(resultado).toBeDefined();
      expect(queryTime).toBeLessThan(SLOW_QUERY_THRESHOLD);
      console.log(`⚡ Query por email (índice único): ${queryTime.toFixed(2)}ms`);
    });
  });

  describe('Queries Complexas com Joins', () => {
    it('deve buscar produtos com categoria e avaliações em menos de 1s', async () => {
      const queryStartTime = performance.now();

      const produtos = await prisma.produto.findMany({
        take: 10,
        include: {
          categoria: true,
          avaliacoes: {
            take: 5,
            include: {
              usuario: true,
            },
          },
          favoritos: true,
        },
      });

      const queryEndTime = performance.now();
      const queryTime = queryEndTime - queryStartTime;

      expect(queryTime).toBeLessThan(TIMEOUT_THRESHOLD);
      console.log(`⚡ Query com múltiplos joins: ${queryTime.toFixed(2)}ms (${produtos.length} produtos)`);
    });

    it('deve buscar artigos com tags e favoritos em menos de 1s', async () => {
      const queryStartTime = performance.now();

      const artigos = await prisma.artigo.findMany({
        take: 10,
        include: {
          ArtigoTag: {
            include: {
              Tag: true,
            },
          },
          FavoritoArtigo: {
            take: 5,
          },
        },
        orderBy: {
          criadoEm: 'desc',
        },
      });

      const queryEndTime = performance.now();
      const queryTime = queryEndTime - queryStartTime;

      expect(queryTime).toBeLessThan(TIMEOUT_THRESHOLD);
      console.log(`⚡ Query artigos com relações: ${queryTime.toFixed(2)}ms (${artigos.length} artigos)`);
    });
  });

  describe('Queries de Agregação', () => {
    it('deve contar total de usuários rapidamente', async () => {
      const queryStartTime = performance.now();

      const count = await prisma.usuario.count();

      const queryEndTime = performance.now();
      const queryTime = queryEndTime - queryStartTime;

      expect(queryTime).toBeLessThan(SLOW_QUERY_THRESHOLD);
      console.log(`⚡ Count de usuários: ${queryTime.toFixed(2)}ms (${count} usuários)`);
    });

    it('deve calcular média de notas de produtos em menos de 1s', async () => {
      const queryStartTime = performance.now();

      const avaliacoes = await prisma.avaliacao.groupBy({
        by: ['id_produto'],
        _avg: {
          nota: true,
        },
        _count: {
          nota: true,
        },
        take: 10,
      });

      const queryEndTime = performance.now();
      const queryTime = queryEndTime - queryStartTime;

      expect(queryTime).toBeLessThan(TIMEOUT_THRESHOLD);
      console.log(`⚡ Agregação de avaliações: ${queryTime.toFixed(2)}ms`);
    });
  });

  describe('Queries com Filtros Complexos', () => {
    it('deve filtrar produtos por múltiplos critérios em menos de 1s', async () => {
      const queryStartTime = performance.now();

      const produtos = await prisma.produto.findMany({
        where: {
          AND: [
            { preco: { gte: 0, lte: 1000 } },
            { id_categoria: { in: [1, 2, 3] } },
            {
              OR: [
                { nome: { contains: 'shampoo', mode: 'insensitive' } },
                { descricao: { contains: 'cabelo', mode: 'insensitive' } },
              ],
            },
          ],
        },
        include: {
          categoria: true,
        },
        take: 20,
      });

      const queryEndTime = performance.now();
      const queryTime = queryEndTime - queryStartTime;

      expect(queryTime).toBeLessThan(TIMEOUT_THRESHOLD);
      console.log(`⚡ Query com filtros complexos: ${queryTime.toFixed(2)}ms (${produtos.length} produtos)`);
    });
  });

  describe('Validação de Índices', () => {
    it('deve confirmar índice em Usuario.email', async () => {
      // Query usando índice único
      const queryStartTime = performance.now();

      await prisma.usuario.findUnique({
        where: { email: 'teste@teste.com' },
      });

      const queryEndTime = performance.now();
      const queryTime = queryEndTime - queryStartTime;

      // Queries com índice devem ser muito rápidas mesmo que o registro não exista
      expect(queryTime).toBeLessThan(100);
      console.log(`📊 Query com índice (email): ${queryTime.toFixed(2)}ms`);
    });

    it('deve confirmar índices em FavoritoArtigo', async () => {
      const queryStartTime = performance.now();

      await prisma.favoritoArtigo.findMany({
        where: {
          id_usuario: 1,
        },
        take: 10,
      });

      const queryEndTime = performance.now();
      const queryTime = queryEndTime - queryStartTime;

      // idx_favorito_artigo_usuario deve tornar essa query rápida
      expect(queryTime).toBeLessThan(SLOW_QUERY_THRESHOLD);
      console.log(`📊 Query com índice (id_usuario): ${queryTime.toFixed(2)}ms`);
    });

    it('deve confirmar índice em influenciadores.email', async () => {
      const queryStartTime = performance.now();

      await prisma.influenciadores.findUnique({
        where: { email: 'teste@influencer.com' },
      });

      const queryEndTime = performance.now();
      const queryTime = queryEndTime - queryStartTime;

      expect(queryTime).toBeLessThan(100);
      console.log(`📊 Query com índice (influenciadores.email): ${queryTime.toFixed(2)}ms`);
    });
  });

  describe('Stress Test - Queries em Lote', () => {
    it('deve executar 10 queries paralelas em menos de 2s', async () => {
      const queryStartTime = performance.now();

      const promises = Array.from({ length: 10 }, (_, i) =>
        prisma.produto.findMany({
          take: 5,
          skip: i * 5,
          include: {
            categoria: true,
          },
        })
      );

      const resultados = await Promise.all(promises);

      const queryEndTime = performance.now();
      const queryTime = queryEndTime - queryStartTime;

      expect(resultados).toHaveLength(10);
      expect(queryTime).toBeLessThan(2000);
      console.log(`⚡ 10 queries paralelas: ${queryTime.toFixed(2)}ms`);
    });

    it('deve executar 50 queries sequenciais de contagem', async () => {
      const queryStartTime = performance.now();

      for (let i = 0; i < 50; i++) {
        await prisma.usuario.count();
      }

      const queryEndTime = performance.now();
      const queryTime = queryEndTime - queryStartTime;
      const avgTime = queryTime / 50;

      expect(avgTime).toBeLessThan(100);
      console.log(`⚡ 50 counts sequenciais: ${queryTime.toFixed(2)}ms total, ${avgTime.toFixed(2)}ms média`);
    });
  });
});
