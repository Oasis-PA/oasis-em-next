# ⚙️ GitHub Actions Workflows

Este projeto possui workflows automatizados para backup, CI/CD e testes.

---

## 📋 Workflows Disponíveis

### 1. 💾 Backup Automático (`backup-banco.yml`)

**Acionadores:**
- ✅ Toda vez que alguém faz push para `main` ou `apresentacao-tcc`
- ✅ Diariamente às 2 da manhã (UTC)
- ✅ Manualmente via GitHub UI (Actions → Backup Automático → Run workflow)

**O que faz:**
1. Instala dependências
2. Executa `npm run backup`
3. Comita o arquivo de backup no repositório
4. Faz push automático para o repositório

**Resultado:**
- Um novo arquivo `backups/backup-YYYY-MM-DDTHH-MM-SS.json` é criado
- Arquivo é automaticamente commitado e enviado para o repositório

---

### 2. 🔍 CI/CD (`ci.yml`)

**Acionadores:**
- ✅ Push para `main`, `apresentacao-tcc` ou `develop`
- ✅ Pull requests para `main`

**Jobs Executados:**
1. **Linting** - Verifica código com ESLint
2. **Build** - Compila Next.js
3. **Testes** - Roda testes de integração com banco de dados PostgreSQL
4. **Status** - Relatório final

**Resultado:**
- ✅ Se todos passarem: merge/push é permitido
- ❌ Se falhar: notificação no GitHub e bloqueio de merge (se configurado)

---

## 🔐 Configurar Secrets (IMPORTANTE!)

Para que o backup funcione, você precisa configurar `DATABASE_URL` como secret no GitHub.

### Passo 1: Copiar Connection String
1. Vá para seu Supabase/PostgreSQL
2. Copie a connection string (ex: `postgresql://user:password@host:5432/db`)

### Passo 2: Adicionar Secret no GitHub

**Opção A: Via GitHub Web**
1. Vá para: https://github.com/Oasis-PA/oasis-em-next/settings/secrets/actions
2. Clique "New repository secret"
3. Nome: `DATABASE_URL`
4. Valor: Cola a connection string copiada
5. Clique "Add secret"

**Opção B: Via GitHub CLI**
```bash
gh secret set DATABASE_URL
# Ele vai pedir para colar o valor
# Cola a connection string e aperta Enter
```

---

## 📊 Monitorar Workflows

### Ver Status no GitHub
1. Vá para: https://github.com/Oasis-PA/oasis-em-next/actions
2. Veja os workflows em execução/completados
3. Clique em um workflow para ver detalhes

### Ícones de Status
- ✅ **Verde** - Sucesso
- ❌ **Vermelho** - Falha
- 🟡 **Amarelo** - Em execução
- ⊘ **Cinza** - Cancelado/Pulado

---

## 🔔 Notificações

Por padrão, o GitHub notifica:
- ✉️ Email quando um workflow falha
- 💬 Comentário no commit/PR com status

Para configurar alertas mais avançados:
1. Vá para: https://github.com/Oasis-PA/oasis-em-next/settings/notifications
2. Configure as preferências de notificação

---

## 🗂️ Estrutura de Workflows

```
.github/
└── workflows/
    ├── backup-banco.yml      # Backup automático do banco
    └── ci.yml                # Testes e build
```

---

## 📝 Exemplos de Uso

### Exemplo 1: Push dispara Backup
```bash
# Você faz um commit e push
git commit -m "feat: Novo recurso"
git push origin main

# Automaticamente:
# 1. GitHub Actions detecta o push
# 2. Inicia o workflow de backup
# 3. Faz backup do banco
# 4. Comita o backup automaticamente
# 5. Repository agora tem arquivo: backups/backup-2025-11-21T22-30-45.json
```

### Exemplo 2: Rodar Backup Manualmente
1. Vá para: https://github.com/Oasis-PA/oasis-em-next/actions
2. Selecione "💾 Backup Automático do Banco"
3. Clique "Run workflow"
4. Selecione a branch
5. Clique "Run workflow"
6. Aguarde a execução

### Exemplo 3: PR é testado automaticamente
```bash
# Você abre um PR para main
git push origin feature/novo-recurso

# Automaticamente:
# 1. Executa ESLint
# 2. Faz build do Next.js
# 3. Roda testes de integração
# 4. GitHub mostra status no PR
# 5. Se passar, você pode fazer merge
```

---

## ⚙️ Configurações Avançadas

### Alterar Backup Diário
Edite `.github/workflows/backup-banco.yml` linha ~21:
```yaml
schedule:
  - cron: "0 2 * * *"  # Alterar horário (formato cron)
```

**Exemplos de cron:**
- `0 2 * * *` - 2 da manhã todo dia
- `0 0 * * 0` - Meia-noite todo domingo
- `0 12 * * 1-5` - 12:00 de segunda a sexta

### Ignorar Arquivos no Backup
Edite `.github/workflows/backup-banco.yml` linha ~13:
```yaml
paths-ignore:
  - "docs/**"
  - "README.md"
```

### Limitar Retenção de Backups
Adicione script para deletar backups antigos:
```yaml
- name: 🗑️ Deletar backups antigos (>30 dias)
  run: |
    find backups -name "backup-*.json" -type f -mtime +30 -delete
```

---

## 🐛 Troubleshooting

### ❌ Workflow falha com "Permission denied"
**Solução:**
1. Verifique se `DATABASE_URL` está configurado (veja "Configurar Secrets")
2. Verifique se a connection string está correta
3. Verifique se o banco de dados está acessível da internet

### ❌ Backup não aparece no repositório
**Possíveis causas:**
1. Secret `DATABASE_URL` não está configurado
2. Banco de dados não está acessível
3. Nenhuma alteração foi feita (caminho ignorado em `paths-ignore`)

**Solução:**
1. Verifique os logs do workflow
2. Clique no workflow falho em Actions
3. Veja qual step falhou e por quê

### ❌ ESLint ou Build falha
**Solução:**
1. Execute localmente: `npm run lint` e `npm run build`
2. Corrija os erros
3. Faça push novamente

---

## 📚 Documentação

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Scheduled Workflows](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule)
- [Secrets Management](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

---

## 🚀 Próximos Passos

1. **Configure `DATABASE_URL` como secret** (veja "Configurar Secrets")
2. **Faça um push para testar** o backup automaticamente
3. **Vá para Actions** e monitore a execução
4. **Verifique o repositório** se o backup foi commitado

Pronto! Seu sistema de backup automático está funcionando! 🎉
