# ✝ Bíblia Sagrada

App web progressivo (PWA) com a Bíblia Sagrada completa. Funciona 100% offline após o primeiro acesso.

**Por José Evilasio Marques**

---

## 📖 Versões incluídas

- **ARC** — Almeida Revista e Corrigida
- **ACF** — Almeida Corrigida Fiel
- **NVI** — Nova Versão Internacional
- **AA** — Almeida Atualizada
- **KJA** — King James Atualizada

## ✨ Funcionalidades

- Leitura completa do Antigo e Novo Testamento
- Busca por palavras em todos os livros
- Anotações por versículo (salvas localmente)
- Modo claro e escuro
- Ajuste de tamanho de fonte
- Versículo do dia
- Estudos bíblicos temáticos
- Compartilhamento de versículos (WhatsApp, Telegram, etc.)
- Instalável como app no celular (PWA)
- Funciona offline

## 🚀 Como publicar no GitHub Pages

1. Faça upload de todos os arquivos para um repositório no GitHub
2. Vá em **Settings → Pages**
3. Em **Source**, selecione `main` e a pasta `/ (root)`
4. Clique em **Save**
5. Aguarde alguns minutos — o app estará disponível em:
   `(https://evicom.github.io/biblia-evilasio/)`

## 📁 Estrutura de arquivos

```
/
├── index.html       ← App principal
├── manifest.json    ← Configuração PWA
├── sw.js            ← Service Worker (offline)
├── README.md        ← Este arquivo
└── icons/           ← Ícones do app (adicione os seus)
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png
    └── icon-512.png
```

> **Importante:** A pasta `icons/` precisa conter os ícones do app. Se não tiver, o app funciona normalmente, mas não terá ícone personalizado ao instalar no celular.

## 📱 Instalar no celular

- **Android (Chrome):** Abra o site → menu (⋮) → "Adicionar à tela inicial"
- **iPhone (Safari):** Abra o site → botão compartilhar → "Adicionar à tela de início"

## 🛠 Tecnologias

- HTML5, CSS3, JavaScript puro
- PWA (Progressive Web App)
- Service Worker para cache offline
- LocalStorage para anotações

---

*Que a Palavra de Deus ilumine o seu caminho.*
