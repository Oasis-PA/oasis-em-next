# 🖥️ Requisitos para Rodar o Servidor

## ✅ Requisitos do Sistema

### Obrigatórios
- **Node.js** v18.17+ ou v20+
  - Download: https://nodejs.org/
  - Verificar: `node --version`

- **npm** v9+ (vem com Node.js)
  - Verificar: `npm --version`

- **Git** v2.30+
  - Download: https://git-scm.com/
  - Verificar: `git --version`

### Recomendado
- **RAM**: 4GB mínimo (8GB+ para desenvolvimento confortável)
- **Espaço em disco**: 2GB (para node_modules)
- **OS**: Windows 10+, macOS 10.15+, ou Linux (Ubuntu 18.04+)

---

## 📦 Instalação de Dependências

### 1. Clonar o Repositório
```bash
git clone https://github.com/Oasis-PA/oasis-em-next.git
cd oasis-em-next
```

### 2. Instalar Dependências do Projeto
```bash
npm install
```

Isso instala:
- `next` - Framework frontend/backend
- `react` - UI library
- `prisma` - ORM para banco de dados
- `jose` - JWT handling
- `bcryptjs` - Password hashing
- E mais 40+ packages

**Tempo estimado**: 2-3 minutos (depende da conexão)

---

## 🗄️ Banco de Dados

### Supabase (Recomendado para Produção)

1. **Criar conta**: https://supabase.com/
2. **Criar novo projeto**
3. **Copiar `Connection String` do PostgreSQL**
4. **Adicionar a `.env.local`**:
```env
DATABASE_URL="postgresql://user:password@db.supabase.co:5432/postgres?schema=public"
```

### PostgreSQL Local (Desenvolvimento)

**Windows:**
```bash
# Instalar PostgreSQL
# Download: https://www.postgresql.org/download/windows/

# Após instalação, copiar connection string:
DATABASE_URL="postgresql://postgres:senha@localhost:5432/oasis"
```

**macOS:**
```bash
brew install postgresql
brew services start postgresql
createdb oasis
DATABASE_URL="postgresql://postgres@localhost:5432/oasis"
```

**Linux (Ubuntu):**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres createdb oasis
DATABASE_URL="postgresql://postgres@localhost:5432/oasis"
```

---

## 🔑 Variáveis de Ambiente

### Criar arquivo `.env.local`

Na raiz do projeto, crie:

```env
# ===== DATABASE =====
DATABASE_URL="postgresql://user:password@host:5432/oasis"

# ===== AUTENTICAÇÃO JWT =====
JWT_SECRET="sua-chave-secreta-aleatoria-minimo-32-caracteres"
ADMIN_JWT_SECRET="outra-chave-secreta-aleatoria-minimo-32-caracteres"

# ===== CREDENCIAIS ADMIN =====
ADMIN_USER="admin"
ADMIN_PASSWORD="senha_segura_123"

# ===== SUPABASE (se usar) =====
NEXT_PUBLIC_SUPABASE_URL="https://seu-projeto.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="chave-secreta-do-supabase"

# ===== NODE ENVIRONMENT =====
NODE_ENV="development"  # ou "production"

# ===== FRONTEND URL =====
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

**⚠️ IMPORTANTE:**
- Nunca commitar `.env.local` (já está em `.gitignore`)
- Gerar chaves aleatórias forte para produção
- Senhas fortes (mínimo 12 caracteres, maiúsculas, números, símbolos)

---

## 🗃️ Setup do Banco de Dados

### 1. Executar Migrations
```bash
npm run prisma:migrate
```

Isso:
- Cria todas as tabelas
- Configura relacionamentos
- Cria índices de performance

### 2. Seed de Dados (Opcional)
```bash
npm run test:seed
```

Adiciona dados de teste para desenvolvimento.

### 3. Verificar Conexão
```bash
npm run prisma:studio
```

Abre interface gráfica do Prisma para ver/editar dados.

---

## 🚀 Rodar o Servidor

### Desenvolvimento (com auto-reload)
```bash
npm run dev
```

Output esperado:
```
▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.5s
```

Acesse: http://localhost:3000

### Produção (build otimizado)
```bash
# Build
npm run build

# Rodar
npm start
```

### Rodar apenas testes (sem servidor)
```bash
npm run test:integration
```

---

