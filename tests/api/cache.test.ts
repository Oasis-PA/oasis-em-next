// tests/api/cache.test.ts
import { describe, it, expect, beforeEach } from '@jest/globals';
import { cache, cachedQuery } from '@/lib/cache';

describe('Sistema de Cache', () => {
  beforeEach(() => {
    // Limpar cache antes de cada teste
    cache.clear();
  });

  it('deve armazenar e recuperar dados do cache', async () => {
    let callCount = 0;

    const fetcher = async () => {
      callCount++;
      return { data: 'test data' };
    };

    // Primeira chamada - deve executar o fetcher
    const result1 = await cachedQuery('test-key', fetcher, 1);
    expect(result1).toEqual({ data: 'test data' });
    expect(callCount).toBe(1);

    // Segunda chamada - deve vir do cache
    const result2 = await cachedQuery('test-key', fetcher, 1);
    expect(result2).toEqual({ data: 'test data' });
    expect(callCount).toBe(1); // Não incrementou!
  });

  it('deve expirar cache após TTL', async () => {
    let callCount = 0;

    const fetcher = async () => {
      callCount++;
      return { data: 'test data' };
    };

    // Usar TTL muito curto (0.001 minutos = 60ms)
    const result1 = await cachedQuery('test-key', fetcher, 0.001);
    expect(callCount).toBe(1);

    // Aguardar expiração
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Deve executar fetcher novamente
    const result2 = await cachedQuery('test-key', fetcher, 0.001);
    expect(callCount).toBe(2);
  });

  it('deve invalidar cache específico', async () => {
    let callCount = 0;

    const fetcher = async () => {
      callCount++;
      return { data: 'test data' };
    };

    await cachedQuery('test-key', fetcher, 1);
    expect(callCount).toBe(1);

    // Invalidar cache
    cache.invalidate('test-key');

    // Deve executar fetcher novamente
    await cachedQuery('test-key', fetcher, 1);
    expect(callCount).toBe(2);
  });

  it('deve invalidar por padrão', async () => {
    await cachedQuery('users:1', async () => ({ id: 1 }), 1);
    await cachedQuery('users:2', async () => ({ id: 2 }), 1);
    await cachedQuery('products:1', async () => ({ id: 1 }), 1);

    expect(cache.stats().size).toBe(3);

    // Invalidar todos os users
    cache.invalidatePattern('users:');

    expect(cache.stats().size).toBe(1);
    expect(cache.stats().keys).toContain('products:1');
  });

  it('deve retornar estatísticas corretas', async () => {
    await cachedQuery('key1', async () => 'data1', 1);
    await cachedQuery('key2', async () => 'data2', 1);

    const stats = cache.stats();
    expect(stats.size).toBe(2);
    expect(stats.keys).toContain('key1');
    expect(stats.keys).toContain('key2');
  });

  it('deve limpar todo o cache', async () => {
    await cachedQuery('key1', async () => 'data1', 1);
    await cachedQuery('key2', async () => 'data2', 1);

    expect(cache.stats().size).toBe(2);

    cache.clear();

    expect(cache.stats().size).toBe(0);
  });
});
