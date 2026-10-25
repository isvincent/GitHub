/* 更新程式或靜態資源時請同步遞增 VERSION。 */
const VERSION = 'v1';
const PREFIX = 'github-toolbox-' + encodeURIComponent(self.registration.scope) + '-';
const CACHE = PREFIX + VERSION;
const FILES = ['./', './index.html', './responsive.css', './pwa.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './GitHub網址與內容.csv'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys
    .filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  const base = new URL(self.registration.scope);
  if (request.method !== 'GET' || url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) return;
  // 移除 CSV 時間戳記，避免每次重讀產生一份離線副本。
  const known = FILES.map(file => new URL(file, base).pathname);
  if (!known.includes(url.pathname)) return;
  url.search = '';
  const key = url.href;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const response = await fetch(request);
      if (response.ok) await cache.put(key, response.clone());
      return response;
    } catch (error) {
      const saved = await cache.match(key);
      if (saved) return saved;
      if (request.mode === 'navigate') {
        const home = await cache.match(new URL('./index.html', base).href);
        if (home) return home;
      }
      return Response.error();
    }
  })());
});
