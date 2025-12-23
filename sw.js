self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});

const CACHE_NAME = 'offline-cache-v1';
const OFFLINE_URL = 'index.html';

const urlsToCache = [
    '/',
    '/index.html',
    'assets/babi-144.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() =>
            caches.match(event.request).then(response => response || caches.match('/offline.html'))
        )
    );
});
