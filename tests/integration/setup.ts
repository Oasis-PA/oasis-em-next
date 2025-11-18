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
    // Desabilitar foreign key checks
    await prisma.$executeRawUnsafe('SET session_replication_role = replica;');

    // Limpar em ordem para respeitar foreign keys
    await prisma.favoritoArtigo.deleteMany();
    await prisma.favorito.deleteMany();
    await prisma.avaliacao.deleteMany();
    await prisma.passwordReset.deleteMany();
    await prisma.imagemProduto.deleteMany();
    await prisma.artigoTag.deleteMany();
    await prisma.artigo.deleteMany();
    await prisma.produto.deleteMany();
    await prisma.usuario.deleteMany();
    await prisma.empresas.deleteMany();

    // Reabilitar foreign key checks
    await prisma.$executeRawUnsafe('SET session_replication_role = DEFAULT;');
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
          { id_genero: 1, nome: 'Masculino', sigla: 'M' },
          { id_genero: 2, nome: 'Feminino', sigla: 'F' },
          { id_genero: 3, nome: 'Não-binário', sigla: 'NB' },
          { id_genero: 4, nome: 'Prefiro não informar', sigla: 'PNI' },
        ],
        skipDuplicates: true,
      });

      await prisma.tipoCabelo.createMany({
        data: [
          { id_tipo_cabelo: 1, nome: 'Liso' },
          { id_tipo_cabelo: 2, nome: 'Ondulado' },
          { id_tipo_cabelo: 3, nome: 'Cacheado' },
          { id_tipo_cabelo: 4, nome: 'Crespo' },
        ],
        skipDuplicates: true,
      });

      await prisma.tipoPele.createMany({
        data: [
          { id_tipo_pele: 1, nome: 'Normal' },
          { id_tipo_pele: 2, nome: 'Seca' },
          { id_tipo_pele: 3, nome: 'Oleosa' },
          { id_tipo_pele: 4, nome: 'Mista' },
        ],
        skipDuplicates: true,
      });

      await prisma.categoria.createMany({
        data: [
          { id_categoria: 1, nome: 'Shampoo' },
          { id_categoria: 2, nome: 'Condicionador' },
          { id_categoria: 3, nome: 'Máscara Capilar' },
          { id_categoria: 4, nome: 'Hidratante' },
          { id_categoria: 5, nome: 'Protetor Solar' },
        ],
        skipDuplicates: true,
      });

      await prisma.tag.createMany({
        data: [
          { id_tag: 1, nome: 'Hidratação' },
          { id_tag: 2, nome: 'Nutrição' },
          { id_tag: 3, nome: 'Reconstrução' },
          { id_tag: 4, nome: 'Vegano' },
          { id_tag: 5, nome: 'Orgânico' },
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
