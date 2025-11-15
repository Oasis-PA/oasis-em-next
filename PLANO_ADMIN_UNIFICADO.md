# 🛠️ PLANO ADMIN UNIFICADO

**Data:** 05/11/2025
**Conceito:** Consolidar todos os cadastros em um único painel admin
**Estimativa:** 6-8 horas
**Impacto:** ALTO - Melhor UX e manutenção centralizada

---

## 📊 ESTRUTURA ATUAL vs PROPOSTA

### ❌ ATUAL (Disperso)
```
/cadastrar-produto        ← Página isolada
/cadastrar-tag            ← Página isolada
/admin/login              ← Admin isolado
/admin/artigos            ← Admin isolado
/admin/artigos/criar      ← Admin isolado
/admin/artigos/editar/[id] ← Admin isolado
```

**Problemas:**
- Sem autenticação centralizada
- Usuários comuns conseguem acessar `/cadastrar-produto` e `/cadastrar-tag`
- Admin separado de produtos/tags
- Sem dashboard unificado
- Difícil de manter

---

### ✅ PROPOSTA (Unificado)
```
/admin                         ← Dashboard principal
├── /admin/login              ← Login admin
├── /admin/dashboard          ← Home admin
│   └── Resumo de tudo
├── /admin/artigos            ← Gerenciar artigos (EXISTENTE)
│   ├── Lista
│   ├── /admin/artigos/criar  ← Criar novo
│   └── /admin/artigos/editar/[id] ← Editar
├── /admin/produtos           ← NOVO: Gerenciar produtos
│   ├── Lista
│   ├── /admin/produtos/criar ← Criar novo
│   └── /admin/produtos/[id]  ← Editar
├── /admin/tags               ← NOVO: Gerenciar tags
│   ├── Lista
│   └── /admin/tags/criar     ← Criar nova
├── /admin/categorias         ← NOVO: Gerenciar categorias
├── /admin/tipos-cabelo       ← NOVO: Gerenciar tipos cabelo
├── /admin/tipos-pele         ← NOVO: Gerenciar tipos pele
└── /admin/marcas             ← NOVO: Gerenciar marcas
```

**Benefícios:**
- ✅ Autenticação centralizada
- ✅ Menu unificado
- ✅ Proteção por JWT
- ✅ Dashboard com resumo
- ✅ Consistência visual
- ✅ Fácil de expandir

---

## 🏗️ ARQUITETURA PROPOSTA

### 1. Layout Base Admin
```
/src/app/admin/layout.tsx (NOVO)
├── Navbar com logo + usuário logado
├── Sidebar com menu navegação
├── Main content area
└── Footer
```

### 2. Dashboard Admin
```
/src/app/admin/dashboard/page.tsx (NOVO)
├── Cards de resumo:
│   ├── Total de produtos
│   ├── Total de artigos
│   ├── Total de tags
│   ├── Total de categorias
│   └── Últimas atividades
└── Quick actions:
    ├── + Novo Produto
    ├── + Novo Artigo
    ├── + Nova Tag
    └── Gerenciar tudo
```

### 3. Pages de Gerenciamento
```
/src/app/admin/produtos/page.tsx (NOVO)
  └── Lista de produtos + CRUD

/src/app/admin/produtos/[id]/page.tsx (NOVO)
  └── Editar produto

/src/app/admin/tags/page.tsx (NOVO)
  └── Lista de tags + CRUD

/src/app/admin/categorias/page.tsx (NOVO)
  └── Lista de categorias + CRUD

/src/app/admin/tipos-cabelo/page.tsx (NOVO)
  └── Lista tipos cabelo + CRUD

/src/app/admin/tipos-pele/page.tsx (NOVO)
  └── Lista tipos pele + CRUD

/src/app/admin/marcas/page.tsx (NOVO)
  └── Lista marcas + CRUD
```

---

## 🔐 SEGURANÇA INTEGRADA

### Middleware de Proteção
```typescript
// middleware.ts (NOVO/ATUALIZADO)

export function middleware(request: NextRequest) {
  // Proteger TODAS rotas /admin/*
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Permitir /admin/login sem auth
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Validar JWT token para resto
    const token = request.cookies.get('admin-token')?.value;
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
}
```

### Autenticação JWT
```typescript
// src/lib/admin-auth.ts (NOVO)

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const ADMIN_SECRET = process.env.ADMIN_JWT_SECRET!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH!;

export function generateAdminToken(adminId: number, email: string) {
  return jwt.sign(
    { id: adminId, email, role: 'admin' },
    ADMIN_SECRET,
    { expiresIn: '7d' }
  );
}

export async function verifyAdminPassword(password: string) {
  return await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}

export function verifyAdminToken(token: string) {
  try {
    return jwt.verify(token, ADMIN_SECRET);
  } catch {
    return null;
  }
}
```

