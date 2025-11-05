import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3001',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    requestTimeout: 30000,  // Aumentado de 10s para 30s
    responseTimeout: 30000,  // Aumentado de 10s para 30s
    defaultCommandTimeout: 10000,  // Aumentado de 5s para 10s
    pageLoadTimeout: 60000,  // Timeout de carregamento de página
    video: false,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,  // Desabilita segurança do Chrome para testes
    experimentalModifyObstructiveThirdPartyCode: true,  // Ajuda com CSP
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
