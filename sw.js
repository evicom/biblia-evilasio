// ══════════════════════════════════════════════════
// SERVICE WORKER — Bíblia Sagrada PWA
// ══════════════════════════════════════════════════

const CACHE_NAME = 'biblia-sagrada-v1';
const CACHE_OFFLINE = 'biblia-offline-v1';

// Arquivos essenciais para o app funcionar offline
const CORE_FILES = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap'
];

// ── INSTALL: pré-cacheia arquivos core ──
self.addEventListener('install', event => {
  console.log('[SW] Instalando v1...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CORE_FILES.map(url => new Request(url, { mode: 'no-cors' })))
        .catch(err => {
          console.warn('[SW] Alguns arquivos não cacheados:', err);
        });
    }).then(() => {
      console.log('[SW] Cache core pronto');
      return self.skipWaiting();
    })
  );
});

// ── ACTIVATE: limpa caches antigos ──
self.addEventListener('activate', event => {
  console.log('[SW] Ativando...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== CACHE_OFFLINE)
          .map(k => {
            console.log('[SW] Removendo cache antigo:', k);
            return caches.delete(k);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: Cache First para assets, Network First para HTML ──
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignora requisições não-GET e extensões de browser
  if (request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;

  // Estratégia: Network First para HTML principal
  if (request.mode === 'navigate' || url.pathname.endsWith('.html')) {
    event.respondWith(networkFirstThenCache(request));
    return;
  }

  // Estratégia: Cache First para fontes e assets estáticos
  if (
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    request.destination === 'image' ||
    request.destination === 'style' ||
    request.destination === 'script'
  ) {
    event.respondWith(cacheFirstThenNetwork(request));
    return;
  }

  // Padrão: Stale While Revalidate
  event.respondWith(staleWhileRevalidate(request));
});

// ── Estratégias de Cache ──

async function networkFirstThenCache(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    // Fallback para index.html se offline
    const fallback = await caches.match('./index.html');
    return fallback || new Response('App offline', { status: 503 });
  }
}

async function cacheFirstThenNetwork(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const networkResponse = await fetch(request, { mode: 'no-cors' });
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (err) {
    console.warn('[SW] Falha ao buscar:', request.url, err);
    return new Response('', { status: 408 });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const networkFetch = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);
  return cached || await networkFetch || new Response('', { status: 408 });
}

// ── Mensagens do App (ex: SKIP_WAITING) ──
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] Atualizando imediatamente...');
    self.skipWaiting();
  }
});
