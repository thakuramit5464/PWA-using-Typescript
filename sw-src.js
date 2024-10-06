var version = 1.1;
const CACHE_NAME = "PWA using Typescript";

// Service Worker Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "./assets/static-images/icon512_maskable.png",
        "./assets/static-images/icon512_rounded.png",
        "./assets/static-images/favicon.png",
        "./assets/static-images/icon.png",
        "./index.js",
        "./index.css",
        "index.html",
        "./manifest.json",
      ]);
    })
  );

  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({ type: "SW_INSTALLED" });
    });
  });
});

// Service Worker Fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      } else {
        try {
          const fetchResponse = await fetch(event.request);
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        } catch (error) {
          console.error("Fetch failed; returning fallback response.", error);
          return caches.match("offline.html"); // Fallback to offline page.
        }
      }
    })()
  );
});

// Service Worker Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});
