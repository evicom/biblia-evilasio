# ✝ Bíblia Sagrada — App Web (PWA)

App web progressivo (PWA) com a **Bíblia Sagrada completa em português**. Funciona **100% offline** após o primeiro acesso, pode ser instalado como aplicativo no celular e sincroniza suas anotações na nuvem.

> **Criado por José Evilasio Marques** · © 2025
> 🔗 Disponível em: [https://evicom.github.io/biblia-evilasio/](https://evicom.github.io/biblia-evilasio/)

---

## 📖 Versões bíblicas incluídas

| Sigla | Versão |
|-------|--------|
| **ARC** | Almeida Revista e Corrigida |
| **ACF** | Almeida Corrigida Fiel |
| **NVI** | Nova Versão Internacional |
| **AA**  | Almeida Atualizada |
| **KJA** | King James Atualizada |

Os textos ficam na pasta `pt-br/` em arquivos `.json` (um por versão), o que torna o app totalmente offline e fácil de ampliar com novos idiomas ou versões.

---

## ✨ Funcionalidades

- 📜 **Leitura completa** do Antigo e Novo Testamento (separados no menu Navegar);
- 🔄 **Troca de versão** mantendo o livro e capítulo atuais;
- ◀▶ **Navegação** por capítulos no topo **e no fim** de cada capítulo;
- 🔑 **Chave Bíblica robusta**: digite `Jo 3:16`, `sl 23`, `1 Co 13:4` (aceita abreviações, com ou sem acento) e o app abre e destaca o versículo;
- 🔍 **Busca** por palavras em todos os livros;
- 📝 **Anotações por versículo** com barra dourada de destaque, salvas no aparelho **e na nuvem (JSONBin)**;
- 🔊 **Leitura em voz alta** (TTS) com player, velocidade ajustável, escolha de voz e versículo destacado;
- 🌙 **Modo dark elegante**, com palavras de **Deus em azul** 💙 e de **Jesus em verde limão** 💚;
- 🔠 **Ajuste de tamanho de fonte**;
- 📤 **Compartilhamento** (WhatsApp, Instagram, Telegram, Facebook, X e copiar), inclusive de **texto selecionado**;
- 📲 **Instalável como app** (PWA) no Android, iPhone e PC;
- ✈️ **100% offline** via Service Worker (inclusive as Bíblias `.json`);
- 🔆 **Tela sempre ativa** durante a leitura (Wake Lock API).

---

## 🚀 Como publicar no GitHub Pages

1. Faça upload de **todos os arquivos** para um repositório no GitHub;
2. Vá em **Settings → Pages**;
3. Em **Source**, selecione a branch `main` e a pasta `/ (root)`;
4. Clique em **Save** e aguarde alguns minutos;
5. Seu app estará no ar em: `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`

---


---

## ⚠️ AVISO IMPORTANTE — LEIA ANTES DE MODIFICAR!

Este projeto é **LIVRE para uso, estudo e modificação**. 🎉

Porém, ao criar a sua própria cópia (fork), você **DEVE trocar a API da nuvem (JSONBin)** pelas suas próprias credenciais. A chave que está no código pertence ao criador **José Evilasio Marques** e as anotações salvas por ela vão para o banco **dele** — não use em sua versão!

### 🔑 Como criar a SUA nuvem de anotações (grátis):

1. Acesse [https://jsonbin.io](https://jsonbin.io) e crie uma conta gratuita;
2. Crie um novo **Bin** com o conteúdo inicial: `{ "notes": {} }`;
3. Copie o seu **Bin ID** e a sua **X-Master-Key** (API Keys);
4. Abra o `index.html` e localize estas linhas:

```javascript
const JSONBIN_BIN_ID = 'COLE_AQUI_O_SEU_BIN_ID';
const JSONBIN_MASTER_KEY = 'COLE_AQUI_A_SUA_CHAVE';



## 📁 Estrutura de arquivos
