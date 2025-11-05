/**
 * Comandos Customizados do Cypress
 * Estes comandos facilitam testes comuns como login e logout
 */

// Login command
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');

  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();

  // Aguarda redirecionamento
  cy.url().should('not.include', '/login');
});

// Logout command
Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="logout-button"], button:contains("Sair"), button:contains("Logout")')
    .first()
    .click();

  cy.url().should('include', '/login').or(cy.url().should('equal', 'http://localhost:3000/'));
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
