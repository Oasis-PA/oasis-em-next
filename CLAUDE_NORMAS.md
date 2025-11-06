# Normas para Assistência do Claude Code

## Documentação Obrigatória

### 1. Atualização do README.md
- **SEMPRE** atualizar o README.md principal ao adicionar novas funcionalidades
- Incluir instruções de uso, dependências e exemplos
- Manter seções organizadas e atualizadas

### 2. Atualização do COMECE_AQUI.md
- Atualizar quando houver mudanças significativas no projeto
- Incluir novos fluxos de trabalho ou processos
- Documentar novas configurações de ambiente

### 3. Arquivo O_QUE_FALTA.md
- **SEMPRE** atualizar após completar tarefas listadas
- Adicionar novas tarefas identificadas durante desenvolvimento
- Manter prioridades atualizadas

## Boas Práticas de Código

### Git & Commits
- Sempre verificar `git status` antes de commits
- Seguir padrão de mensagens de commit do projeto
- Nunca commitar sem revisar mudanças

### Testes
- Executar testes após mudanças significativas
- Corrigir testes quebrados antes de prosseguir
- Documentar novos testes implementados

### Banco de Dados
- Sempre verificar conexão antes de migrations
- Documentar mudanças no schema
- Usar migrations Prisma para alterações

## Arquivos a Manter Limpos

### Na Raiz
- **Manter**: README.md, COMECE_AQUI.md, O_QUE_FALTA.md
- **Evitar**: Múltiplos arquivos de relatório, documentação fragmentada

### Na Pasta docs/
- Manter apenas documentação arquitetural relevante
- Consolidar informações duplicadas

## Fluxo de Trabalho

1. **Antes de Começar**
   - Ler COMECE_AQUI.md
   - Verificar O_QUE_FALTA.md
   - Verificar git status

2. **Durante Desenvolvimento**
   - Usar TodoWrite para planejar tarefas
   - Executar testes frequentemente
   - Documentar decisões importantes

3. **Ao Finalizar**
   - Atualizar README.md se necessário
   - Atualizar O_QUE_FALTA.md
   - Atualizar COMECE_AQUI.md se houver mudanças estruturais
   - Commit com mensagem descritiva

## Prioridades

1. Funcionalidade > Documentação excessiva
2. Código limpo > Código rápido
3. Testes > Features sem testes
4. Documentação útil > Documentação volumosa
