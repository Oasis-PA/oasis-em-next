# 🚀 COMECE AQUI - Próximas 4 Tarefas

**Data:** 05/11/2025
**Tempo Total:** 12-15 horas
**Prioridade:** ALTA

---

## 🎯 AS 4 TAREFAS PRINCIPAIS

### 1️⃣ ERRO DO CSS (3-4 horas)

**O que fazer:**
1. Abrir `src/styles/globals.css` e verificar conflitos
2. Procurar `!important` excessivo em todos arquivos CSS
3. Consolidar estilos duplicados
4. Criar sistema de variáveis CSS para cores/tamanhos

**Verificação rápida:**
```bash
grep -r "!important" src/styles/
```

**Impacto:** Evita bugs visuais em diferentes páginas

---

### 2️⃣ PONTE PARA PÁGINAS DO USUÁRIO (4-5 horas)

**O que fazer:**
1. Criar nova página `/user/dashboard` (welcome do usuário logado)
2. Adicionar navegação em `/perfil/layout.tsx` (sidebar com links)
3. Atualizar header com menu de usuário
4. Adicionar proteção de rotas (middleware)

**Páginas a conectar:**
- `/user/dashboard` (Nova - HOME do usuário)
- `/perfil` (Editar perfil)
- `/gerenciamento` (Configurações)
- `/favoritos` (Favoritos)

**Impacto:** Usuários conseguem navegar entre suas páginas

---

### 3️⃣ BOTÃO VOLTAR NA PÁGINA DE PERFIL (1-2 horas)

**O que fazer:**
1. Abrir `src/app/perfil/layout.tsx`
2. Adicionar botão "← Voltar para Home" no topo
3. Adicionar breadcrumb (Home > Perfil)
4. Testar em mobile e desktop

**Código simples:**
```tsx
<button onClick={() => window.location.href = '/'} className="btn-back">
  ← Voltar para Home
</button>
```

**Impacto:** UX melhorada - usuário não fica preso

---

### 4️⃣ ACESSO ADMIN BEM FEITO (4-5 horas) ⚠️ CRÍTICO SEGURANÇA

**O que fazer:**
1. Criar JWT (JSON Web Token) para admin ❌ NÃO Base64!
2. Remover credenciais padrão "admin123"
3. Adicionar expiração de token
4. Proteger TODAS rotas `/api/admin/**`

**Arquivos a modificar:**
- `src/app/api/admin/auth/route.ts` (Login seguro)
- `src/app/api/admin/artigos/route.ts` (Validar acesso)
- `src/app/api/admin/upload/route.ts` (Validar acesso)
- `src/middleware.ts` (Proteção global)

**Novo arquivo `.env.local`:**
```
ADMIN_JWT_SECRET=<gerar com: openssl rand -hex 32>
```

**Impacto:** Previne acesso não autorizado, melhora segurança

---

## 📋 CHECKLIST RÁPIDO

```
ANTES DE COMEÇAR:
□ Fazer backup do código (git commit)
□ Criar branch: git checkout -b feat/4-prioridades
□ Verificar que npm run build passa

1️⃣ CSS (3-4h)
□ Audit CSS conflicts
□ Consolidate duplicates
□ Test visual

2️⃣ USER NAV (4-5h)
□ Create /user/dashboard
□ Update /perfil/layout.tsx
□ Add header menu
□ Protect routes

3️⃣ BACK BUTTON (1-2h)
□ Add button to /perfil
□ Style CSS
□ Test mobile

4️⃣ ADMIN AUTH (4-5h)
□ Create JWT system
□ Update /api/admin/auth
□ Protect admin routes
□ Set environment variables
□ Test login flow

DEPOIS DE TUDO:
□ npm run build (sem erros)
□ npm run test:functional (testes passando)
□ git commit com mensagem descritiva
```

---

## 🎬 COMEÇAR AGORA

Qual tarefa quer que eu comece?

```
1. npm run build  (verificar status atual)
2. Quer começar com CSS? Digite: "começa com CSS"
3. Quer começar com navegação? Digite: "começa com navegação"
4. Quer começar com admin? Digite: "começa com admin"
```

---

**Documento completo:** Ver [PLANO_ACAO_PRIORIDADES.md](./PLANO_ACAO_PRIORIDADES.md)
