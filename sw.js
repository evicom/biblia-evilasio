// =============================================
// Service Worker — Bíblia Sagrada PWA
// Estratégia: Cache-First (100% offline)
// =============================================

const CACHE_NAME = 'biblia-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-192.png',
  './icons/icon-384.png',
  './icons/icon-512.png',
  './icons/icon-maskable.png'
];

// ── INSTALL: pré-cacheia todos os assets ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Pré-cacheando assets...');
      return cache.addAll(ASSETS);
    }).then(() => {
      console.log('[SW] Instalado com sucesso!');
      return self.skipWaiting();
    })
  );
});

// ── ACTIVATE: limpa caches antigos ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => {
            console.log('[SW] Removendo cache antigo:', k);
            return caches.delete(k);
          })
      )
    ).then(() => {
      console.log('[SW] Ativado — assumindo controle');
      return self.clients.claim();
    })
  );
});

// ── FETCH: Cache-First → fallback offline ──
self.addEventListener('fetch', event => {
  // Ignora requisições não-GET
  if (event.request.method !== 'GET') return;

  // Ignora extensões do Chrome e URLs externas
  const url = new URL(event.request.url);
  if (url.protocol === 'chrome-extension:') return;

  // Tenta servir do cache; se não houver, busca na rede e cacheia
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request)
        .then(response => {
          // Cacheia apenas respostas válidas e do mesmo origin ou fonts
          if (
            response.ok &&
            (url.origin === location.origin ||
             url.hostname.includes('fonts.googleapis.com') ||
             url.hostname.includes('fonts.gstatic.com'))
          ) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Fallback: se for navegação, retorna index.html do cache
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
    })
  );
});

// ── MENSAGENS: forçar atualização via postMessage ──
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
