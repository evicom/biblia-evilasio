// Service Worker - Bíblia Sagrada (José Evilasio Marques)
// Estratégia: cache-first para assets estáticos, com fallback offline.

const CACHE_VERSION = 'v3';
const CACHE_NAME = `biblia-evilasio-${CACHE_VERSION}`;

// Lista de arquivos essenciais para o app funcionar 100% offline.
// Ajuste os caminhos abaixo caso seus arquivos estejam em pastas diferentes.
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Instalação: faz o cache inicial dos arquivos essenciais
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Ativação: remove caches antigos de versões anteriores
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('biblia-evilasio-') && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: estratégia "cache first, fallback to network"
// e atualiza o cache em segundo plano (stale-while-revalidate)
self.addEventListener('fetch', (event) => {
  // Apenas requisições GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const networkFetch = fetch(event.request)
        .then((networkResponse) => {
          // Atualiza o cache com a versão mais recente
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Se offline e não há cache, tenta retornar a página principal
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });

      // Retorna o cache imediatamente se existir, senão espera a rede
      return cachedResponse || networkFetch;
    })
  );
});
