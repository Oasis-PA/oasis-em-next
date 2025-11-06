# 🔴 Problema de Conexão com Banco de Dados

**Data**: 2025-11-05
**Status**: ❌ Banco de dados inacessível

---

## 🐛 Erro Atual

```
Can't reach database server at `db.yyvjzgxyxgalnnwcjfqh.supabase.co:5432`
```

**Causa**: A aplicação não consegue conectar ao banco de dados Supabase.

---

## 🔍 Diagnóstico Realizado

### Teste de DNS
```bash
nslookup db.yyvjzgxyxgalnnwcjfqh.supabase.co
```
**Resultado**: ✅ DNS resolve corretamente para IPv6 (`2600:1f1e:75b:4b11:c6a4:8f10:50b3:2df1`)

### Teste de Ping
```bash
ping db.yyvjzgxyxgalnnwcjfqh.supabase.co
```
**Resultado**: ❌ Host não responde

### Teste de Conexão Prisma
```bash
node scripts/test-db-connection.js
```
**Resultado**: ❌ Não consegue conectar na porta 5432

---

## 🎯 Causas Prováveis

### 1. **Firewall da Rede Bloqueando Porta 5432** (MAIS PROVÁVEL)
- Você está na rede do **SENAI CIMATEC** (`SNP305-100.senaicimatec.edu.br`)
- Redes corporativas/educacionais frequentemente bloqueiam a porta 5432 (PostgreSQL)
- Isso impede conexões diretas com bancos de dados externos

### 2. **Projeto Supabase Pausado**
- Projetos Supabase no plano gratuito pausam após 7 dias de inatividade
- Você precisa "reativar" o projeto no dashboard

### 3. **IPv6 Não Configurado**
- O DNS retorna IPv6, mas sua conexão pode não suportar IPv6 adequadamente

---

## ✅ Soluções

### Solução 1: Usar Supabase Pooler (RECOMENDADO)

O Supabase oferece uma URL alternativa usando **connection pooling** na porta 6543 (que pode não estar bloqueada):

1. **Acesse o Dashboard do Supabase**:
   - https://app.supabase.com/project/yyvjzgxyxgalnnwcjfqh

2. **Vá em "Database" → "Connection Pooling"**

3. **Copie a "Connection String" do Pooler** (porta 6543):
   ```
   postgresql://postgres.yyvjzgxyxgalnnwcjfqh:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
   ```

4. **Atualize o `.env`**:
   ```env
   DATABASE_URL="postgresql://postgres.yyvjzgxyxgalnnwcjfqh:[SUA_SENHA]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   ```

### Solução 2: Reativar Projeto Supabase

1. Acesse: https://app.supabase.com/project/yyvjzgxyxgalnnwcjfqh
2. Se aparecer um banner "Project paused", clique em **"Restore project"**
3. Aguarde alguns minutos para o banco reativar
4. Teste novamente

### Solução 3: Usar VPN ou Rede Diferente

Se o firewall da rede SENAI estiver bloqueando:

1. **Use um hotspot do celular** (4G/5G geralmente não bloqueia)
2. **Use uma VPN** (Cloudflare WARP, ProtonVPN, etc.)
3. **Conecte em outra rede Wi-Fi** (casa, café, etc.)

### Solução 4: Usar Túnel SSH/Ngrok (Avançado)

Se precisar desenvolver na rede do SENAI:

1. Configure um servidor proxy/túnel em uma rede sem restrições
2. Redirecione a porta 5432 através do túnel
3. Use o túnel como intermediário

### Solução 5: Banco de Dados Local (Desenvolvimento)

Para desenvolvimento offline, use PostgreSQL local:

1. **Instalar PostgreSQL localmente**:
   - Download: https://www.postgresql.org/download/windows/
   - Ou usar Docker: `docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=senha postgres`

2. **Atualizar `.env`**:
   ```env
   DATABASE_URL="postgresql://postgres:senha@localhost:5432/oasis_dev"
   ```

3. **Executar migrations**:
   ```bash
   npx prisma migrate dev
   ```

---

## 🧪 Como Testar Conexão

### Teste Rápido
```bash
node scripts/test-db-connection.js
```

### Teste de Porta
```powershell
# Windows PowerShell
Test-NetConnection -ComputerName db.yyvjzgxyxgalnnwcjfqh.supabase.co -Port 5432
```

### Teste com Telnet
```bash
telnet db.yyvjzgxyxgalnnwcjfqh.supabase.co 5432
```

---

## 📋 Checklist de Diagnóstico

- [x] DNS resolve corretamente
- [ ] Ping responde
- [ ] Porta 5432 acessível
- [ ] Projeto Supabase ativo
- [ ] Credenciais corretas no `.env`
- [ ] Sem bloqueio de firewall

---

## 🔧 Comandos Úteis

```bash
# Testar conexão
node scripts/test-db-connection.js

# Ver variáveis de ambiente
echo $env:DATABASE_URL  # PowerShell
set DATABASE_URL        # CMD

# Regenerar Prisma Client
npx prisma generate

# Verificar status do Prisma
npx prisma validate
npx prisma db push --help
```

---

## 📞 Próximos Passos

1. **IMEDIATO**: Tente a **Solução 1** (Connection Pooler na porta 6543)
2. **Se não funcionar**: Use **Solução 3** (hotspot do celular)
3. **Para longo prazo**: Configure banco local ou VPN

---

## 🆘 Suporte

Se nenhuma solução funcionar:

1. **Contate o TI do SENAI**: Solicite liberação da porta 5432 ou 6543 para desenvolvimento
2. **Suporte Supabase**: https://supabase.com/support
3. **Discord Supabase**: https://discord.supabase.com

---

**Sistema Oasis**
**Última Atualização**: 2025-11-05