---

## 📋 PLANO DE IMPLEMENTAÇÃO (6-8 horas)

### Fase 1: Estrutura Base (1-2 horas)
- [ ] Criar `/admin/layout.tsx` com sidebar navegável
- [ ] Criar `/admin/dashboard/page.tsx`
- [ ] Criar middleware de proteção
- [ ] Criar lib de autenticação JWT

**Tempo:** 1-2 horas

### Fase 2: Migrar Produtos (1.5-2 horas)
- [ ] Criar `/admin/produtos/page.tsx` (lista)
- [ ] Criar `/admin/produtos/[id]/page.tsx` (editar)
- [ ] Mover lógica de `/cadastrar-produto` para cá
- [ ] Atualizar CSS
- [ ] Deletar página antiga `/cadastrar-produto`

**Tempo:** 1.5-2 horas

### Fase 3: Migrar Tags (1-1.5 horas)
- [ ] Criar `/admin/tags/page.tsx`
- [ ] Mover lógica de `/cadastrar-tag` para cá
- [ ] Integrar CRUD completo
- [ ] Deletar página antiga `/cadastrar-tag`

**Tempo:** 1-1.5 horas

### Fase 4: Gerenciadores Auxiliares (1.5-2 horas)
- [ ] Criar `/admin/categorias/page.tsx`
- [ ] Criar `/admin/tipos-cabelo/page.tsx`
- [ ] Criar `/admin/tipos-pele/page.tsx`
- [ ] Criar `/admin/marcas/page.tsx`
- [ ] Implementar listagem + delete + edit para cada um

**Tempo:** 1.5-2 horas

### Fase 5: Testes e Refinamento (1 hora)
- [ ] Testar fluxo completo de login
- [ ] Testar CRUD para cada recurso
- [ ] Verificar proteção de rotas
- [ ] Testar expiração de token
- [ ] Validar visual/responsividade

**Tempo:** 1 hora

---

## 🎨 LAYOUT DO ADMIN (Proposto)

```
┌─────────────────────────────────────────────┐
│ 🏠 ADMIN OASIS   [Logo]      👤 Admin       │ ← Navbar
├────────────┬──────────────────────────────┤
│            │                              │
│  Menu:     │  Conteúdo Principal          │
│            │                              │
│  📊 Dashboard                              │
│  📝 Artigos                               │
│  📦 Produtos                              │
│  🏷️  Tags                                 │
│  📂 Categorias                            │
│  💇 Tipos Cabelo                          │
│  💄 Tipos Pele                            │
│  🏷️  Marcas                               │
│  ⚙️  Configurações                        │
│                                           │
│  ─────────────────────                   │
│  🚪 Logout                               │
│                                           │
└────────────┴──────────────────────────────┘
```

---

## 🔄 INTEGRAÇÃO COM APIS EXISTENTES

As APIs já estão prontas, só precisa:

```
POST   /api/produtos/cadastro       ← Já existe ✅
PATCH  /api/produtos/[id]           ← Já existe ✅
GET    /api/produtos                ← Já existe ✅
DELETE /api/produtos/[id]           ← Precisa implementar

POST   /api/tags/cadastro           ← Já existe ✅
PATCH  /api/tags/[id]               ← Já existe ✅
GET    /api/tags                    ← Já existe ✅
DELETE /api/tags/[id]               ← Já existe ✅

POST   /api/categorias              ← Já existe ✅
PATCH  /api/categorias/[id]         ← Já existe ✅
GET    /api/categorias              ← Já existe ✅
DELETE /api/categorias/[id]         ← Já existe ✅

GET    /api/tipos-cabelo            ← Já existe ✅
PATCH  /api/tipos-cabelo/[id]       ← Falta implementar
DELETE /api/tipos-cabelo/[id]       ← Falta implementar

GET    /api/tipos-pele              ← Já existe ✅
PATCH  /api/tipos-pele/[id]         ← Falta implementar
DELETE /api/tipos-pele/[id]         ← Falta implementar

GET    /api/marcas                  ← Já existe ✅
PATCH  /api/marcas/[id]             ← Falta implementar
DELETE /api/marcas/[id]             ← Falta implementar
```

**Adicional: 3-4 endpoints PATCH/DELETE a implementar (~2 horas)**

---

## 📋 ARQUIVOS A CRIAR

