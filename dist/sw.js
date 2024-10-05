var version = 2;
const CACHE_NAME = "PWA using Typescript";
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((e) =>
        e.addAll([
          "./assets/static-images/favicon.png",
          "./assets/static-images/icon.png",
          "./index.js",
          "./index.css",
          "index.html",
          "./manifest.json",
        ])
      )
  ),
    self.clients.matchAll().then((e) => {
      e.forEach((e) => {
        e.postMessage({ type: "SW_INSTALLED" });
      });
    });
}),
  self.addEventListener("fetch", (e) => {
    e.respondWith(
      (async () => {
        const t = await caches.open(CACHE_NAME),
          s = await t.match(e.request);
        if (s) return s;
        try {
          const s = await fetch(e.request);
          return t.put(e.request, s.clone()), s;
        } catch (e) {
          return (
            console.error("Fetch failed; returning fallback response.", e),
            caches.match("offline.html")
          );
        }
      })()
    );
  }),
  self.addEventListener("activate", (e) => {
    e.waitUntil(
      caches.keys().then((e) =>
        Promise.all(
          e.map((e) => {
            if (e !== CACHE_NAME) return caches.delete(e);
          })
        )
      )
    );
  });
