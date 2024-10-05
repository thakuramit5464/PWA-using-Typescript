const CACHE_NAME = "PWA using Typescript";
self.addEventListener("install", (event) => {
  event.waitUntil(async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll([
      "./assets/static-images/favicon.png",
      "./assets/static-images/icon.png",
      "./index.js",
      "./index.css",
      "index.html",
      "./manifest.json",
    ]);
  });
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      console.log(">>>>>>>>>>>.");
      client.postMessage({ type: "SW_INSTALLED" });
    });
  });
});

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
          console.log(error);
          // Optionally return a fallback response here
        }
      }
    })()
  );
});

// self.addEventListener("fetch", (event) => {
//   event.respondWith(async () => {
//     const cache = await caches.open(CACHE_NAME);
//     const cachedResponse = await cache.match(event.request);
//     if (cachedResponse) {
//       return cachedResponse;
//     } else {
//       try {
//         const fetchResponse = await fetch(event.request);
//         cache.put(event.request, fetchResponse.clone());
//         return fetchResponse;
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   })();
// });

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
