const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then((res) => {
            const resClone = res.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, resClone);
              });
            return res;
          })
          .catch(() => {
            return new Response(JSON.stringify({ score: 0 }), {
              headers: { 'Content-Type': 'application/json' }
            });
          });
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (!cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName);
        }
      })
    ))
  );
});