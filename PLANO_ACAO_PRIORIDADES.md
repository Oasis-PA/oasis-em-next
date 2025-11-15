# 🎯 PLANO DE AÇÃO - 4 PRIORIDADES PRINCIPAIS

**Criado:** 05/11/2025
**Status:** Planejamento completo
**Estimativa Total:** 12-15 horas

---

## 📋 RESUMO DOS 4 OBJETIVOS

```
1️⃣  ERRO DO CSS                        ⏱️  3-4 horas
2️⃣  PONTE PARA TODAS PÁGINAS USUÁRIO   ⏱️  4-5 horas
3️⃣  BOTÃO VOLTAR NA PÁGINA DE PERFIL   ⏱️  1-2 horas
4️⃣  ACESSO ADMIN BEM FEITO             ⏱️  4-5 horas
```

---

## 1️⃣ ERRO DO CSS (3-4 horas)

### 🔴 PROBLEMA IDENTIFICADO:

O projeto tem **42 arquivos CSS** no `src/styles/` com potencial para conflitos:

```
✅ Arquivos encontrados:
- admin-artigos.css
- alimentacao.css
- artigo.module.css
- artigo-geral.css
- artigoteste.css
- cadastrar-produto.css
- central-de-ajuda.css
- componentes.css
- corte-modelo.css
- cortes-geral.css
- cronograma-capilar.css
- editar-perfil.css
- favorite-button.css
- favoritos.css
- globals.css (⚠️ ARQUIVO CHAVE)
- guia.css
- hair-care.css
- infantil.css
- login-admin.css
- meuperfil-after.css
- meuperfil-before.css
- page.module.css
- pagina-em-manutencao.css
- parcerias-empresas.css
- parcerias-usuarios.css
- perguntas.css
- pos_login.module.css
- produtos.css
- questionario1.css
- questionario2.css
- questionario3.css
- questionario4.css
- quizzes.css
- resetar.css
- respostas.css
- SenhaModal.css
- skincare.css
- tela-de-cadastro.css
- tela-de-produto.css
- tendencias.css
- tinturas.css
- UserMenu.module.css
```

### ✅ CHECKLIST - O QUE VERIFICAR:

- [ ] **globals.css** - Remover/consolidar estilos globais duplicados
- [ ] **Buscar !important** - Identificar override excessivos
- [ ] **Module CSS vs Global** - Diferenciar `.module.css` de `.css`
- [ ] **Estilos duplicados** - Consolidar regras CSS iguais
- [ ] **Media queries** - Unificar breakpoints
- [ ] **Variáveis CSS** - Centralizar cores, fontes, espaçamentos
- [ ] **CSS Modules** - Verificar imports em components

### 🛠️ SOLUÇÃO PROPOSTA:

**Fase 1: Auditoria (1-2 horas)**
```bash
# 1. Analisar cada arquivo CSS para conflitos
# 2. Procurar por !important (indicativo de conflict)
grep -r "!important" src/styles/

# 3. Procurar por seletores duplicados
# 4. Identificar regras que se sobrescrevem
```

**Fase 2: Consolidação (1-2 horas)**
- [ ] Criar `src/styles/_variables.css` com cores e espaçamentos
- [ ] Criar `src/styles/_base.css` com estilos base globais
- [ ] Agrupar CSS por features (não por página)
- [ ] Remover duplicatas

**Fase 3: Refatoração (1 hora)**
- [ ] Atualizar imports em pages
- [ ] Testar visual em todas páginas
- [ ] Validar responsividade

---

## 2️⃣ PONTE PARA TODAS PÁGINAS DO USUÁRIO (4-5 horas)

### 🔴 PROBLEMA IDENTIFICADO:

Usuários logados podem acessar `/perfil` e `/gerenciamento`, mas:
- ❌ Sem navegação clara entre páginas do usuário
- ❌ Sem acesso a `/meuperfil-before` (onboarding)
- ❌ Sem página de `dashboard/home` do usuário
- ❌ Sem menu centralizado

### ✅ SOLUÇÃO PROPOSTA:

**Criar um "User Hub" / Dashboard centralizado**

