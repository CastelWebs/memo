const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './index2.html',
  './index.css',
  './index.js',
  './assets/Logo-Castel.png',
  './assets/blue.jpeg',
  './assets/escuadra-frame.jpeg',
  './assets/iron-bronze.jpeg',
  './assets/kubic.jpeg',
  './assets/montego.jpeg',
  './assets/pearl.jpeg',
  './assets/roots.jpeg',
  './assets/santander.jpeg',
  './assets/sublime.jpeg',
  './assets/turquesa.jpeg'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar las solicitudes de la red
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'POST') { // Evitar interceptar solicitudes POST
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
