// scripts/test-validations.ts
// Script para testar validações manualmente
import { ZodError } from 'zod';
import {
  cadastroEtapa1Schema,
  cadastroEtapa2Schema,
  loginSchema,
  criarProdutoSchema,
  criarAvaliacaoSchema,
} from '../src/lib/validations/index.js';

// Função auxiliar para imprimir resultados
function testar(nome: string, schema: any, dados: any) {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🧪 Testando: ${nome}`);
  console.log('📥 Dados de entrada:', JSON.stringify(dados, null, 2));

  try {
    const resultado = schema.parse(dados);
    console.log('✅ SUCESSO - Validação passou!');
    console.log('📤 Dados validados:', JSON.stringify(resultado, null, 2));
  } catch (erro) {
    if (erro instanceof ZodError) {
      console.log('❌ FALHOU - Erros de validação:');
      erro.errors.forEach((err, index) => {
        console.log(`   ${index + 1}. Campo: ${err.path.join('.')} - ${err.message}`);
      });
    } else {
      console.log('❌ ERRO INESPERADO:', erro);
    }
  }
}

console.log('\n🚀 TESTANDO VALIDAÇÕES ZOD\n');

// ============================================
// TESTES DE USUÁRIO - CADASTRO ETAPA 1
// ============================================

testar('Cadastro Etapa 1 - Dados válidos', cadastroEtapa1Schema, {
  nome: 'Maria Silva',
  email: 'maria@exemplo.com',
});

testar('Cadastro Etapa 1 - Nome muito curto', cadastroEtapa1Schema, {
  nome: 'M',
  email: 'maria@exemplo.com',
});

testar('Cadastro Etapa 1 - Nome com números', cadastroEtapa1Schema, {
  nome: 'Maria123',
  email: 'maria@exemplo.com',
});

testar('Cadastro Etapa 1 - Email inválido', cadastroEtapa1Schema, {
  nome: 'Maria Silva',
  email: 'emailinvalido',
});

// ============================================
// TESTES DE USUÁRIO - CADASTRO ETAPA 2
// ============================================

testar('Cadastro Etapa 2 - Senha forte válida', cadastroEtapa2Schema, {
  senha: 'SenhaForte123!',
  confirmaSenha: 'SenhaForte123!',
});

testar('Cadastro Etapa 2 - Senha muito curta', cadastroEtapa2Schema, {
  senha: 'Ab1!',
  confirmaSenha: 'Ab1!',
});

testar('Cadastro Etapa 2 - Senha sem maiúscula', cadastroEtapa2Schema, {
  senha: 'senhafraca123!',
  confirmaSenha: 'senhafraca123!',
});

testar('Cadastro Etapa 2 - Senha sem caractere especial', cadastroEtapa2Schema, {
  senha: 'SenhaForte123',
  confirmaSenha: 'SenhaForte123',
});

testar('Cadastro Etapa 2 - Senhas não conferem', cadastroEtapa2Schema, {
  senha: 'SenhaForte123!',
  confirmaSenha: 'SenhaDiferente123!',
});

// ============================================
// TESTES DE USUÁRIO - LOGIN
// ============================================

testar('Login - Dados válidos', loginSchema, {
  email: 'maria@exemplo.com',
  senha: 'qualquersenha',
});

testar('Login - Email inválido', loginSchema, {
  email: 'emailinvalido',
  senha: 'senha123',
});

testar('Login - Senha vazia', loginSchema, {
  email: 'maria@exemplo.com',
  senha: '',
});

// ============================================
// TESTES DE PRODUTO
// ============================================

testar('Criar Produto - Dados válidos', criarProdutoSchema, {
  nome: 'Shampoo Hidratante',
  marca: 'Dove',
  preco: 25.90,
  id_categoria: 1,
  descricao: 'Shampoo para cabelos secos',
});

testar('Criar Produto - Preço negativo', criarProdutoSchema, {
  nome: 'Shampoo Hidratante',
  marca: 'Dove',
  preco: -10.00,
  id_categoria: 1,
});

testar('Criar Produto - Nome muito curto', criarProdutoSchema, {
  nome: 'A',
  marca: 'Dove',
  preco: 25.90,
  id_categoria: 1,
});

// ============================================
// TESTES DE AVALIAÇÃO
// ============================================

testar('Criar Avaliação - Dados válidos', criarAvaliacaoSchema, {
  nota: 5,
  comentario: 'Produto excelente!',
  id_usuario: 1,
  id_produto: 10,
});

testar('Criar Avaliação - Nota inválida (maior que 5)', criarAvaliacaoSchema, {
  nota: 6,
  comentario: 'Produto bom',
  id_usuario: 1,
  id_produto: 10,
});

testar('Criar Avaliação - Nota inválida (menor que 1)', criarAvaliacaoSchema, {
  nota: 0,
  comentario: 'Produto ruim',
  id_usuario: 1,
  id_produto: 10,
});

testar('Criar Avaliação - Sem comentário (opcional)', criarAvaliacaoSchema, {
  nota: 4,
  id_usuario: 1,
  id_produto: 10,
});

console.log(`\n${'='.repeat(50)}`);
console.log('✨ Testes concluídos!\n');