### Estrutura Final
```
src/app/admin/
├── layout.tsx                    ← NOVO
├── dashboard/
│   └── page.tsx                  ← NOVO
├── produtos/
│   ├── page.tsx                  ← NOVO
│   ├── [id]/
│   │   └── page.tsx              ← NOVO
│   └── criar/
│       └── page.tsx              ← NOVO
├── tags/
│   ├── page.tsx                  ← NOVO
│   └── criar/
│       └── page.tsx              ← NOVO
├── categorias/
│   ├── page.tsx                  ← NOVO
│   └── [id]/
│       └── page.tsx              ← NOVO
├── tipos-cabelo/
│   ├── page.tsx                  ← NOVO
│   └── [id]/
│       └── page.tsx              ← NOVO
├── tipos-pele/
│   ├── page.tsx                  ← NOVO
│   └── [id]/
│       └── page.tsx              ← NOVO
├── marcas/
│   ├── page.tsx                  ← NOVO
│   └── [id]/
│       └── page.tsx              ← NOVO
└── login/
    └── page.tsx                  ← JÁ EXISTE

src/lib/
├── admin-auth.ts                 ← NOVO (funções JWT)
└── admin-validation.ts           ← NOVO (validações)

src/styles/
├── admin-layout.css              ← NOVO (sidebar + navbar)
├── admin-dashboard.css           ← NOVO
├── admin-crud.css                ← NOVO (tabelas)
└── admin-forms.css               ← NOVO

src/components/admin/             ← NOVO
├── AdminLayout.tsx
├── AdminSidebar.tsx
├── AdminNavbar.tsx
├── CRUDTable.tsx
├── FormBuilder.tsx
└── ProtectedRoute.tsx

middleware.ts                      ← ATUALIZAR
.env.local                         ← ATUALIZAR

DELETAR:
├── src/app/cadastrar-produto/
├── src/app/cadastrar-tag/
└── src/styles/cadastrar-produto.css
```

---

## 🔐 VARIÁVEIS DE AMBIENTE

Adicionar ao `.env.local`:
```
# Admin JWT
ADMIN_JWT_SECRET=<gerar: openssl rand -hex 32>

# Admin Login
ADMIN_EMAIL=admin@oasis.com
ADMIN_PASSWORD_HASH=<gerar: bcrypt("sua_senha_forte_aqui")>

# URLs
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Gerar password hash:**
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('sua_senha_aqui', 10))"
```

---

## ✅ CHECKLIST FINAL

```
ANTES DE COMEÇAR:
□ Fazer backup (git commit)
□ Criar branch: git checkout -b feat/admin-unified

ESTRUTURA:
□ Criar /admin/layout.tsx
□ Criar /admin/dashboard/page.tsx
□ Criar componentes admin (Sidebar, Navbar, etc)
□ Criar lib/admin-auth.ts
□ Atualizar middleware.ts

PRODUTOS:
□ Criar /admin/produtos/page.tsx
□ Criar /admin/produtos/[id]/page.tsx
□ Testar CRUD produtos
□ Deletar /cadastrar-produto

TAGS:
□ Criar /admin/tags/page.tsx
□ Testar CRUD tags
□ Deletar /cadastrar-tag

OUTROS GERENCIADORES:
□ Criar /admin/categorias/page.tsx
□ Criar /admin/tipos-cabelo/page.tsx
□ Criar /admin/tipos-pele/page.tsx
□ Criar /admin/marcas/page.tsx

APIs:
□ Implementar PATCH /api/tipos-cabelo/[id]
□ Implementar DELETE /api/tipos-cabelo/[id]
□ Implementar PATCH /api/tipos-pele/[id]
□ Implementar DELETE /api/tipos-pele/[id]
□ Implementar PATCH /api/marcas/[id]
□ Implementar DELETE /api/marcas/[id]
□ Implementar DELETE /api/produtos/[id]

SEGURANÇA:
□ Adicionar JWT ao /api/admin/artigos
□ Adicionar JWT ao /api/admin/upload
□ Adicionar verificação ao /api/admin/auth
□ Remover credenciais padrão

TESTES:
□ npm run build (sem erros)
□ npm test:functional (E2E tests)
□ Testar login admin
□ Testar CRUD completo
□ Testar expiração token

FINALIZAR:
□ git add e git commit
□ git push
```

---

## 🚀 PRÓXIMOS PASSOS

**Deseja que eu comece com:**

1. **Estrutura Base Admin** (layout, sidebar, navbar)
2. **Autenticação JWT** (lib + middleware)
3. **Produtos Dashboard** (lista + CRUD)
4. **Tags Dashboard** (lista + CRUD)
5. **Tudo junto** (eu faço automaticamente)

---

**Estimativa Total:** 6-8 horas
**Impacto:** MUITO ALTO
**Complexidade:** MÉDIA

Quer que eu comece? 🚀
