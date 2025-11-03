// src/lib/cache.ts
/**
 * Cache simples em memória para dados estáticos
 * Use apenas para dados que mudam raramente (categorias, tags, tipos, etc.)
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class SimpleCache {
  private cache: Map<string, CacheEntry<any>>;
  private defaultTTL: number;

  constructor(defaultTTLMinutes: number = 30) {
    this.cache = new Map();
    this.defaultTTL = defaultTTLMinutes * 60 * 1000; // converter para ms
  }

  /**
   * Obtém um valor do cache ou executa a função e armazena o resultado
   */
  async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttlMinutes?: number
  ): Promise<T> {
    const cached = this.cache.get(key);
    const ttl = ttlMinutes ? ttlMinutes * 60 * 1000 : this.defaultTTL;

    // Se existe no cache e não expirou
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.data as T;
    }

    // Busca dados frescos
    const data = await fetcher();

    // Armazena no cache
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });

    return data;
  }

  /**
   * Invalida um item específico do cache
   */
  invalidate(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Invalida múltiplos itens do cache por padrão de chave
   */
  invalidatePattern(pattern: string): void {
    const regex = new RegExp(pattern);
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Limpa todo o cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Remove entradas expiradas do cache
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.defaultTTL) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Retorna estatísticas do cache
   */
  stats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Instância singleton do cache
export const cache = new SimpleCache(30); // 30 minutos de TTL padrão

// Cleanup periódico (a cada 10 minutos)
if (typeof window === 'undefined') {
  // Apenas no servidor
  setInterval(() => {
    cache.cleanup();
  }, 10 * 60 * 1000);
}

// Helper para cache de queries do Prisma
export async function cachedQuery<T>(
  cacheKey: string,
  query: () => Promise<T>,
  ttlMinutes: number = 30
): Promise<T> {
  return cache.getOrSet(cacheKey, query, ttlMinutes);
}
