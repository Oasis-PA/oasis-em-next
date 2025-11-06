/**
 * Comandos Customizados do Cypress
 * Estes comandos facilitam testes comuns como login e logout
 */

// Login command
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');

  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);

  // Intercepta a requisição de login para verificar o resultado
  cy.intercept('POST', '/api/usuarios/login').as('loginRequest');

  cy.get('button[type="submit"]').click();

  // Aguarda a resposta da API
  cy.wait('@loginRequest').then((interception) => {
    if (interception.response && interception.response.statusCode === 200) {
      // Login bem-sucedido - aguarda redirecionamento
      cy.url().should('not.include', '/login', { timeout: 10000 });
    } else {
      // Login falhou - loga o erro para debug
      cy.log('❌ Login falhou com status:', interception.response?.statusCode);
      throw new Error(`Login falhou: ${interception.response?.statusCode} - ${JSON.stringify(interception.response?.body)}`);
    }
  });
});

// Logout command
Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="logout-button"], button:contains("Sair"), button:contains("Logout")')
    .first()
    .click();

  // Verifica se redirecionou para login ou homepage
  cy.url().then(url => {
    expect(url === 'http://localhost:3000/' || url.includes('/login')).to.be.true;
  });
});

// Declarar tipos dos comandos customizados
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
}

export {};
