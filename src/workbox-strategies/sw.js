importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0-beta.0/workbox-sw.js');

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.setConfig({
  debug: true
});

//To avoid async issues, we load strategies before we call it in the event listener
const {strategies} = workbox;


//Needs a Request object, which I understand is provided by event.request. What am i missing?
self.addEventListener('fetch', (event) => {
  console.log(new URL(event.request.url).pathname);
  switch (new URL(event.request.url).pathname) {
    case '/public/cache-only-empty-cache.txt':
      const cacheOnlyEmpty = new workbox.strategies.CacheOnly();
      event.respondWith(cacheOnlyEmpty.handle(event));
      break;
    case '/public/cache-only-populated-cache':
      const cacheOnlyPopulated = new workbox.strategies.CacheOnly();
      event.respondWith(cacheOnlyPopulated.handle(event));
      break;
    case '/public/cache-first.txt':
      const cacheFirst = new workbox.strategies.CacheFirst();
      event.respondWith(cacheFirst.handle(event));
      break;
    case '/public/network-only.txt':
      const networkOnly = new workbox.strategies.NetworkOnly();
      event.respondWith(networkOnly.handle(event));
      break;
    case '/public/network-first.txt':
      const networkFirst = new workbox.strategies.NetworkFirst();
      event.respondWith(networkFirst.handle(event));
      break;
    case '/public/network-first-404.txt':
      const networkFirstInvalid = new workbox.strategies.NetworkFirst();
      event.respondWith(networkFirstInvalid.handle(event));
      break;
    case '/public/stale-while-revalidate.txt':
      const staleWhileRevalidate = new workbox.strategies.StaleWhileRevalidate();
      event.respondWith(staleWhileRevalidate.handle(event));
      break;
  }
});

//This immediately deploys the service worker w/o requiring a refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();

//Populate the cache to illustrate cache-only-populated-cache route
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(workbox.core.cacheNames.runtime)
    .then((cache) => {
      return cache.put(
        new Request('/public/cache-only-populated-cache'),
        new Response('Hello from the populated cache.')
      );
    })
  );
});