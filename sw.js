const CACHE = 'flashcard-pintar-v2';
const ASSETS = [
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './sounds/meow.mp3',
  './sounds/woof.mp3',
  './sounds/moo.mp3',
  './sounds/cluck.mp3',
  './sounds/quack.mp3',
  './sounds/bleat.mp3',
  './sounds/neigh.mp3',
  './sounds/roar.mp3',
  './sounds/trumpet.mp3',
  './sounds/croak.mp3',
  './sounds/baa.mp3',
  './sounds/oink.mp3'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => cached))
  );
});
