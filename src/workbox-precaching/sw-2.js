importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0-beta.0/workbox-sw.js');

workbox.setConfig({
  debug: true
});


workbox.precaching.precache([
  {url: '/demo/workbox-precaching', revision: '2'},
  'test-file.txt',
  'hello-world.5678.txt',
]);