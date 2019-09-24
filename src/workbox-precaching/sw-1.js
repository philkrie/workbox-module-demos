importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0-beta.0/workbox-sw.js');

workbox.setConfig({
  debug: true
});

workbox.precaching.precacheAndRoute([
  {url: '/', revision: '1'},
  'public/test-file.txt',
  'public/hello-world.1234.txt',
]);