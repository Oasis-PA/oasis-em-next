// Importa funções do Jest explicitamente
import { jest } from '@jest/globals';

console.log('🧪 Iniciando suite de testes...');

// Mock de console.error para não poluir logs
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
  console.log('✅ Finalizando suite de testes...');
});

beforeEach(() => {
  // Limpa todos os mocks antes de cada teste
  jest.clearAllMocks();
});
