# Sistema de Administrador - Guia de Configuração

## O que foi implementado

Você agora tem um sistema de administrador integrado na tabela de usuários. Aqui está o resumo das mudanças:

### 1. Banco de Dados
- ✅ **Campo adicionado:** `is_admin` (Boolean, padrão: false) na tabela `Usuario`
- Localização do schema: `prisma/schema.prisma` (linha 44)

### 2. Autenticação
- ✅ **Endpoint de login atualizado:** `/api/usuarios/login/route.ts`
  - Agora inclui `isAdmin: user.is_admin` no token JWT
  - Usuários admin recebem o flag no token de autenticação

### 3. Redirecionamento
- ✅ **Página inicial atualizada:** `/src/app/page.tsx`
  - Verifica se o usuário logado é admin
  - Se sim, redireciona automaticamente para `/admin`
  - Se não, mostra a página inicial normal

### 4. Dashboard Admin
- ✅ **Portal administrativo criado:** `/src/app/admin/page.tsx`
  - Dashboard principal com acesso a:
    - Gerenciamento de Artigos (`/admin/artigos`)
    - Gerenciamento de Cortes (`/admin/cortes`)

---

## Como Usar

### Passo 1: Definir um usuário como admin

Execute o script para promover um usuário existente a administrador:

```bash
npx ts-node scripts/make-admin.ts seu-email@example.com
```

Exemplo:
```bash
npx ts-node scripts/make-admin.ts maria@oasis.com
```

**Resultado esperado:**
```
✅ Usuário "Maria" (maria@oasis.com) agora é administrador!
```

### Passo 2: Fazer login

1. Acesse a página de login (`/login`)
2. Use as credenciais do usuário que você promoveu a admin
3. Será automaticamente redirecionado para `/admin`

### Passo 3: Usar o portal admin

No dashboard, você pode:
- **Gerenciar Artigos**: Criar, editar e deletar artigos
- **Gerenciar Cortes**: Criar, editar e deletar cortes de cabelo

---

## Estrutura de Arquivos Modificados

```
oasis-em-next/
├── prisma/
│   └── schema.prisma                    (MODIFICADO: adicionado is_admin)
├── src/
│   ├── app/
│   │   ├── page.tsx                     (MODIFICADO: redirecionamento admin)
│   │   ├── api/usuarios/login/route.ts  (MODIFICADO: isAdmin no JWT)
│   │   └── admin/
│   │       └── page.tsx                 (NOVO: dashboard admin)
│   └── lib/
│       └── prisma.ts
└── scripts/
    └── make-admin.ts                    (NOVO: script para promover admin)
```

---

## Fluxo de Autenticação com Admin

```
Login → Verificar is_admin → Gerar JWT com isAdmin
                                          ↓
                           Se isAdmin = true → Armazenar em sessionStorage
                                          ↓
                           Usuário acessa home (/)
                                          ↓
                           Page.tsx verifica is_admin
                                          ↓
                        Redireciona para /admin
                                          ↓
                           /admin/page.tsx verifica is_admin novamente
                                          ↓
                        Mostra dashboard com opções de admin
```

---

## Segurança

⚠️ **Importante:**
- O campo `is_admin` é verificado tanto no frontend quanto no backend
- O token JWT contém o flag `isAdmin`
- As rotas `/admin/**` devem ter middleware de proteção (verifique `src/middleware.ts`)
- Apenas usuários com `is_admin = true` podem acessar o portal

---

## Próximos Passos (Opcional)

Se quiser expandir o sistema:

1. **Criar endpoint para gerenciar admins:**
   ```typescript
   POST /api/admin/usuarios/toggle-admin
   Body: { usuarioId: number, isAdmin: boolean }
   ```

2. **Adicionar mais permissões:**
   - Criar um campo `role` em vez de apenas `is_admin`
   - Implementar permissões granulares (editor, moderador, etc.)

3. **Audit log:**
   - Registrar quem fez quais alterações
   - Tabela de histórico no banco

---

## Troubleshooting

**Problema:** "Usuário não encontrado"
- Verifique se o email está correto (case-sensitive)
- Confirme que o usuário existe no banco

**Problema:** Usuário não redireciona para admin
- Verifique se `is_admin` está como `true` no banco
- Limpe o `sessionStorage` (abra DevTools > Application > Session Storage)
- Faça login novamente

**Problema:** Banco de dados não atualizado
- Execute: `npx prisma generate` para regenerar o cliente
- Certifique-se de que a migration foi aplicada
