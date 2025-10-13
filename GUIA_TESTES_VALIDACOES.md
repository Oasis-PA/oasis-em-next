# 📋 Guia Completo - Como Testar as Validações Zod

Este guia explica como testar todas as validações Zod implementadas no projeto.

---

## 🚀 Métodos de Teste

### **1. Testes Automatizados (Jest)**

Execute todos os testes de validação:

```bash
npm run test:validations
```

Ou execute todos os testes do projeto:

```bash
npm test
```

Para executar com cobertura de código:

```bash
npm run test:coverage
```

---

### **2. Script Interativo Manual**

Execute o script que testa vários cenários automaticamente:

```bash
npm run test:validations:manual
```

Este script irá:
- ✅ Testar dados válidos
- ❌ Testar dados inválidos
- 📊 Mostrar os erros de validação de forma clara

**Nota:** Você precisa instalar o `tsx` primeiro (se ainda não tiver):

```bash
npm install -D tsx
```

---

### **3. Teste Manual no Console do Node**

Abra o console Node.js interativo:

```bash
node
```

Depois execute:

```javascript
// Importar as validações
import { cadastroSchema, loginSchema } from './src/lib/validations/index.js';

// Testar cadastro válido
try {
  const resultado = cadastroSchema.parse({
    nome: 'João Silva',
    email: 'joao@exemplo.com',
    senha: 'SenhaForte123!',
  });
  console.log('✅ Sucesso:', resultado);
} catch (erro) {
  console.log('❌ Erro:', erro.errors);
}

// Testar cadastro inválido
try {
  const resultado = cadastroSchema.parse({
    nome: 'J',
    email: 'emailinvalido',
    senha: 'fraca',
  });
} catch (erro) {
  console.log('❌ Erros encontrados:', erro.errors);
}
```

---

### **4. Teste nas APIs (Postman/Thunder Client/Insomnia)**

#### **A) Testar API de Cadastro**

**Endpoint:** `POST http://localhost:3000/api/usuarios/cadastro`

**Body (JSON) - Válido:**
```json
{
  "nome": "Maria Silva",
  "email": "maria@exemplo.com",
  "senha": "SenhaForte123!"
}
```

**Resposta esperada:** ✅ Status 200 + dados do usuário criado

**Body (JSON) - Inválido:**
```json
{
  "nome": "M",
  "email": "emailinvalido",
  "senha": "123"
}
```

**Resposta esperada:** ❌ Status 400 + lista de erros

---

#### **B) Testar API de Login**

**Endpoint:** `POST http://localhost:3000/api/usuarios/login`

**Body (JSON) - Válido:**
```json
{
  "email": "maria@exemplo.com",
  "senha": "SenhaForte123!"
}
```

**Resposta esperada:** ✅ Status 200 + token JWT

**Body (JSON) - Inválido:**
```json
{
  "email": "emailinvalido",
  "senha": ""
}
```

**Resposta esperada:** ❌ Status 400 + erros de validação

---

#### **C) Testar API de Check Email**

**Endpoint:** `POST http://localhost:3000/api/usuarios/check-email`

**Body (JSON):**
```json
{
  "email": "maria@exemplo.com"
}
```

**Resposta esperada:**
- Se email já existe: ❌ Status 400
- Se email disponível: ✅ Status 200

---

### **5. Teste no Frontend**

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Acesse as páginas:
   - **Cadastro Etapa 1:** http://localhost:3000/cadastro
   - **Cadastro Etapa 2:** http://localhost:3000/cadastro2
   - **Login:** http://localhost:3000/login

3. Tente enviar formulários com:
   - ✅ Dados válidos
   - ❌ Nome muito curto (ex: "A")
   - ❌ Email inválido (ex: "teste")
   - ❌ Senha fraca (ex: "123456")
   - ❌ Senhas que não conferem

4. Observe as mensagens de erro em tempo real

---

## 📝 Casos de Teste Importantes

### **Validações de Nome**
- ✅ Aceita: "João Silva", "María José"
- ❌ Rejeita: "J", "João123", nome com mais de 100 caracteres

### **Validações de Email**
- ✅ Aceita: "usuario@exemplo.com"
- ❌ Rejeita: "emailinvalido", "@exemplo.com", "usuario@"

### **Validações de Senha**
- ✅ Aceita: "SenhaForte123!", "Complexa@2025"
- ❌ Rejeita:
  - Menos de 8 caracteres
  - Sem letra maiúscula
  - Sem letra minúscula
  - Sem número
  - Sem caractere especial

### **Validações de Telefone**
- ✅ Aceita: "(11) 98765-4321", "(21) 3456-7890"
- ❌ Rejeita: "11987654321", "123456"

### **Validações de Produto**
- ✅ Aceita: preço positivo, nome com 2+ caracteres
- ❌ Rejeita: preço negativo, nome muito curto

### **Validações de Avaliação**
- ✅ Aceita: nota de 1 a 5 (inteiro)
- ❌ Rejeita: nota 0, nota 6, nota decimal (4.5)

---

## 🐛 Debugando Erros de Validação

Se você encontrar um erro de validação, o formato da resposta será:

```json
{
  "message": "Dados inválidos",
  "errors": [
    {
      "campo": "nome",
      "mensagem": "Nome deve ter no mínimo 2 caracteres"
    },
    {
      "campo": "email",
      "mensagem": "Email inválido"
    }
  ]
}
```

Use essa informação para corrigir os dados de entrada.

---

## 📂 Arquivos de Teste

- **Testes automatizados:**
  - `tests/validations/usuario.test.ts`
  - `tests/validations/produto.test.ts`
  - `tests/validations/avaliacao.test.ts`

- **Script manual:**
  - `scripts/test-validations.ts`

- **Validações:**
  - `src/lib/validations/usuario.ts`
  - `src/lib/validations/produto.ts`
  - `src/lib/validations/avaliacao.ts`

---

## 💡 Dicas

1. **Sempre valide no frontend E backend** - Nunca confie apenas na validação do frontend
2. **Use TypeScript** - Os tipos gerados pelos schemas ajudam muito
3. **Mensagens claras** - Todas as mensagens de erro estão em português
4. **Testes regulares** - Execute `npm run test:validations` antes de fazer commits

---

## 🔗 Recursos Úteis

- [Documentação oficial do Zod](https://zod.dev/)
- [Exemplos de validação no projeto](./tests/validations/)

---

**Pronto! Agora você sabe como testar todas as validações do projeto.** 🎉
