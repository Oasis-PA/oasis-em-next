/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest/presets/default-esm', // Suporte ESM + TypeScript
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],

  testMatch: ['**/__tests__/**/*.test.ts', '**/*.test.ts'],

  // Excluir testes de integração por padrão (usar npm run test:integration para rodá-los)
  testPathIgnorePatterns: ['/node_modules/', '/tests/integration/'],

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!lib/**/*.d.ts',
  ],

  // ⚡ Alinhado ao seu tsconfig.json
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Porque baseUrl = "src" no tsconfig
  },

  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          allowSyntheticDefaultImports: true,
          esModuleInterop: true,
        },
      },
    ],
  },

  // Habilita o uso de manual mocks
  clearMocks: true,
  resetMocks: true,

  resolver: undefined,

  // Configurações de performance
  maxWorkers: 2, // Limita workers para evitar OOM
  workerIdleMemoryLimit: '512MB', // Limita memória dos workers
};
