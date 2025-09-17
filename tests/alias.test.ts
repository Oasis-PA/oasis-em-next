import { POST } from '@/app/api/usuarios/check-email/route';
import { jest } from '@jest/globals';

test('alias funciona', () => {
  expect(typeof POST).toBe('function');
});
