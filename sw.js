// Service Worker - Bíblia Evicom
// v9: aviso de atualização funcionando (sem skipWaiting automático) + offline
const CACHE_VERSION = 'v9';
const CACHE_NAME = `biblia-evilasio-${CACHE_VERSION}`;

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

const BIBLE_JSONS = [
  './pt-br/arc.json',
  './pt-br/acf.json',
  './pt-br/nvi.json',
  './pt-br/aa.json',
  './pt-br/bc.json'
];

// Recebe o comando "atualizar agora" vindo do app
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(PRECACHE_ASSETS);
      await Promise.allSettled(BIBLE_JSONS.map((url) => cache.add(url)));
      // ⚠️ SEM skipWaiting() aqui: o SW novo fica "waiting" e o app
      // mostra a barra "🔄 Nova versão disponível!" ao usuário
      return true;
    })
  );
});

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

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Navegações (HTML): REDE primeiro → sempre busca a versão nova
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

  // Demais arquivos: cache primeiro, atualiza em segundo plano
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const networkFetch = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          if (event.request.mode === 'navigate') return caches.match('./index.html');
        });
      return cachedResponse || networkFetch;
    })
  );
});
