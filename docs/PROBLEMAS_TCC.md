# 📋 Problemas Identificados - OASIS-EM-NEXT

## Resumo Executivo
- **Total de Problemas:** 45+
- **Críticos:** 5
- **Altos:** 13
- **Médios:** 15
- **Baixos:** 12+

---

## 🔴 PROBLEMAS CRÍTICOS (5)

### 1. Segurança: Credenciais Expostas no Repositório
- **Descrição:** Senhas, chaves JWT e secrets estão no git
- **Impacto:** Qualquer pessoa com acesso ao repositório pode comprometer o sistema
- **Exemplos:**
  - Senha do banco: `capenga`
  - JWT Admin: `mH2opF6k2imA+O8VsZq8Zxk2uF7t+Q2sQ==`
  - Supabase Service Role Key (acesso total ao banco)

### 2. Database: Múltiplas Instâncias de PrismaClient
- **Localização:** 5+ arquivos criam `new PrismaClient()` em vez de usar singleton
- **Impacto:** Memory leak, connection pool exhaustion
- **Arquivos afetados:**
  - `src/app/api/favoritos/artigos/route.ts`
  - `src/app/api/favoritos/artigos/[id]/route.ts`
  - `src/app/api/parcerias/influenciadores/route.ts`

### 3. Autenticação: Falta de Autorização em Endpoints Admin
- **Localização:** `src/app/api/admin/artigos/route.ts` (método GET)
- **Problema:** GET de artigos não valida se usuário é admin
- **Consequência:** Qualquer pessoa pode acessar artigos rascunho/privados

### 4. Autenticação: Inconsistência de Tokens
- **Problemas:**
  - Tokens salvos com nome `auth-token` mas acessados como `token`
  - Diferentes rotas esperam `id`, `id_usuario` ou `userId`
  - Extração manual de cookie usando string split é frágil

### 5. Autenticação: JWT Secret Fallback Hardcoded
- **Código:** `process.env.JWT_SECRET || 'your-secret-key'`
- **Risco:** Se variável de ambiente falha, usa secret fraco conhecido
- **Localização:** `src/app/api/favoritos/artigos/route.ts`

---

## 🟠 PROBLEMAS ALTOS (13)

### 6. Validação: Race Condition em Favoritos
- **Localização:** `src/app/api/favoritos/artigos/route.ts`
- **Problema:** Check if exists → Create pode falhar se duplicado entre operações

### 7. Database: Manipulação Insegura de Connection String
- **Localização:** `src/lib/prisma.ts`
- **Problema:** Concatenação manual em vez de usar `new URL()`

### 8. Segurança: Ausência de CSRF Protection
- **Impacto:** Formulários vulneráveis a ataques CSRF
- **Solução necessária:** CSRF tokens ou validação SameSite

