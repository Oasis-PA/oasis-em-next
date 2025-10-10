/**
 * Helper para fazer fetch com tratamento de erro JSON
 */
export async function safeFetch(url: string, options?: RequestInit) {
  const res = await fetch(url, options);

  // Verifica se a resposta é JSON
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const textResponse = await res.text();
    console.error("Resposta não é JSON:", textResponse);
    throw new Error("Erro no servidor. A resposta não é JSON.");
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || data.error || "Erro na requisição");
  }

  return data;
}

/**
 * Wrapper para chamadas de API com tratamento de erro
 */
export async function apiCall<T = any>(
  url: string,
  options?: RequestInit
): Promise<{ data?: T; error?: string }> {
  try {
    const data = await safeFetch(url, options);
    return { data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Erro desconhecido"
    };
  }
}
