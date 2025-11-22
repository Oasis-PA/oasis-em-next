# 🔒 Sistema de Backup e Restore

## Como Usar

### 1. **Fazer Backup** (Salvar dados em JSON)
```bash
npm run backup
```

**O que faz:**
- Lê TODAS as tabelas do banco de dados
- Salva tudo em um arquivo JSON com timestamp
- Arquivo é criado em `backups/backup-YYYY-MM-DDTHH-MM-SS.json`
- Total de registros é exibido no console

**Exemplo de saída:**
```
🔒 Iniciando BACKUP COMPLETO do banco de dados...

✅ genero               → 2 registros
✅ tipoCabelo          → 10 registros
✅ categoria           → 5 registros
✅ usuario             → 15 registros
✅ artigo              → 35 registros
✅ favorito            → 42 registros
... (mais tabelas)

✅ BACKUP SALVO COM SUCESSO!
📁 Arquivo: backups/backup-2025-11-21T21-38-52.json
📊 Tamanho: 245.67 KB
🗂️  Total de registros: 500
```

---

### 2. **Restaurar Backup** (Carregar dados de um backup)
```bash
npm run restore backups/backup-2025-11-21T21-38-52.json
```

**O que faz:**
- Lê o arquivo JSON de backup
- **DELETA** todos os dados atual do banco
- **RECARREGA** exatamente como estava no backup
- Valida foreign keys automaticamente

**Exemplo:**
```bash
# Restaurar um backup específico
npm run restore backups/backup-2025-11-21T21-38-52.json

# Ou especifique o caminho completo
npm run restore ./backups/backup-2025-11-21T21-38-52.json
```

---

## Tabelas que são Salvas/Restauradas

✅ `genero` - Gêneros de usuário
✅ `tipoCabelo` - Tipos de cabelo
✅ `tipoPele` - Tipos de pele
✅ `categoria` - Categorias de produtos
✅ `tag` - Tags para artigos
✅ `usuario` - Usuários do sistema
✅ `produto` - Produtos cadastrados
✅ `imagemProduto` - Imagens dos produtos
✅ `avaliacao` - Avaliações de produtos
✅ `favorito` - Favoritos de produtos
✅ `artigo` - Artigos do blog
✅ `artigoTag` - Tags dos artigos
✅ `favoritoArtigo` - Favoritos de artigos
✅ `empresas` - Dados de empresas
✅ `passwordReset` - Requisições de reset

---

## ⚠️ Importante

1. **Backup sobrescreve o banco** - Ao restaurar, todos os dados atuais são deletados
2. **Timestamps únicos** - Cada backup tem um timestamp, então nunca sobrescreve outro
3. **Arquivos em JSON** - Totalmente legível e editável
4. **Sem perda de histórico** - Todos os backups antigos continuam em `backups/`

---

## Exemplo de Workflow

```bash
# 1. Fazer backup ANTES de fazer mudanças perigosas
npm run backup
# Criado: backups/backup-2025-11-21T21-38-52.json

# 2. Fazer mudanças no sistema...
# 3. Se algo der errado, restaurar!
npm run restore backups/backup-2025-11-21T21-38-52.json

# 4. Tudo volta ao normal! ✅
```

---

## 📁 Estrutura do Backup

```json
{
  "timestamp": "2025-11-21T21:38:52.123Z",
  "version": "1.0",
  "tabelas": {
    "usuario": [
      { "id_usuario": 1, "nome": "Maria", ... },
      { "id_usuario": 2, "nome": "João", ... }
    ],
    "artigo": [
      { "id": 759, "titulo": "Suplementos para cabelo", ... },
      ...
    ],
    ...
  }
}
```

Cada tabela é um array com todos seus registros!
