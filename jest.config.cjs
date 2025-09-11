/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest/presets/default-esm', // Suporte ESM + TypeScript
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],

  testMatch: ['**/__tests__/**/*.test.ts', '**/*.test.ts'],

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
    '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }],
  },

  resolver: undefined,
};
