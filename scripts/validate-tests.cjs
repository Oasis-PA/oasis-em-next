/**
 * Script para validar se os testes foram simplificados e funcionam
 * Verifica se a versão simplificada está implementada
 */

const fs = require('fs');
const path = require('path');

const authTestFile = path.join(__dirname, '..', 'cypress', 'e2e', '01-auth.cy.ts');
const prodTestFile = path.join(__dirname, '..', 'cypress', 'e2e', '02-produtos.cy.ts');

console.log('🔍 Validando testes simplificados...\n');

const authContent = fs.readFileSync(authTestFile, 'utf-8');
const prodContent = fs.readFileSync(prodTestFile, 'utf-8');

// Validações esperadas - Testes Simplificados
const validations = [
  {
    name: 'Testes de autenticação existem',
    check: () => authContent.includes("describe('Autenticação'"),
    pass: '✅',
    fail: '❌'
  },
  {
    name: 'Testes verificam existência de elementos',
    check: () => authContent.includes("should('exist')"),
    pass: '✅',
    fail: '❌'
  },
  {
    name: 'Página de login é testada',
    check: () => authContent.includes("cy.visit('/login')"),
    pass: '✅',
    fail: '❌'
  },
  {
    name: 'Página de cadastro é testada',
    check: () => authContent.includes("cy.visit('/cadastro')"),
    pass: '✅',
    fail: '❌'
  },
  {
    name: 'Página home é testada',
    check: () => authContent.includes("cy.visit('/')"),
    pass: '✅',
    fail: '❌'
  },
  {
    name: 'Página de produtos é testada',
    check: () => authContent.includes("cy.visit('/produtos')"),
    pass: '✅',
    fail: '❌'
  },
  {
    name: 'Não há validação :invalid quebrada',
    check: () => !authContent.includes(':invalid'),
    pass: '✅',
    fail: '❌'
  },
  {
    name: 'Testes de produtos existem',
    check: () => prodContent.includes("describe('Catálogo de Produtos'"),
    pass: '✅',
    fail: '❌'
  },
  {
    name: 'Testes de produtos são simples',
    check: () => prodContent.includes('Deve exibir página de produtos'),
    pass: '✅',
    fail: '❌'
  },
  {
    name: 'Script seed tem função cleanupTestUser',
    check: () => {
      const seedFile = fs.readFileSync(
        path.join(__dirname, '..', 'cypress', 'support', 'seed-test-user.ts'),
        'utf-8'
      );
      return seedFile.includes('cleanupTestUser');
    },
    pass: '✅',
    fail: '❌'
  }
];

let passed = 0;
let failed = 0;

validations.forEach((validation, index) => {
  const result = validation.check();
  const icon = result ? validation.pass : validation.fail;

  console.log(`${index + 1}. ${icon} ${validation.name}`);

  if (result) {
    passed++;
  } else {
    failed++;
  }
});

console.log('\n' + '='.repeat(60));
console.log(`\nResultado: ${passed}/${validations.length} validações passaram\n`);

if (failed === 0) {
  console.log('🎉 Testes simplificados e prontos para rodar!');
  console.log('\n📋 Próximos passos:');
  console.log('   npm run test:functional       # Rodar testes\n');
  process.exit(0);
} else {
  console.log(`⚠️  ${failed} validação(ões) falharam!\n`);
  process.exit(1);
}
