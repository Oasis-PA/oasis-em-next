/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  setupFilesAfterEnv: ['<rootDir>/tests/integration/setup.ts'],

  // Apenas testes de integração
  testMatch: ['**/tests/integration/**/*.test.ts'],

  // Não ignorar testes de integração
  testPathIgnorePatterns: ['/node_modules/'],

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!lib/**/*.d.ts',
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
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

  clearMocks: true,
  resetMocks: true,
  resolver: undefined,

  // Configurações de performance para testes de integração
  maxWorkers: 1, // Testes de integração rodam sequencialmente
  workerIdleMemoryLimit: '512MB',
  testTimeout: 30000, // 30 segundos de timeout para testes de integração
};
