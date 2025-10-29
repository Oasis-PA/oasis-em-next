# ⚡ Comandos Rápidos - Testes do Sistema Oasis

## ✅ COMANDO PRINCIPAL (PARA DEMONSTRAÇÃO)

```bash
npm test
```

**Resultado esperado:**
```
Test Suites: 21 passed, 21 total
Tests:       145 passed, 145 total
Time:        ~15s
```

---

## 📊 Outros Comandos Úteis

### Testes de Validação (41 testes)
```bash
npm run test:validations
```

### Testes de API (104 testes)
```bash
npm run test:api
```

### Modo Watch (Reexecutar ao salvar)
```bash
npm run test:watch
```

### Relatório de Cobertura
```bash
npm run test:coverage
```

---

## ⚠️ Testes de Integração (NÃO FUNCIONAM NO SENAI)

```bash
# Não execute - vai falhar devido a firewall
npm run test:integration
```

**Erro esperado:**
```
Can't reach database server at db.yyvjzgxyxgalnnwcjfqh.supabase.co:5432
```

**Motivo:** Firewall do SENAI bloqueia conexão direta ao Supabase (porta 5432)

---

## 📁 Documentos Principais

1. **PLANO_RELATORIO_TESTES.md** ⭐ - Relatório completo para o PA
2. **RESUMO_FINAL_TESTES.md** - Resumo executivo
3. **SOLUCAO_ALTERNATIVA_TESTES.md** - Explicação sobre testes de integração

---

## 🎯 Para a Apresentação do PA

**Execute apenas:**
```bash
npm test
```

**Capturar screenshot mostrando:**
- ✅ 21 test suites passed
- ✅ 145 tests passed
- ✅ 100% aprovação

**Isso é suficiente!** 🎉
