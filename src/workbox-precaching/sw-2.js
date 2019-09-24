importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0-beta.0/workbox-sw.js');

workbox.setConfig({
  debug: true
});

workbox.precaching.precacheAndRoute([
  {url: '/', revision: '2'},
  'public/test-file.txt',
  'public/hello-world.5678.txt',
]);