// ═══════════════════════════════════════════════
// SERVICE WORKER — Bíblia Sagrada PWA
// José Evilasio Marques — v2.0.0
// ═══════════════════════════════════════════════

const CACHE_NAME = 'biblia-v2.0.0';
const BIBLE_CACHE = 'biblia-textos-v1';

// Arquivos do app para cache imediato
const APP_SHELL = [
  '/biblia-sagrada/',
  '/biblia-sagrada/index.html',
  '/biblia-sagrada/manifest.json',
  '/biblia-sagrada/icons/icon-192.png',
  '/biblia-sagrada/icons/icon-512.png',
];

// ── INSTALL: cacheia o shell do app ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Cacheando app shell...');
      return cache.addAll(APP_SHELL);
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: limpa caches antigos ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME && k !== BIBLE_CACHE)
            .map(k => { console.log('[SW] Removendo cache antigo:', k); return caches.delete(k); })
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: estratégia híbrida ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Textos bíblicos (GitHub raw): Cache First com fallback de rede
  if (url.hostname === 'raw.githubusercontent.com') {
    event.respondWith(
      caches.open(BIBLE_CACHE).then(async cache => {
        const cached = await cache.match(event.request);
        if (cached) {
          console.log('[SW] Texto bíblico do cache:', url.pathname.split('/').pop());
          return cached;
        }
        try {
          const response = await fetch(event.request);
          if (response.ok) {
            cache.put(event.request, response.clone());
            console.log('[SW] Texto bíblico baixado e cacheado:', url.pathname.split('/').pop());
          }
          return response;
        } catch (e) {
          console.warn('[SW] Sem conexão para:', url.pathname);
          return new Response(JSON.stringify({ error: 'Offline — texto não disponível no cache' }), {
            headers: { 'Content-Type': 'application/json' }
          });
        }
      })
    );
    return;
  }

  // App shell: Network First com fallback de cache
  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }
});

// ── MENSAGENS do app ──
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
  if (event.data === 'CLEAR_BIBLE_CACHE') {
    caches.delete(BIBLE_CACHE).then(() => {
      event.ports[0].postMessage({ ok: true });
    });
  }
});
