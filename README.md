# ✝ Bíblia Sagrada Web

**App web progressivo (PWA) da Bíblia Sagrada em português — instalável em qualquer dispositivo.**

> Desenvolvido por **José Evilasio Marques**

---

## 📖 Versões disponíveis

| Sigla | Nome completo |
|-------|--------------|
| **ARC** | Almeida Revista e Corrigida (1898) |
| **ACF** | Almeida Corrigida Fiel |
| **ARA** | Almeida Revista e Atualizada (usa ACF como base) |
| **NVI** | Nova Versão Internacional |

---

## ✨ Funcionalidades

- 📖 **Leitura completa** — todos os 66 livros, todos os capítulos e versículos
- 🔍 **Busca** — pesquisa por palavras e frases em toda a Bíblia
- 🗝 **Chaves Bíblicas** — 16 temas com versículos de referência
- 📚 **Estudos Bíblicos** — 8 estudos temáticos aprofundados
- 📝 **Anotações** — adicione notas em qualquer versículo (salvo localmente)
- 🌅 **Versículo do Dia** — versículo diferente a cada dia
- 🔵 Palavras de **Deus em azul** · 🔴 Palavras de **Jesus em vermelho**
- 🌙 Modo **claro / escuro**
- 🔎 **Zoom** de texto (70% a 200%) sem perder responsividade
- 📲 **Instalável como app** (PWA) em Android, iOS e desktop
- ⚡ **Cache offline** — após primeiro acesso, funciona sem internet

---

## 🚀 Como usar via GitHub Pages

### 1. Fork este repositório
Clique em **Fork** no canto superior direito.

### 2. Ative o GitHub Pages
1. Vá em **Settings** → **Pages**
2. Em **Source**, selecione **Deploy from a branch**
3. Escolha a branch `main` e pasta `/ (root)`
4. Clique em **Save**

### 5. Acesse seu app
Após alguns minutos, seu app estará em:
```
https://SEU-USUARIO.github.io/biblia-sagrada/
```

### 6. Instale no celular
- **Android (Chrome):** toque no banner "Adicionar à tela inicial" ou menu ⋮ → "Instalar app"
- **iOS (Safari):** toque em Compartilhar → "Adicionar à Tela de Início"
- **Desktop (Chrome/Edge):** clique no ícone 📲 na barra de endereço

---

## 🛠 Estrutura do projeto

```
biblia-sagrada/
├── index.html          # App principal (HTML + CSS + JS em um único arquivo)
├── manifest.json       # Configuração PWA
├── sw.js               # Service Worker (cache offline)
├── icons/              # Ícones do app em vários tamanhos
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png
│   ├── icon-384.png
│   └── icon-512.png
└── README.md           # Este arquivo
```

---

## 📡 Fontes dos textos bíblicos

Os textos são carregados em tempo real de fontes abertas no GitHub:

- **ARC:** [MaatheusGois/bible](https://github.com/MaatheusGois/bible)
- **ACF / NVI:** [thiagobodruk/biblia](https://github.com/thiagobodruk/biblia)

Após o primeiro acesso, os textos ficam em cache pelo Service Worker e funcionam offline.

---

## 💾 Dados do usuário

As anotações são salvas no **localStorage** do navegador — ficam no dispositivo do usuário e não são enviadas a nenhum servidor.

---

## 📜 Licença

Os textos bíblicos utilizados (ARC, ACF, NVI) são de domínio público ou uso livre para fins não comerciais.  
O código deste app é livre para uso pessoal, ministerial e educacional.

---

*"A tua palavra é lâmpada para os meus pés e luz para o meu caminho." — Salmos 119:105*