### 9. Validação: Email Regex Fraco
- **Pattern atual:** `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- **Problema:** Aceita emails inválidos como `a@b.c`

### 10. Armazenamento: Senhas Admin em Plaintext
- **Localização:** `src/app/api/admin/auth/route.ts`
- **Código:** `if (password === ADMIN_PASS)`
- **Deve ser:** Hashing com bcrypt

### 11. Rate Limiting: Apenas Em-Memória
- **Arquivo:** `src/lib/rate-limit.ts`
- **Problema:** Não persiste entre restarts, não funciona com múltiplos servidores
- **Solução:** Redis ou Upstash

### 12. Upload: Validação Insuficiente de Arquivos
- **Problemas:**
  - Valida apenas `file.type` (pode ser spoofado)
  - Sem validação de dimensões de imagem
  - TODO não implementado: validar magic numbers

### 13. Database: Desconexão Inconsistente do Prisma
- **Problema:** Alguns routes chamam `$disconnect()` no singleton
- **Consequência:** Danifica o pool de conexões

### 14. TypeScript: Uso Excessivo de `any`
- **Ocorrências:** 105+ instâncias
- **Impacto:** Perde type-safety do TypeScript
- **Exemplo:** `const where: any = {}`

### 15. Logging: Console.log em Produção
- **Ocorrências:** 176+ linhas
- **Problema:** Sem structured logging, difícil de monitorar

### 16. Paginação: Sem Validação de Limites
- **Código:** `const page = parseInt(searchParams.get('page') || '1')`
- **Risco:** Usuário pode solicitar `page=999999` ou `limit=1000000`

### 17. Banco: Tipos Incorretos de Dados
- **Problema:** Telefone armazenado como `Decimal` em vez de `String`
- **Modelos afetados:** `Empresas`, `influenciadores`

### 18. Schema: Inconsistência de Nomes de ID
- **Problema:** Alguns modelos usam `id`, outros `id_usuario`, `id_categoria`
- **Consequência:** Bugs, confusão no código

---

## 🟡 PROBLEMAS MÉDIOS (15)

### 19. Arquitetura: Sem Middleware Centralizado
- **Problema:** Cada rota verifica autenticação manualmente
- **Solução:** Usar Next.js middleware

### 20. Validação: Sem Middleware Centralizado de Validação
- **Problema:** Duplicação de código de validação

### 21. Tratamento de Erros: Sem Padrão Centralizado
- **Problema:** Formatos diferentes em cada endpoint

### 22. API: Sem Documentação (Swagger/OpenAPI)
- **Impacto:** Difícil integração com frontend

### 23. CSS: Overuse de `!important`
- **Ocorrências:** 10+ instâncias
- **Problema:** Indica problemas de especificidade CSS

### 24. API: Formato de Resposta Inconsistente
- **Variações:** `{success: true}`, `{message: ""}`, `{error: ""}`
- **Deve ser:** Padrão único

### 25. CORS: Placeholder em Produção
- **Código:** `process.env.ALLOWED_ORIGIN || 'https://yourdomain.com'`
- **Problema:** Ainda tem valor placeholder

### 26. Validação: Zod Schemas Não Usados
- **Problema:** Alguns routes definem schemas mas não validam com eles

### 27. Error Handlers: Vazamento de Stack Traces
- **Localização:** `src/app/api/favoritos/artigos/route.ts`
- **Problema:** Stack traces enviados ao cliente mesmo em desenvolvimento

### 28. Authentication: Configuração de Cookies Inconsistente
- **Problema:** Alguns com `sameSite: strict`, outros sem

### 29. JWT: Sem Token Revocation
- **Problema:** Tokens comprometidos não podem ser invalidados sem rotacionar secret

### 30. Input: Sem Sanitização Centralizada
- **Problema:** Validação distribuída e incompleta

### 31. Teste: Cobertura Mínima
- **Realidade:** 3 arquivos de teste para 46+ páginas e 30+ rotas
- **Necessário:** +40 testes

### 32. Rate Limiting: Endpoints Públicos Sem Proteção
- **Exemplo:** Email check permite enumeration de usuários

---

## 🟢 PROBLEMAS BAIXOS (12+)

### 33. TypeScript: Tipos Dinâmicos Não Tipados
- **Exemplo:** `const updateData: any = {}`

### 34. .gitignore: Arquivos Sensíveis Já Commitados
- **Necessário:** Limpar histórico git

### 35. TODO Comments: Código Incompleto
- **Exemplo:** "TODO: Validar dimensões mínimas/máximas usando sharp"

### 36. Comments: Correção Deixada no Código
- **Localização:** `src/app/api/usuarios/login/route.ts`
- **Mensagem:** "CORREÇÃO AQUI: Mudar o nome do cookie para 'auth-token'"

### 37-48. Outros Problemas Menores
- Empty catch blocks
- Zod schemas não implementados
- API response format inconsistency
- Missing proper types
- Et al.

---

## 📊 Distribuição por Arquivo

### Arquivos com Mais Problemas

| Arquivo | Problemas | Severidade |
|---------|-----------|-----------|
| `src/app/api/favoritos/artigos/route.ts` | 6 | Critical, High |
| `src/app/api/usuarios/update/route.ts` | 5 | Critical, High |
| `src/app/api/admin/artigos/route.ts` | 4 | Critical, High |
| `src/lib/prisma.ts` | 3 | Critical, High |
| `.env` / `.env.local` | 6+ | Critical |

---

## 🎯 Plano de Ação por Prioridade

### Fase 1: Segurança (IMEDIATO)
- [ ] Remover credenciais do git (rebase history)
- [ ] Rotacionar todas as chaves
- [ ] Adicionar `.env` a `.gitignore`
- [ ] Usar gerenciador de secrets (AWS Secrets Manager, Vault)

### Fase 2: Autenticação (ALTA)
- [ ] Centralizar token handling
- [ ] Padronizar payload de JWT
- [ ] Adicionar `protectAdminRoute` em todos endpoints admin
- [ ] Implementar token revocation

### Fase 3: Database (ALTA)
- [ ] Remover todos `new PrismaClient()`
- [ ] Importar singleton de `@/lib/prisma`
- [ ] Padronizar nomes de IDs no schema
- [ ] Corrigir tipos (Decimal → String para phone)

### Fase 4: Validação (MÉDIA)
- [ ] Criar middleware centralizado de validação
- [ ] Usar Zod schemas em todas rotas
- [ ] Validar paginação com limites
- [ ] Implementar sanitização

### Fase 5: Testes (MÉDIA)
- [ ] Adicionar 40+ testes unitários
- [ ] E2E tests para fluxos críticos
- [ ] Tests de autenticação/autorização

### Fase 6: Refatoração (BAIXA)
- [ ] Remover `any` types
- [ ] Centralizar tratamento de erros
- [ ] Documentação API (Swagger)
- [ ] Limpar console.logs

---

## 📈 Estatísticas

### Por Categoria

```
Segurança:          12 problemas
Autenticação:        8 problemas
Validação:           7 problemas
Database:            6 problemas
TypeScript:          5 problemas
Arquitetura:         4 problemas
Performance:         3 problemas
```

### Por Severidade

```
🔴 Críticos:  5  (11%)  → 1-2 dias
🟠 Altos:    13  (29%)  → 3-5 dias
🟡 Médios:   15  (33%)  → 5-7 dias
🟢 Baixos:   12  (27%)  → 2-3 dias
```

### Tempo Total Estimado

- **Segurança:** 2-3 dias
- **Autenticação:** 2-3 dias
- **Database:** 1-2 dias
- **Validação:** 2-3 dias
- **Testes:** 4-5 dias
- **Refatoração:** 3-4 dias

**Total:** ~2-3 semanas para resolver todos

---

## 💡 Recomendações para TCC

### Apresentar
1. Problemas de segurança (credenciais expostas)
2. Falhas de autenticação/autorização
3. Problemas arquiteturais (múltiplas instâncias)
4. Falta de validação centralizada
5. Teste insuficiente

### Mostrar Antes e Depois
- Exemplo: Token inconsistência
- Exemplo: PrismaClient duplicado
- Exemplo: Email validation fraco

### Propor Soluções
- Arquitetura com middleware
- Centralização de validação
- Padrão de resposta de API
- Sistema de logging estruturado

---

## ✅ Próximas Ações

1. Apresentar este documento no TCC
2. Priorizador os problemas críticos
3. Implementar correções em um branch `fix/issues`
4. Criar testes para cada correção
5. Documentar lições aprendidas

