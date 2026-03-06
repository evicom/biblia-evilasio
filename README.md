# ✝ Bíblia Sagrada — PWA Offline

Bíblia Sagrada completa, 100% offline, instalável em qualquer dispositivo.  
**Versões incluídas:** ARC · ACF · NVI · AA · KJA

---

## 🚀 Publicar no GitHub Pages (passo a passo)

### 1. Criar o repositório

1. Acesse [github.com](https://github.com) e faça login
2. Clique em **"New repository"** (botão verde no canto superior direito)
3. Preencha:
   - **Repository name:** `biblia-sagrada` (ou o nome que preferir)
   - **Visibility:** Public *(obrigatório para GitHub Pages gratuito)*
   - NÃO marque "Add a README file"
4. Clique em **"Create repository"**

---

### 2. Enviar os arquivos

Você pode usar o **GitHub Desktop** (mais fácil) ou o terminal.

#### Opção A — GitHub Desktop (recomendado para iniciantes)

1. Baixe o [GitHub Desktop](https://desktop.github.com/)
2. Faça login com sua conta GitHub
3. Clique em **File → Add Local Repository**
4. Selecione a pasta `biblia-pwa` que você baixou
5. Clique em **"Publish repository"**
6. Escolha o repositório criado e clique em **"Publish"**

#### Opção B — Terminal (Git)

```bash
# Dentro da pasta biblia-pwa:
git init
git add .
git commit -m "✝ Bíblia Sagrada PWA — versão inicial"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/biblia-sagrada.git
git push -u origin main
```

> Substitua `SEU_USUARIO` pelo seu usuário do GitHub.

---

### 3. Ativar o GitHub Pages

1. No repositório, clique em **Settings** (⚙️ aba superior)
2. No menu lateral, clique em **Pages**
3. Em **"Source"**, selecione: **GitHub Actions**
4. Pronto! O deploy acontece automaticamente a cada `push` na branch `main`

> O primeiro deploy leva cerca de **1–2 minutos**.  
> Após isso, seu app estará em:  
> `https://SEU_USUARIO.github.io/biblia-sagrada/`

---

## 📲 Instalar como app (PWA)

### Android (Chrome / Samsung Internet)
1. Abra o link do app no Chrome
2. Toque no menu ⋮ → **"Adicionar à tela inicial"**
3. Confirme — o ícone aparece na sua tela inicial

### iPhone / iPad (Safari)
1. Abra o link no **Safari** (obrigatório no iOS)
2. Toque no botão **Compartilhar** (□↑)
3. Role para baixo → **"Adicionar à Tela de Início"**
4. Toque em **"Adicionar"**

### Desktop — Chrome / Edge
1. Abra o link no Chrome ou Edge
2. Na barra de endereços, clique no ícone de **instalar** (⊕ ou 💻)
3. Clique em **"Instalar"**

### Desktop — Firefox
- Firefox desktop não suporta instalação de PWA nativamente
- O app funciona normalmente como página web offline

---

## 📁 Estrutura de arquivos

```
biblia-pwa/
├── index.html          ← App completo (19 MB, todas as versões embutidas)
├── manifest.json       ← Configuração PWA
├── sw.js               ← Service Worker (cache offline)
├── .gitignore
├── .github/
│   └── workflows/
│       └── deploy.yml  ← Deploy automático GitHub Pages
└── icons/
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png
    ├── icon-384.png
    ├── icon-512.png
    ├── icon-maskable.png
    ├── splash-640x1136.png
    ├── splash-750x1334.png
    ├── splash-828x1792.png
    ├── splash-1125x2436.png
    └── splash-1242x2688.png
```

---

## ✨ Funcionalidades

- 📖 **5 versões bíblicas** completas (ARC, ACF, NVI, AA, KJA)
- 🔍 **Busca** em toda a Bíblia
- 📝 **Anotações** por versículo (salvas localmente)
- 🗝 **Chaves bíblicas** por tema
- 📚 **Estudos** bíblicos integrados
- 🌙 **Modo escuro / claro**
- 🔠 **Zoom** de fonte ajustável
- 📲 **Instalável** como app nativo (PWA)
- ✈️ **100% offline** — funciona sem internet após a primeira visita

---

## 👤 Autor

**José Evilasio Marques** — © 2025 ✝
