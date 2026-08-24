// Service Worker - Bíblia Sagrada
// Estratégia: cache-first com atualização em segundo plano (stale-while-revalidate)
const CACHE_VERSION = 'v8'; // ⬅️ aumente a versão a cada atualização para forçar novo cache
const CACHE_NAME = `biblia-evilasio-${CACHE_VERSION}`;

// Arquivos essenciais do app
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

// Bíblias em JSON (cacheadas na instalação para 100% offline)
const BIBLE_JSONS = [
  './pt-br/arc.json',
  './pt-br/acf.json',
  './pt-br/nvi.json',
  './pt-br/aa.json',
  './pt-br/kja.json'
];

// Instalação: cache inicial
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(PRECACHE_ASSETS);
      // allSettled: se um JSON falhar, não quebra a instalação
      await Promise.allSettled(BIBLE_JSONS.map((url) => cache.add(url)));
      return self.skipWaiting();
    })
  );
});

// Ativação: remove caches antigos
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

// Fetch: cache primeiro, atualiza em segundo plano
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const networkFetch = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Offline sem cache: retorna a página principal
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });

      return cachedResponse || networkFetch;
    })
  );
});
