/**
 * Configuração de suporte do Cypress para testes E2E
 */

import './commands';

// Captura erros não tratados
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignora certos tipos de erros esperados
  if (
    err.message.includes('ResizeObserver') ||
    err.message.includes('Script error') ||
    err.message.includes('Network error')
  ) {
    return false;
  }
  return true;
});

// Captura erros de console
Cypress.on('window:before:load', (win) => {
  cy.stub(win.console, 'error').as('consoleError');
});

// Configuração para Screenshots
beforeEach(() => {
  // Limpa cookies entre testes se necessário
  cy.clearCookies();
});

afterEach(() => {
  // Captura screenshot em caso de falha
  cy.visit('/').catch(() => {
    // ignora erros de navegação
  });
});
