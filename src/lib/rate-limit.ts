// src/lib/rate-limit.ts
/**
 * Rate Limiter simples baseado em memória
 * Para produção em escala, considere usar Upstash Rate Limit ou Redis
 */

type RateLimitStore = Map<string, { count: number; resetTime: number }>;

const stores = new Map<string, RateLimitStore>();

interface RateLimitOptions {
  /**
   * Identificador único do rate limiter (ex: 'login', 'cadastro')
   */
  id: string;
  /**
   * Número máximo de requisições permitidas
   */
  limit: number;
  /**
   * Janela de tempo em segundos
   */
  window: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
}

/**
 * Verifica se o identificador excedeu o limite de requisições
 *
 * @param identifier - IP ou identificador único (email, user ID, etc)
 * @param options - Configurações de rate limit
 * @returns Resultado indicando se a requisição foi aceita
 *
 * @example
 * ```typescript
 * const result = rateLimit(request.ip, {
 *   id: 'login',
 *   limit: 5,
 *   window: 900 // 15 minutos
 * });
 *
 * if (!result.success) {
 *   return NextResponse.json(
 *     { error: 'Muitas tentativas. Tente novamente em 15 minutos.' },
 *     { status: 429 }
 *   );
 * }
 * ```
 */
export function rateLimit(
  identifier: string,
  options: RateLimitOptions
): RateLimitResult {
  const { id, limit, window } = options;

  // Obtém ou cria store para este rate limiter
  if (!stores.has(id)) {
    stores.set(id, new Map());
  }
  const store = stores.get(id)!;

  const now = Date.now();
  const key = identifier;

  // Obtém dados do identificador
  const record = store.get(key);

  // Se não existe registro ou expirou, cria novo
  if (!record || now > record.resetTime) {
    const resetTime = now + window * 1000;
    store.set(key, { count: 1, resetTime });

    // Limpa registros expirados (garbage collection)
    cleanExpiredRecords(store, now);

    return {
      success: true,
      remaining: limit - 1,
      resetTime,
    };
  }

  // Se já atingiu o limite
  if (record.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  // Incrementa contador
  record.count++;
  store.set(key, record);

  return {
    success: true,
    remaining: limit - record.count,
    resetTime: record.resetTime,
  };
}

/**
 * Limpa registros expirados do store (garbage collection)
 */
function cleanExpiredRecords(store: RateLimitStore, now: number): void {
  for (const [key, record] of store.entries()) {
    if (now > record.resetTime) {
      store.delete(key);
    }
  }
}

/**
 * Reseta o rate limit para um identificador específico
 * Útil para testes ou casos especiais
 */
export function resetRateLimit(id: string, identifier: string): void {
  const store = stores.get(id);
  if (store) {
    store.delete(identifier);
  }
}

/**
 * Limpa completamente um store de rate limit
 * Útil para testes
 */
export function clearRateLimitStore(id: string): void {
  stores.delete(id);
}

/**
 * Obtém IP real do request (considerando proxies)
 */
export function getClientIp(request: Request): string {
  // Tenta obter IP de headers comuns de proxy
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Fallback para um identificador genérico
  // Em produção com Vercel, sempre terá x-forwarded-for
  return 'unknown';
}
