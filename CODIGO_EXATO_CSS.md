# 🎯 CÓDIGO EXATO PARA COPIAR/COLAR

**Arquivo:** `src/styles/editar-perfil.css`
**Ação:** Substituir as seções abaixo

---

## 📍 SEÇÃO 1: Linhas 9-15 (Reset CSS)

### ❌ PROCURE POR ISSO (ANTES):
```css
.page-perfil-wrapper main *,
.page-gerenciamento-wrapper main * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
}
```

### ✅ SUBSTITUA POR ISSO (DEPOIS):
```css
/* ⚠️ ISOLAMENTO DE ESTILOS - Aplicado apenas ao container principal */
.page-perfil-wrapper,
.page-gerenciamento-wrapper {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Reset seletivo apenas para elementos que precisam */
.page-perfil-wrapper main,
.page-gerenciamento-wrapper main {
    margin: 0;
    padding: 0;
}
```

---

## 📍 SEÇÃO 2: Linhas 155-160 (Layout Content)

### ❌ PROCURE POR ISSO (ANTES):
```css
.layout-content {
    flex: 1;
    margin-left: clamp(240px, 17%, 300px);
    padding-bottom: 120px;
    transition: margin-left 0.3s ease;
}
```

### ✅ SUBSTITUA POR ISSO (DEPOIS):
```css
.layout-content {
    flex: 1;
    margin-left: clamp(240px, 17%, 300px);
    padding-bottom: 30px;
    transition: margin-left 0.3s ease;
}
```

---

## 📍 SEÇÃO 3: Linhas 579-595 (Footer)

### ❌ PROCURE POR ISSO (ANTES):
```css
footer {
    position: fixed;
    bottom: 0;
    left: clamp(240px, 17%, 300px);
    right: 0;
    width: auto;
    height: 95px;
    background-color: var(--footer);
    box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
    padding: 0 40px;
    z-index: 100;
    transition: left 0.3s ease;
}
```

### ✅ SUBSTITUA POR ISSO (DEPOIS):
```css
footer {
    margin-left: clamp(240px, 17%, 300px);
    margin-top: 40px;
    width: auto;
    height: 95px;
    background-color: var(--footer);
    box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
    padding: 0 40px;
    z-index: 10;
    transition: margin-left 0.3s ease;
}
```

---

## 📍 SEÇÃO 4: Linhas 600-611 (Mensagem de Feedback)

### ❌ PROCURE POR ISSO (ANTES):
```css
main > p:last-child {
    position: fixed;
    bottom: 120px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #4CAF50;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 16px;
    z-index: 1000;
}
```

### ✅ SUBSTITUA POR ISSO (DEPOIS):
```css
main > p:last-child {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #4CAF50;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 16px;
    z-index: 50;
}
```

---

## 📍 SEÇÃO 5: Linhas 616-638 (Media Query 1024px)

### ❌ PROCURE POR ISSO (ANTES):
```css
@media screen and (max-width: 1024px) {
    #aside-lateral {
        transform: translateX(-100%);
    }

    #aside-lateral.open {
        transform: translateX(0);
        box-shadow: 5px 0 20px rgba(0, 0, 0, 0.2);
    }

    .menu-toggle {
        display: flex;
    }

    .layout-content, footer {
        margin-left: 0;
        left: 0;
    }

    main {
        padding: 80px 30px 40px;
    }
}
```

### ✅ SUBSTITUA POR ISSO (DEPOIS):
```css
@media screen and (max-width: 1024px) {
    #aside-lateral {
        transform: translateX(-100%);
    }

    #aside-lateral.open {
        transform: translateX(0);
        box-shadow: 5px 0 20px rgba(0, 0, 0, 0.2);
    }

    .menu-toggle {
        display: flex;
    }

    .layout-content {
        margin-left: 0;
    }

    footer {
        margin-left: 0;
        margin-top: 20px;
    }

    main {
        padding: 80px 30px 40px;
    }
}
```

---

## 📍 SEÇÃO 6: Linhas 677-693 (Media Query 480px)

### ❌ PROCURE POR ISSO (ANTES):
```css
@media screen and (max-width: 480px) {
    footer {
        height: auto;
        flex-direction: column;
        padding: 15px;
        gap: 10px;
    }

    footer .btn {
        width: 100%;
        font-size: 18px;
    }

    .section-title {
        font-size: 20px;
    }
}
```

### ✅ SUBSTITUA POR ISSO (DEPOIS):
```css
@media screen and (max-width: 480px) {
    footer {
        height: auto;
        flex-direction: column;
        padding: 15px;
        gap: 10px;
        margin-left: 0;
        margin-top: 15px;
    }

    footer .btn {
        width: 100%;
        font-size: 18px;
    }

    .section-title {
        font-size: 20px;
    }
}
```

---

## 🎯 PASSO A PASSO

### 1. Abrir arquivo
```
c:\Users\stefano\Documents\GitHub\oasis-em-next\src\styles\editar-perfil.css
```

### 2. Para cada seção acima:
- Procurar pelo código ❌ ANTES
- Selecionar o bloco todo
- Substituir pelo código ✅ DEPOIS
- Verificar que ficou igual

### 3. Salvar (Ctrl+S)

### 4. Testar
```bash
npm run build
```

### 5. Verificar em browser
```
http://localhost:3000/perfil
```

---

## ✅ CHECKLIST PÓS-APLICAÇÃO

```
Seção 1 (Reset CSS):
  ❌ .page-perfil-wrapper main * deve desaparecer
  ✅ .page-perfil-wrapper deve estar sem selector main
  ✅ Novo bloco .page-perfil-wrapper main deve existir

Seção 2 (Layout Content):
  ✅ padding-bottom deve ser 30px (não 120px)

Seção 3 (Footer):
  ❌ position: fixed deve desaparecer
  ❌ bottom: 0 deve desaparecer
  ❌ left: clamp(...) deve desaparecer
  ✅ margin-left: clamp(...) deve existir
  ✅ margin-top: 40px deve existir
  ✅ z-index: 10 (era 100)
  ✅ transition: margin-left 0.3s ease (era left)

Seção 4 (Feedback Message):
  ✅ position: absolute (era fixed)
  ✅ bottom: 10px (era 120px)
  ✅ z-index: 50 (era 1000)

Seção 5 (Media 1024px):
  ❌ ".layout-content, footer" deve desaparecer
  ✅ ".layout-content" e "footer" devem ser separados
  ❌ left: 0 deve desaparecer
  ✅ margin-top: 20px deve existir em footer

Seção 6 (Media 480px):
  ✅ footer { margin-left: 0; } deve existir
  ✅ footer { margin-top: 15px; } deve existir
```

---

## 🚀 PRÓXIMO PASSO

Quer que eu:
1. **"Aplica as mudanças"** - Faço automaticamente
2. **"Já apliquei"** - Você já fez e quer testar
3. **"Explica mais uma seção"** - Detalha melhor

**Qual é?**
