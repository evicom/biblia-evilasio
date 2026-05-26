# 📖 Bíblia Sagrada — José Evilasio Marques

Bíblia Sagrada completa como **Progressive Web App (PWA)** — instalável em qualquer dispositivo, funciona 100% offline.

## ✨ Funcionalidades

- 📚 Múltiplas versões: ARC, ACF, NVI, AA, KJA
- 🔍 Busca por palavras e referências
- 📝 Anotações por versículo (salvas localmente)
- 🎓 Estudos bíblicos temáticos
- 🔑 Palavras-chave com referências cruzadas
- 🌙 Modo escuro / claro
- 🔤 Controle de zoom de fonte
- 📤 Compartilhamento de versículos
- 📴 **100% offline** após primeira visita

## 📲 Como Instalar (PWA)

### Android (Chrome/Edge/Samsung Browser)
1. Acesse o site no navegador com o link: https://evicom.github.io/biblia-evilasio/
2. Toque no banner **"Instalar aplicativo"** que aparece automaticamente  
   _ou_ vá em Menu (⋮) → **"Adicionar à tela inicial"**
3. Confirme a instalação

### iPhone/iPad (Safari)
1. Abra o site no **Safari**
2. Toque no botão **Compartilhar** (□↑)
3. Role e toque em **"Adicionar à Tela de Início"**
4. Confirme tocando em **"Adicionar"**

### Windows/Mac (Chrome/Edge)
1. Acesse o site
2. Clique no ícone **⊕ Instalar** na barra de endereço  
   _ou_ vá em Menu → **"Instalar Bíblia Sagrada"**

## 🚀 Deploy no GitHub Pages

Este repositório usa **GitHub Actions** para deploy automático.

### Passo a passo

1. **Faça fork** ou clone este repositório
2. Suba para o seu GitHub:
   ```bash
   git init
   git add .
   git commit -m "Bíblia Sagrada PWA"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/biblia-sagrada.git
   git push -u origin main
   ```
3. No GitHub, vá em **Settings → Pages**
4. Em **Source**, selecione **GitHub Actions**
5. O deploy ocorre automaticamente a cada `push` na branch `main`
6. Acesse em: `https://SEU_USUARIO.github.io/biblia-sagrada/`

### ⚠️ Ícones necessários

Coloque os ícones na pasta `icons/` com os nomes:

| Arquivo | Tamanho |
|---|---|
| `icon-72.png` | 72×72 px |
| `icon-96.png` | 96×96 px |
| `icon-128.png` | 128×128 px |
| `icon-144.png` | 144×144 px |
| `icon-152.png` | 152×152 px |
| `icon-192.png` | 192×192 px |
| `icon-512.png` | 512×512 px |

> Dica: use o site [realfavicongenerator.net](https://realfavicongenerator.net) para gerar todos os tamanhos de uma vez.

## 📁 Estrutura do Projeto

```
biblia-sagrada/
├── index.html              # App principal (single-page)
├── manifest.json           # Configuração PWA
├── sw.js                   # Service Worker (cache offline)
├── .gitignore
├── README.md
├── icons/                  # Ícones do app (adicionar manualmente)
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png
│   └── icon-512.png
└── .github/
    └── workflows/
        └── deploy.yml      # CI/CD automático para GitHub Pages
```

## 🛠 Tecnologias

- **HTML5 / CSS3 / JavaScript** puro — sem frameworks, sem dependências
- **PWA** com Service Worker e Web App Manifest
- **Cache First / Network First** strategy para offline robusto
- **localStorage** para anotações persistentes
- Fontes: **Lora** (serif) + **DM Sans** (sans-serif) via Google Fonts

## 📄 Licença

Projeto desenvolvido por **José Evilasio Marques**.  
Os textos bíblicos seguem os direitos de cada versão utilizada.
