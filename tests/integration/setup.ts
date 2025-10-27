// tests/integration/setup.ts
import { PrismaClient } from '@prisma/client';

// Cliente Prisma para testes de integração (SEM mock)
export const prisma = new PrismaClient({
  log: ['error'], // Apenas erros para não poluir o console
});

/**
 * Limpa apenas as tabelas de dados de teste
 * Mantém dados básicos (gêneros, categorias, tags, etc.)
 */
export async function limparDadosDeTeste() {
  try {
    // Limpar em ordem para respeitar foreign keys
    await prisma.favoritoArtigo.deleteMany();
    await prisma.favorito.deleteMany();
    await prisma.avaliacao.deleteMany();
    await prisma.imagemProduto.deleteMany();
    await prisma.artigoTag.deleteMany();
    await prisma.artigo.deleteMany();
    await prisma.produto.deleteMany();
    await prisma.passwordReset.deleteMany();
    await prisma.usuario.deleteMany();
    await prisma.empresas.deleteMany();
  } catch (error) {
    console.warn('Aviso ao limpar dados de teste:', error);
  }
}

/**
 * Garante que dados básicos existam
 * Não cria se já existirem (usa skipDuplicates)
 */
export async function garantirDadosBasicos() {
  try {
    // Verificar se já existem dados básicos
    const generoCount = await prisma.genero.count();

    if (generoCount === 0) {
      // Criar apenas se não existirem
      await prisma.genero.createMany({
        data: [
          { id: 1, nome: 'Masculino' },
          { id: 2, nome: 'Feminino' },
          { id: 3, nome: 'Não-binário' },
          { id: 4, nome: 'Prefiro não informar' },
        ],
        skipDuplicates: true,
      });

      await prisma.tipoCabelo.createMany({
        data: [
          { id: 1, tipo: 'Liso' },
          { id: 2, tipo: 'Ondulado' },
          { id: 3, tipo: 'Cacheado' },
          { id: 4, tipo: 'Crespo' },
        ],
        skipDuplicates: true,
      });

      await prisma.tipoPele.createMany({
        data: [
          { id: 1, tipo: 'Normal' },
          { id: 2, tipo: 'Seca' },
          { id: 3, tipo: 'Oleosa' },
          { id: 4, tipo: 'Mista' },
        ],
        skipDuplicates: true,
      });

      await prisma.categoria.createMany({
        data: [
          { id: 1, nome: 'Shampoo' },
          { id: 2, nome: 'Condicionador' },
          { id: 3, nome: 'Máscara Capilar' },
          { id: 4, nome: 'Hidratante' },
          { id: 5, nome: 'Protetor Solar' },
        ],
        skipDuplicates: true,
      });

      await prisma.tag.createMany({
        data: [
          { id: 1, nome: 'Hidratação' },
          { id: 2, nome: 'Nutrição' },
          { id: 3, nome: 'Reconstrução' },
          { id: 4, nome: 'Vegano' },
          { id: 5, nome: 'Orgânico' },
        ],
        skipDuplicates: true,
      });
    }
  } catch (error) {
    console.warn('Aviso ao garantir dados básicos:', error);
  }
}

/**
 * Setup executado antes de TODOS os testes de integração
 */
export async function setupTestes() {
  console.log('🔧 Configurando testes de integração...');

  try {
    // Conectar ao banco de dados
    await prisma.$connect();
    console.log('✅ Conectado ao banco');

    // Garantir que dados básicos existam
    await garantirDadosBasicos();
    console.log('✅ Dados básicos OK');

    // Limpar dados de teste anteriores
    await limparDadosDeTeste();
    console.log('✅ Dados de teste limpos');
  } catch (error) {
    console.error('❌ Erro no setup:', error);
    // Não lançar erro - continuar com os testes
  }
}

/**
 * Teardown executado depois de TODOS os testes de integração
 */
export async function teardownTestes() {
  console.log('🧹 Finalizando testes...');

  try {
    // Limpar apenas dados de teste
    await limparDadosDeTeste();
    console.log('✅ Dados de teste limpos');

    // Desconectar do banco de dados
    await prisma.$disconnect();
    console.log('✅ Desconectado');
  } catch (error) {
    console.error('❌ Erro no teardown:', error);
    // Não lançar erro
  }
}

// Hooks do Jest
beforeAll(async () => {
  await setupTestes();
});

afterAll(async () => {
  await teardownTestes();
});

// Limpar dados entre cada teste
afterEach(async () => {
  try {
    // Limpar apenas dados de teste, mantendo dados básicos
    await limparDadosDeTeste();
  } catch (error) {
    // Ignorar erros de limpeza
  }
});
