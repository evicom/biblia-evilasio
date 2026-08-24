// Service Worker - Bíblia Evilasio (José Evilasio Marques)
// v12: HTML sempre atualizado (network-first) + Bíblias .json em cache (offline total)
const CACHE_VERSION = 'v1';
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

// Bíblias em JSON (cacheadas na instalação para funcionar 100% offline)
const BIBLE_JSONS = [
  './pt-br/arc.json',
  './pt-br/acf.json',
  './pt-br/nvi.json',
  './pt-br/aa.json',
  './pt-br/bc.json'
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

// Fetch
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Navegações (HTML): REDE PRIMEIRO → sempre pega a versão nova;
  // usa o cache apenas se estiver offline
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Demais arquivos (JSONs, ícones, manifest): cache primeiro,
  // atualiza em segundo plano (stale-while-revalidate)
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
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });

      return cachedResponse || networkFetch;
    })
  );
});
