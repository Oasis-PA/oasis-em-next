# 💾 Sistema de Backup e Restore

## Fazer Backup (Salvar dados em JSON)
```bash
npm run backup
```

**O que faz:**
- Lê TODAS as tabelas do banco de dados
- Salva tudo em um arquivo JSON com timestamp
- Arquivo fica em `backups/backup-YYYY-MM-DDTHH-MM-SS.json`

**Exemplo:**
```
✅ BACKUP SALVO COM SUCESSO!
📁 Arquivo: backups/backup-2025-11-21T21-38-52.json
📊 Tamanho: 245.67 KB
🗂️  Total de registros: 500
```

---

## Restaurar Backup (Carregar dados de um backup)
```bash
npm run restore backups/backup-2025-11-21T21-38-52.json
```

**O que faz:**
- Lê o arquivo JSON de backup
- **DELETA** todos os dados atuais do banco
- **RECARREGA** exatamente como estava no backup

**Atenção:** Isso sobrescreve o banco inteiro!

---

## Tabelas que são Salvas/Restauradas

✅ usuario, artigo, favorito, produto, imagemProduto
✅ avaliacao, genero, tipoCabelo, tipoPele, categoria
✅ tag, artigoTag, favoritoArtigo, empresas, passwordReset

---

## ⚠️ Importante

1. **Sobrescreve o banco** - Ao restaurar, todos os dados atuais são deletados
2. **Timestamps únicos** - Cada backup tem um timestamp, nunca sobrescreve outro
3. **Arquivos em JSON** - Totalmente legível e editável
4. **Sem perda de histórico** - Todos os backups antigos continuam em `backups/`
