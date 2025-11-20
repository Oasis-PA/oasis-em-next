/**
 * Comandos Customizados do Cypress
 * Estes comandos facilitam testes comuns como login e logout
 */

// Login command
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');

  cy.get('input#email', { timeout: 5000 }).type(email);
  cy.get('input[type="password"]').type(password);

  // Intercepta a requisição de login para verificar o resultado
  cy.intercept('POST', '/api/usuarios/login').as('loginRequest');

  cy.get('button[type="submit"]').click();

  // Aguarda a resposta da API com timeout maior
  cy.wait('@loginRequest', { timeout: 15000 }).then((interception) => {
    if (interception.response && interception.response.statusCode === 200) {
      // Login bem-sucedido - aguarda redirecionamento (mas sem quebrar se não redirecionar)
      cy.url({ timeout: 5000 }).should('not.include', '/login');
    } else {
      // Login falhou - loga o erro para debug
      const statusCode = interception.response?.statusCode;
      const body = interception.response?.body;
      cy.log('❌ Login falhou com status:', statusCode);
      throw new Error(`Login falhou: ${statusCode} - ${JSON.stringify(body)}`);
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
