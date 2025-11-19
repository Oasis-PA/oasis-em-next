import { defineConfig } from 'cypress';

// Detectar a porta dinamicamente
function getBaseUrl(): string {
  // 1. Verificar variável de ambiente CYPRESS_BASE_URL (maior prioridade)
  if (process.env.CYPRESS_BASE_URL) {
    return process.env.CYPRESS_BASE_URL;
  }

  // 2. Verificar variável PORT (usada pelo Next.js dev server)
  if (process.env.PORT) {
    return `http://localhost:${process.env.PORT}`;
  }

  // 3. Verificar NODE_ENV para determinar porta padrão
  // Se for produção, usar 3000; se for teste, usar 3001
  const port = process.env.NODE_ENV === 'test' ? 3001 : 3000;
  return `http://localhost:${port}`;
}

export default defineConfig({
  e2e: {
    baseUrl: getBaseUrl(),
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
