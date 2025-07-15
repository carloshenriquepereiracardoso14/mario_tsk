
self.addEventListener('install', function(event) {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open('mario-task-cache').then(function(cache) {
      return cache.addAll([
        './',
        './index.html',
        './src/css/style.css',
        './src/js/js.js',
        './manifest.webmanifest'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