## 🔌 Portas Utilizadas

| Serviço | Porta | Descrição |
|---------|-------|-----------|
| Next.js Frontend | 3000 | Aplicação web |
| Next.js API Routes | 3000 | APIs (mesma porta) |
| PostgreSQL | 5432 | Banco de dados local |
| Prisma Studio | 5555 | Interface de gerenciamento |

**Se porta 3000 estiver em uso:**
```bash
npm run dev -- -p 3001
```

---

## ✨ Estrutura de Pastas Importante

```
oasis-em-next/
├── src/
│   ├── app/
│   │   ├── api/          ← APIs (backend)
│   │   ├── admin/        ← Painel admin
│   │   └── [pages]/      ← Páginas públicas
│   ├── components/       ← Componentes React
│   └── styles/           ← CSS/estilos
├── prisma/
│   ├── schema.prisma     ← Definição do banco
│   └── migrations/       ← Histórico de mudanças
├── scripts/              ← Scripts auxiliares
├── tests/                ← Testes
├── public/               ← Assets estáticos
└── package.json          ← Dependências
```

---

## 🔍 Verificação Pré-Launch

Antes de iniciar o servidor, confirme:

```bash
# 1. Node.js instalado corretamente
node --version
npm --version

# 2. Dependências instaladas
npm list | grep next

# 3. Arquivo .env.local existe e tem as variáveis
cat .env.local

# 4. Banco de dados acessível
npm run prisma:studio
# (se abrir a interface, banco está ok)

# 5. Compilação sem erros
npm run build

# 6. Testes passando
npm run test:all
```

---

## 🐛 Troubleshooting

### Erro: "Port 3000 already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Erro: "Cannot find module 'next'"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Database connection refused"
```bash
# Verificar se PostgreSQL está rodando
# Windows: Procurar em Services > PostgreSQL
# macOS: brew services list
# Linux: sudo systemctl status postgresql

# Testar conexão
psql -h localhost -U postgres -c "SELECT 1"
```

### Erro: "EACCES: permission denied"
```bash
# macOS/Linux - problema de permissões
npm cache clean --force
npm install
```

---

## 📊 Checklist Inicial

- [ ] Node.js 18+ instalado
- [ ] npm 9+ instalado
- [ ] Git configurado
- [ ] Repositório clonado
- [ ] `npm install` executado com sucesso
- [ ] `.env.local` criado com variáveis corretas
- [ ] Banco de dados acessível
- [ ] `npm run prisma:migrate` executado
- [ ] `npm run dev` iniciado sem erros
- [ ] Acesso http://localhost:3000 funcionando

---

## 📚 Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Rodar servidor dev
npm run build            # Compilar para produção
npm start                # Rodar build em produção

# Banco de dados
npm run prisma:studio    # Interface gráfica do banco
npm run prisma:migrate   # Executar migrations
npm run prisma:reset     # Resetar banco (⚠️ deleta dados)

# Testes
npm run test:all         # Rodar todos os testes
npm run test:integration # Testes de integração
npm run cypress:open     # E2E tests visual

# Linting
npm run lint             # Verificar código

# Backup
npm run backup           # Fazer backup do banco
npm run restore          # Restaurar backup
```

---

## 🌐 Deploy

### Vercel (Recomendado)

1. **Conectar GitHub**: https://vercel.com/import
2. **Selecionar repositório**
3. **Adicionar variáveis de ambiente em Project Settings**
4. **Deploy automático** a cada push para `main`

### Heroku

```bash
heroku login
heroku create seu-app-name
git push heroku main
```

### Servidor Próprio (VPS)

1. Instalar Node.js no servidor
2. Instalar PostgreSQL
3. Clone do repositório
4. `npm install` e `npm run build`
5. Usar PM2 para manter processo rodando:
```bash
npm install -g pm2
pm2 start "npm start" --name oasis
pm2 startup
pm2 save
```

---

## 📞 Suporte

Se tiver problemas:

1. **Verificar logs**: `npm run dev` mostra erros detalhados
2. **Consultar documentação oficial**:
   - Next.js: https://nextjs.org/docs
   - Prisma: https://www.prisma.io/docs/
   - Supabase: https://supabase.com/docs
3. **Abrir issue no GitHub**: https://github.com/Oasis-PA/oasis-em-next/issues