#### Passo 1: Nova página `/user/dashboard` (30 min)
```
Arquivo: src/app/user/dashboard/page.tsx

Conteúdo:
├── Welcome section (Bem-vindo, João!)
├── Quick actions (botões de acesso rápido)
├── Recent activity
└── Navigation cards para:
    ├── Meu Perfil (/perfil)
    ├── Gerenciamento (/gerenciamento)
    ├── Meus Favoritos (/favoritos)
    ├── Meus Artigos Salvos
    └── Voltar ao Início (/)
```

#### Passo 2: Atualizar `/perfil/layout.tsx` (1-2 horas)
**Adicionar navegação em sidebar:**
```
Sidebar Menu:
├── 🏠 Dashboard (/user/dashboard)
├── ✏️  Editar Perfil (/perfil)
├── ⚙️  Gerenciamento (/gerenciamento)
├── ❤️  Favoritos (/favoritos)
├── 📚 Meus Artigos
├── ─────────────
└── 🚪 Sair (logout)
```

#### Passo 3: Atualizar Header navigation (1-2 horas)
**Adicionar link no menu do usuário:**
```
Header User Menu:
├── Perfil
├── Dashboard
├── Gerenciamento
├── Favoritos
├── ─────────
└── Logout
```

#### Passo 4: Proteger rotas (1 hora)
```typescript
// Criar middleware para validar acesso
// /user/* - requer autenticação
// /perfil/* - requer autenticação
// /gerenciamento/* - requer autenticação
```

---

## 3️⃣ BOTÃO VOLTAR NA PÁGINA DE PERFIL (1-2 horas)

### 🔴 PROBLEMA IDENTIFICADO:

Usuário em `/perfil` não consegue voltar facilmente para a página principal.

### ✅ SOLUÇÃO PROPOSTA:

#### Opção A: Adicionar breadcrumb (30 min)
```tsx
// No topo da página /perfil
<nav className="breadcrumb">
  <a href="/">Home</a>
  <span>/</span>
  <span>Perfil</span>
</nav>
```

#### Opção B: Adicionar botão "Voltar" (30 min)
```tsx
// No topo da página /perfil
<button onClick={() => window.history.back()} className="btn-voltar">
  ← Voltar
</button>
```

#### Opção C: Adicionar no sidebar (recomendado) (1 hora)
```tsx
// No layout.tsx do perfil - adicionar ao topo da sidebar
<div className="sidebar-header">
  <a href="/" className="btn-voltar-home">
    ← Voltar para Home
  </a>
</div>
```

### 🎯 RECOMENDAÇÃO:
**Opção C + Breadcrumb** = Melhor UX
- Usuário tem 2 maneiras de voltar (sidebar + breadcrumb)
- Fácil de implementar e entender

---

## 4️⃣ ACESSO ADMIN BEM FEITO (4-5 horas)

### 🔴 PROBLEMA IDENTIFICADO:

Autenticação admin tem sérios problemas de segurança:

```
❌ CRÍTICOS:
1. Auth usa Base64 (não é seguro)
   - Arquivo: src/app/api/admin/auth/route.ts
   - Token pode ser facilmente decodificado

2. Sem validação JWT adequada
   - Sem secret key
   - Sem expiração de token

3. Supabase Service Role Key exposto
   - Arquivo: src/app/api/usuarios/upload-foto/route.ts
   - Chave de acesso total ao banco (sem Row Level Security)

4. Sem proteção de rotas admin
   - /admin/artigos acessível sem autenticação real
```

### ✅ SOLUÇÃO PROPOSTA:

#### Fase 1: Implementar JWT para Admin (2-3 horas)

**Passo 1: Criar arquivo de autenticação segura**
```typescript
// src/lib/admin-auth.ts

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const ADMIN_SECRET = process.env.ADMIN_JWT_SECRET;

export function generateAdminToken(adminId: number, email: string) {
  return jwt.sign(
    { id: adminId, email, role: 'admin' },
    ADMIN_SECRET,
    { expiresIn: '7d' } // Token expira em 7 dias
  );
}

export function verifyAdminToken(token: string) {
  try {
    return jwt.verify(token, ADMIN_SECRET);
  } catch (error) {
    return null;
  }
}
```

