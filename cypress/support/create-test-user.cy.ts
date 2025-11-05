/**
 * Task do Cypress para criar usuário de teste via API
 * Uso: cy.task('createTestUser')
 */

export const TEST_USER = {
  nome: 'Cypress Test User',
  email: 'cypress@test.com',
  senha: 'Senha123!@#',
};

Cypress.Commands.add('ensureTestUserExists', () => {
  // Tenta fazer login primeiro para ver se o usuário existe
  cy.request({
    method: 'POST',
    url: '/api/usuarios/login',
    body: {
      email: TEST_USER.email,
      senha: TEST_USER.senha,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 401) {
      // Usuário não existe, criar via interface
      // Nota: Este teste precisa ser executado manualmente uma vez
      // ou você pode criar o usuário diretamente no banco de dados
      cy.log('⚠️ Usuário de teste não existe. Execute o seed manual ou crie via interface.');
    } else if (response.status === 200) {
      cy.log('✅ Usuário de teste existe e está funcionando');
    } else {
      cy.log(`⚠️ Status inesperado ao verificar usuário: ${response.status}`);
    }
  });
});

// Adiciona o comando ao tipo do Cypress
declare global {
  namespace Cypress {
    interface Chainable {
      ensureTestUserExists(): Chainable<void>;
    }
  }
}

export {};
