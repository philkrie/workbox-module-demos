importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0-beta.0/workbox-sw.js');

workbox.setConfig({
  debug: true
});


workbox.precaching.precache([
  {url: '/public', revision: '1'},
  'test-file.txt',
  'hello-world.1234.txt',
]);