**Passo 2: Refatorar `/api/admin/auth/route.ts`**
```typescript
// ANTES: Base64
// admin-auth-token: base64_encoded_email_password

// DEPOIS: JWT
// Authorization: Bearer jwt_token_here
// + Cookie httpOnly (mais seguro)
```

**Passo 3: Criar middleware de proteção**
```typescript
// src/middleware.ts

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Verificar JWT token
    const token = request.cookies.get('admin-token')?.value;

    if (!token || !verifyAdminToken(token)) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
}
```

#### Fase 2: Proteger rotas admin (1-2 horas)

**Adicionar verificação em TODAS as rotas `/api/admin/**`:**

```typescript
// Padrão para todas rotas admin
async function verifyAdminAccess(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const payload = verifyAdminToken(token);
  if (!payload) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }

  return payload;
}
```

#### Fase 3: Remover credenciais padrão (30 min)

**Arquivo: `src/app/api/admin/auth/route.ts`**

```typescript
// ❌ REMOVER ISTO:
if (!email || !password) {
  // Fallback para credenciais padrão
  email = 'admin@example.com';
  password = 'admin123'; // NÃO FAZER ISSO!
}

// ✅ FAZER ISTO:
if (!email || !password) {
  return NextResponse.json(
    { error: 'Email e senha são obrigatórios' },
    { status: 400 }
  );
}
```

#### Fase 4: Variáveis de ambiente (30 min)

**Criar `.env.local`:**
```
ADMIN_JWT_SECRET=seu_secret_muito_longo_aqui_minimo_32_caracteres
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**⚠️ IMPORTANTE:**
- Gerar secret seguro: `openssl rand -hex 32`
- NÃO commitar `.env.local` no git
- NUNCA usar secrets na variável `NEXT_PUBLIC_*`

### 📋 CHECKLIST - Admin Access

- [ ] Implementar JWT com secret seguro
- [ ] Remover Base64 encoding
- [ ] Remover credenciais padrão
- [ ] Adicionar expiração de token (7 dias)
- [ ] Implementar middleware de proteção
- [ ] Proteger TODAS rotas `/api/admin/**`
- [ ] Testar login/logout admin
- [ ] Testar redirect quando token expirado
- [ ] Validar cookies httpOnly (seguro contra XSS)
- [ ] Remover Supabase Service Role exposta

---

## 📊 CRONOGRAMA RECOMENDADO

### Semana 1:
```
Dia 1: CSS Errors (Auditoria) - 2h
Dia 2: CSS Consolidation - 2h
Dia 3: User Navigation - 3h
Dia 4: Back Button - 1h
Dia 5: Admin Access - 3h
```

**Total: 11 horas**

---

## 🔧 COMANDOS ÚTEIS

### Verificar conflitos CSS:
```bash
# Procurar !important
grep -r "!important" src/styles/

# Procurar seletores específicos
grep -r "\.container" src/styles/
grep -r "\.btn" src/styles/
grep -r "\.header" src/styles/
```

### Gerar JWT Secret:
```bash
openssl rand -hex 32
```

### Testar build:
```bash
npm run build
```

### Executar testes:
```bash
npm test
npm run test:functional
```

---

## 📚 RECURSOS ÚTEIS

- [Next.js Middleware](https://nextjs.org/docs/advanced-features/middleware)
- [JWT.io](https://jwt.io) - Validar/debugar tokens
- [CSS Best Practices](https://web.dev/css-best-practices/)
- [Secure Authentication](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

---

## ✅ PRÓXIMOS PASSOS

1. **Começar com CSS** (mais isolado, menos dependências)
2. **Depois User Navigation** (melhora UX)
3. **Back Button** (quick win)
4. **Terminar com Admin Auth** (mais complexo, crítico de segurança)

---

**Estimativa Total:** 12-15 horas
**Prioridade:** ALTA
**Impacto:** Alto (segurança + UX)

Quer que eu comece com qual tarefa?
