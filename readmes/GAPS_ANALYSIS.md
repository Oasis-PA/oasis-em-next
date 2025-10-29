# 🔍 Análise de Gaps - Sistema Oasis

Análise detalhada de funcionalidades faltantes, problemas identificados e inconsistências no projeto.

**Data da Análise:** 2025-10-29
**Versão do Projeto:** 0.9
**Analisado por:** Claude Code

---

## 📋 Índice

1. [Gaps de APIs](#-gaps-de-apis)
2. [Gaps de Segurança](#-gaps-de-segurança)
3. [Gaps de Validação](#-gaps-de-validação)
4. [Gaps de Frontend](#-gaps-de-frontend)
5. [Gaps de DevOps](#-gaps-de-devops)
6. [Gaps de Documentação](#-gaps-de-documentação)
7. [Gaps de Testes](#-gaps-de-testes)
8. [Gaps de Performance](#-gaps-de-performance)

---

## 🔌 Gaps de APIs

### 1. Sistema de Avaliações (Reviews)

**Modelo existe no Prisma, mas APIs não implementadas.**

#### Modelo Prisma:
```prisma
model Avaliacao {
  id_avaliacao   Int      @id @default(autoincrement())
  nota           Int
  comentario     String?
  data_avaliacao DateTime @default(now())
  id_usuario     Int
  id_produto     Int
  produto        Produto  @relation(fields: [id_produto], references: [id_produto])
  usuario        Usuario  @relation(fields: [id_usuario], references: [id_usuario])
}
```

#### Endpoints Faltando:
```
❌ POST   /api/produtos/[id]/avaliacoes      - Criar avaliação
❌ GET    /api/produtos/[id]/avaliacoes      - Listar avaliações de um produto
❌ GET    /api/usuarios/[id]/avaliacoes      - Listar avaliações de um usuário
❌ DELETE /api/avaliacoes/[id]               - Deletar avaliação
❌ PATCH  /api/avaliacoes/[id]               - Editar avaliação
❌ GET    /api/produtos/[id]/avaliacoes/media - Calcular média de avaliações
```

#### Impacto:
- **Alto** - Feature essencial para e-commerce
- Usuários não conseguem avaliar produtos
- Sem validação social dos produtos
- Modelo existe mas inutilizado

#### Solução Sugerida:
```typescript
// src/app/api/produtos/[id]/avaliacoes/route.ts
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { nota, comentario } = await req.json();
  const userId = await getUserIdFromToken(req);

  // Validar que usuário não avaliou antes
  const existente = await prisma.avaliacao.findFirst({
    where: { id_usuario: userId, id_produto: parseInt(params.id) }
  });

  if (existente) {
    return NextResponse.json(
      { error: 'Você já avaliou este produto' },
      { status: 400 }
    );
  }

  const avaliacao = await prisma.avaliacao.create({
    data: {
      nota,
      comentario,
      id_usuario: userId,
      id_produto: parseInt(params.id)
    }
  });

  return NextResponse.json(avaliacao);
}
```

---

### 2. Sistema de Múltiplas Imagens

**Modelo existe, mas sem CRUD individual.**

#### Modelo Prisma:
```prisma
model ImagemProduto {
  id_imagem_produto Int     @id @default(autoincrement())
  id_produto        Int
  url_imagem        String
  ordem             Int?
  Produto           Produto @relation(fields: [id_produto], references: [id_produto], onDelete: Cascade)
}
```

#### Endpoints Faltando:
```
❌ POST   /api/produtos/[id]/imagens         - Upload múltiplas imagens
❌ GET    /api/produtos/[id]/imagens         - Listar imagens do produto
❌ DELETE /api/imagens/[id]                  - Deletar imagem específica
❌ PATCH  /api/imagens/[id]/ordem            - Reordenar imagens
❌ PATCH  /api/produtos/[id]/imagem-principal - Definir imagem principal
```

#### Problema Atual:
```typescript
// src/app/api/produtos/cadastro/route.ts:46
url_imagem: validatedData.url_imagem || null,
// Apenas 1 URL de imagem é suportada
```

#### Impacto:
- **Médio** - Produtos limitados a 1 imagem
- UX prejudicada (sem galeria)
- Campo `ordem` no banco não é utilizado

---

### 3. PATCH Endpoints (Atualização Parcial)

**Apenas POST e DELETE implementados, sem atualização parcial.**

#### Endpoints Faltando:
```
❌ PATCH /api/produtos/[id]         - Atualizar produto
❌ PATCH /api/categorias/[id]       - Atualizar categoria
❌ PATCH /api/tags/[id]             - Atualizar tag
❌ PATCH /api/artigos/[id]          - Atualizar artigo (admin)
❌ PATCH /api/usuarios/[id]         - Atualizar usuário específico
```

#### Problema Atual:
```typescript
// src/app/api/usuarios/update/route.ts
// Usa PATCH mas exige todos os campos
const validatedData = updateUsuarioSchema.parse(body);
// Se faltar algum campo, dá erro
```

#### Impacto:
- **Médio** - Impossível atualizar apenas 1 campo
- Frontend precisa enviar todos os dados
- Risco de sobrescrever dados não intencionalmente

#### Solução Sugerida:
```typescript
// Schema parcial para PATCH
const updateProdutoPartialSchema = ProdutoSchema.partial();

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const validatedData = updateProdutoPartialSchema.parse(body);

  const produto = await prisma.produto.update({
    where: { id_produto: parseInt(params.id) },
    data: validatedData // Apenas campos enviados
  });

  return NextResponse.json(produto);
}
```

---

### 4. Endpoints Admin Incompletos

#### Faltando:
```
❌ GET    /api/admin/usuarios                - Listar usuários
❌ DELETE /api/admin/usuarios/[id]           - Deletar usuário
❌ PATCH  /api/admin/usuarios/[id]           - Atualizar usuário
❌ GET    /api/admin/produtos                - Listar produtos (admin)
❌ DELETE /api/admin/produtos/[id]           - Deletar produto
❌ GET    /api/admin/avaliacoes              - Moderar avaliações
❌ DELETE /api/admin/avaliacoes/[id]         - Deletar avaliação
❌ GET    /api/admin/stats                   - Dashboard stats
```

#### Impacto:
- **Médio** - Admin não consegue gerenciar totalmente o sistema
- Sem moderação de conteúdo
- Sem analytics/métricas

---

## 🔐 Gaps de Segurança

### 1. Admin Auth com Token Fraco

**Severidade: 🔴 CRÍTICA**

#### Código Problemático:
```typescript
// src/app/api/admin/auth/route.ts:14-15
const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');

// Exemplo de token gerado:
// "YWRtaW46MTczMDIxMjQ1NjAwMA==" (decodificável!)
```

#### Problema:
- Token é apenas Base64, **não criptografado**
- Qualquer um pode decodificar: `atob("YWRtaW46MTczMDIxMjQ1NjAwMA==")`
- Sem assinatura/validação
- Vulnerável a replay attacks

#### Solução:
```typescript
import jwt from 'jsonwebtoken';

const token = jwt.sign(
  { username, role: 'admin' },
  process.env.ADMIN_JWT_SECRET!,
  { expiresIn: '1h' }
);
```

---

### 2. Sem Rate Limiting

**Severidade: 🔴 CRÍTICA**

#### Endpoints Vulneráveis:
```
/api/usuarios/login          - Força bruta de senha
/api/usuarios/cadastro       - Spam de contas
/api/usuarios/check-email    - Enumeração de usuários
/api/usuarios/esqueceusenha  - Spam de emails
```

#### Ataque Possível:
```bash
# Força bruta sem rate limiting
for i in {1..10000}; do
  curl -X POST /api/usuarios/login \
    -d '{"email":"admin@site.com","senha":"tentativa'$i'"}'
done
```

#### Impacto:
- Ataques de força bruta ilimitados
- DDoS simples
- Enumeração de usuários
- Spam de emails de recuperação

#### Solução:
```typescript
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 req/15min
});

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: 'Muitas tentativas. Tente novamente em 15 minutos.' },
      { status: 429 }
    );
  }

  // ... resto do código
}
```

---

### 3. Credenciais Padrão Fracas

**Severidade: 🟡 ALTA**

#### Código Problemático:
```typescript
// src/app/api/admin/auth/route.ts:4-5
const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin123';
```

#### Problema:
- Se `.env` não configurado, usa 'admin/admin123'
- Credenciais fracas em fallback
- Facilita ataques em dev/staging

#### Solução:
```typescript
const ADMIN_USER = process.env.ADMIN_USERNAME;
const ADMIN_PASS = process.env.ADMIN_PASSWORD;

if (!ADMIN_USER || !ADMIN_PASS) {
  throw new Error('ADMIN_USERNAME e ADMIN_PASSWORD devem ser configurados no .env');
}
```

---

### 4. Supabase Service Role Key Exposta

**Severidade: 🟡 ALTA**

#### Problema:
```typescript
// src/app/api/usuarios/upload-foto/route.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ Chave privilegiada
);
```

#### Risco:
- Service Role key bypass RLS (Row Level Security)
- Se exposta, permite acesso total ao banco
- Não deve estar em rotas públicas

#### Solução:
```typescript
// Usar client-side com RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // ✅ Chave pública
);

// Service Role apenas em server actions
'use server';
const supabaseAdmin = createClient(...);
```

---

### 5. Sem Security Headers

**Severidade: 🟠 MÉDIA**

#### Headers Faltando:
```
❌ X-Frame-Options          - Proteção contra clickjacking
❌ Content-Security-Policy  - Proteção contra XSS
❌ X-Content-Type-Options   - Proteção contra MIME sniffing
❌ Referrer-Policy          - Controle de referrer
❌ Permissions-Policy       - Controle de features do browser
```

#### Solução:
```typescript
// next.config.ts
export default {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },
};
```

---

## ✅ Gaps de Validação

### 1. Validação de Preço

**Severidade: 🟠 MÉDIA**

#### Problema Atual:
```typescript
// src/lib/zod-schemas/produto.ts
preco: z.number()
// Aceita qualquer número (negativo, infinito, NaN)
```

#### Testes que Passariam:
```typescript
{ preco: -100 }      // ✅ Aceito (errado!)
{ preco: Infinity }  // ✅ Aceito (errado!)
{ preco: 0 }         // ✅ Aceito (pode ser válido ou não)
```

#### Solução:
```typescript
preco: z.number()
  .min(0.01, 'Preço deve ser maior que zero')
  .max(999999.99, 'Preço muito alto')
  .finite('Preço deve ser um número finito')
```

---

### 2. Validação de URL

**Severidade: 🟠 MÉDIA**

#### Problema Atual:
```typescript
url_imagem: z.string().optional()
// Aceita qualquer string como URL
```

#### Testes que Passariam:
```typescript
{ url_imagem: 'não é uma url' }     // ✅ Aceito (errado!)
{ url_imagem: 'javascript:alert()' } // ✅ Aceito (XSS!)
```

#### Solução:
```typescript
url_imagem: z.string()
  .url('URL inválida')
  .regex(/^https?:\/\//, 'URL deve começar com http:// ou https://')
  .optional()
```

---

### 3. Validação de Telefone

**Severidade: 🟡 BAIXA**

#### Problema Atual:
```typescript
telefone: z.string().optional()
// Aceita qualquer formato
```

#### Solução:
```typescript
telefone: z.string()
  .regex(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/, 'Telefone inválido. Use: (11) 91234-5678')
  .optional()
```

---

### 4. Validação de Tamanho de Upload

**Severidade: 🟠 MÉDIA**

#### Problema:
Sem limite de tamanho para uploads

#### Solução:
```typescript
// middleware.ts ou route
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

if (file.size > MAX_FILE_SIZE) {
  return NextResponse.json(
    { error: 'Arquivo muito grande. Máximo: 5MB' },
    { status: 413 }
  );
}
```

---

## 🎨 Gaps de Frontend

### 1. Componentes Reutilizáveis Limitados

**Problema:**
Apenas 8 componentes UI básicos:
```
ui/
├── avatar.tsx
├── button.tsx
└── separator.tsx
```

#### Faltando:
```
❌ Input component
❌ Select component
❌ Form components
❌ Modal/Dialog
❌ Toast/Notification
❌ Card component
❌ Table component
❌ Loading/Spinner
❌ Error boundary
```

---

### 2. Páginas de Desenvolvimento Não Removidas

**Problema:**
Páginas de teste ainda no código:

```
/pos-login-demo
/pre-pronto
/cadastrar-produto
/cadastrar-tag
/tela-produto
/pagina-em-manutencao
```

#### Impacto:
- Confusão em desenvolvimento
- Podem ser acessadas em produção
- Poluem a estrutura

---

### 3. Inconsistência de Layout

**Problema:**
Múltiplos layouts para perfil:
```
/perfil/layout.tsx
/gerenciamento/layout.tsx
/meuperfil-before/page.tsx
/meuperfil-after/page.tsx
```

#### Solução:
Consolidar em um único layout e componentes reutilizáveis.

---

## 🚀 Gaps de DevOps

### 1. Sem CI/CD

**Severidade: 🟠 MÉDIA**

#### Faltando:
```
❌ .github/workflows/test.yml
❌ .github/workflows/lint.yml
❌ .github/workflows/build.yml
❌ .github/workflows/deploy.yml
```

#### Impacto:
- Sem validação automática de PRs
- Testes não rodados automaticamente
- Deploy manual (propenso a erros)

---

### 2. Sem Docker

**Severidade: 🟡 BAIXA**

#### Faltando:
```
❌ Dockerfile
❌ docker-compose.yml
❌ .dockerignore
```

#### Impacto:
- Dificuldade em replicar ambiente
- Sem containerização
- Deploy limitado

---

### 3. Sem Pre-commit Hooks

**Severidade: 🟡 BAIXA**

#### Faltando:
```
❌ .husky/pre-commit
❌ .husky/pre-push
❌ lint-staged config
```

#### Impacto:
- Código não validado antes do commit
- Erros chegam ao repositório
- CI/CD precisa fazer todo o trabalho

---

## 📚 Gaps de Documentação

### 1. Sem Documentação de API (Swagger/OpenAPI)

**Severidade: 🟠 MÉDIA**

#### Faltando:
- Especificação OpenAPI/Swagger
- UI interativa de documentação
- Exemplos de request/response
- Schemas de validação documentados

#### Impacto:
- Difícil para frontend consumir APIs
- Sem contrato formal de API
- Dificulta integração futura

---

### 2. Sem Diagramas de Arquitetura

**Severidade: 🟡 BAIXA**

#### Faltando:
- ERD (Entity Relationship Diagram)
- Diagrama de arquitetura geral
- Fluxos de autenticação
- Diagrama de deploy

---

### 3. Sem Guia de Deploy

**Severidade: 🟡 BAIXA**

#### Faltando:
- Passo a passo de deploy
- Configuração de domínio
- Setup de variáveis de ambiente
- Troubleshooting de produção

---

## 🧪 Gaps de Testes

### 1. Sem Testes E2E

**Severidade: 🟠 MÉDIA**

#### Faltando:
- Setup Playwright/Cypress
- Testes de fluxo completo
- Testes de interface

#### Impacto:
- Bugs podem passar para produção
- Sem validação de UX
- Regressões não detectadas

---

### 2. Sem Testes de Componentes React

**Severidade: 🟡 BAIXA**

#### Faltando:
- Testes com React Testing Library
- Testes de hooks
- Testes de interação

---

### 3. Cobertura de Testes Limitada

**Atual:** ~60-70%
**Meta:** 80%+

#### Áreas sem cobertura:
- Componentes React
- Error handling
- Edge cases

---

## ⚡ Gaps de Performance

### 1. Sem Estratégia de Cache

**Severidade: 🟡 BAIXA**

#### Faltando:
- Redis para cache de queries
- ISR (Incremental Static Regeneration)
- Cache de imagens

---

### 2. Imagens Não Otimizadas

**Severidade: 🟡 BAIXA**

#### Problemas:
- Uso de `<img>` em vez de `<Image>`
- Sem lazy loading
- Sem compressão automática
- Sem conversão para WebP

---

### 3. Sem Connection Pooling Explícito

**Severidade: 🟠 MÉDIA**

#### Problema:
Prisma usa pool padrão, mas sem otimização

#### Solução:
```typescript
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")

  // Adicionar
  connection_limit = 10
  pool_timeout     = 20
}
```

---

## 📊 Resumo Executivo

### Por Severidade

| Severidade | Quantidade | Horas Est. |
|-----------|------------|------------|
| 🔴 Crítica | 2 gaps | 6h |
| 🟡 Alta | 3 gaps | 8h |
| 🟠 Média | 12 gaps | 60h |
| 🟢 Baixa | 15 gaps | 45h |
| **TOTAL** | **32 gaps** | **119h** |

### Por Categoria

| Categoria | Gaps | Impacto |
|-----------|------|---------|
| APIs | 5 | Alto |
| Segurança | 5 | Crítico |
| Validação | 4 | Médio |
| Frontend | 3 | Baixo |
| DevOps | 3 | Médio |
| Documentação | 3 | Baixo |
| Testes | 3 | Médio |
| Performance | 3 | Baixo |

---

## 🎯 Prioridades de Resolução

### Sprint 1 (Crítico - 14h)
1. Refatorar Admin Auth (4h)
2. Implementar Rate Limiting (2h)
3. Security Headers (1h)
4. Validações robustas (3h)
5. Remover credenciais padrão (1h)
6. Mover Supabase Service Role (3h)

### Sprint 2 (Alta Prioridade - 22h)
1. API de Avaliações (8h)
2. PATCH endpoints (4h)
3. Múltiplas imagens (6h)
4. Validações adicionais (4h)

### Sprint 3+ (Médio/Baixo - 83h)
Resolver gradualmente conforme necessidade do TCC.

---

**Última atualização:** 2025-10-29
**Próxima análise:** Após Sprint 1 (2 semanas)
