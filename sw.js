importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0-beta.0/workbox-sw.js');

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.setConfig({
  debug: true
});

workbox.precaching.precacheAndRoute([
  'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css'
]);

// Demonstrates using default cache
workbox.routing.registerRoute(
  /.*\.(?:js)/g,
  new workbox.strategies.NetworkFirst()
);

// Demonstrates a custom cache name for a route.
workbox.routing.registerRoute(
  /.*\.(?:png|jpg|jpeg|svg|gif)/g,
  workbox.strategies.cacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 3
      })
    ]
  })
);