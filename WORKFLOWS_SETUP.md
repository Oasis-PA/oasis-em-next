# Configuração dos GitHub Actions Workflows

Os workflows foram criados para executar testes automaticamente a cada commit. Siga as instruções abaixo para ativá-los.

## 📋 Workflows Disponíveis

1. **test.yml** - Testes com Coverage Completo
   - Executa todos os testes
   - Coleta métricas de cobertura de código
   - Comenta no PR com resultados

2. **test-simple.yml** - Testes Rápidos
   - Executa testes sem coverage
   - Mais rápido para feedback imediato

3. **build.yml** - Build & Type Check
   - Valida TypeScript
   - Faz build do projeto
   - Gera Prisma Client

## 🔐 Passo 1: Configurar Secrets no GitHub

Acesse o repositório no GitHub e siga os passos:

1. Clique em **Settings** (Configurações)
2. No menu esquerdo, clique em **Secrets and variables → Actions**
3. Clique em **New repository secret**
4. Adicione cada um dos secrets abaixo:

### Secrets Obrigatórios:

#### `DATABASE_URL_TEST`
Sua URL de banco de dados para testes:
```
postgresql://postgres.xxxxx:sua_senha@aws-1-sa-east-1.pooler.supabase.com:6543/postgres
```

#### `ADMIN_USERNAME`
```
admin
```

#### `ADMIN_PASSWORD`
```
oasiscapenga
```

#### `JWT_SECRET`
Uma chave secreta aleatória (pode usar um UUID):
```
sua-chave-jwt-super-secreta-aqui
```

## ✅ Passo 2: Verificar que Tudo Está Funcionando

1. Faça um commit e push para a branch `main` ou `develop`
2. Vá para a aba **Actions** no repositório do GitHub
3. Você deve ver os workflows em execução
4. Aguarde a conclusão

## 📊 Visualizar Resultados

- **Actions Tab**: Veja o status de todos os workflows
- **Commits**: Badge de status aparecerá ao lado do commit
- **Pull Requests**: Resultados dos testes aparecem no PR

## 🚀 Próximos Passos

### Adicionar mais checks (opcional):

Se quiser adicionar mais validações, edite os arquivos YAML em `.github/workflows/`:

- **Linting**: Adicionar ESLint
- **Formatting**: Adicionar Prettier
- **Security**: Adicionar SAST scans
- **Notifications**: Integrar com Slack/Discord

## 🔧 Troubleshooting

### Erro: "Secret not found"
- Verifique que adicionou os secrets corretamente
- Confirme os nomes exatamente (case-sensitive)

### Erro: "Database connection failed"
- Confirme a URL do banco de dados está correta
- Verifique que o banco está acessível
- Se usar Supabase, verifique IP allowlist

### Testes falhando no CI mas passando localmente
- Certifique-se que `.env.test` está configurado corretamente
- Verifique variáveis de ambiente

## 📚 Documentação

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Secrets Management](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

---

**Dúvidas?** Verifique o README em `.github/workflows/README.md`
