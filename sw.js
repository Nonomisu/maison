// Service worker de Maison : notifications push, et copie de l'appli sur l'appareil pour l'ouvrir sans réseau (en magasin).
const CODE = 'maison-code', FICHIERS = 'maison-fichiers';
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(FICHIERS).then((c) => c.addAll(['./', 'index.html', 'manifest.webmanifest', 'icon-192.png'])).catch(() => {}).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

const delai = (ms) => new Promise((_, rej) => setTimeout(() => rej(new Error('lent')), ms));
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // la page : réseau d'abord (4 s max), sinon la copie
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try { const r = await Promise.race([fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' }), delai(4000)]);   // toujours la dernière version publiée if (r.ok) (await caches.open(FICHIERS)).put('index.html', r.clone()); return r; }
      catch (err) { return (await caches.match('index.html')) || (await caches.match('./')) || Response.error(); }
    })());
    return;
  }
  const local = url.origin === self.location.origin;
  const externe = /^(www\.gstatic\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(url.hostname);
  if (!local && !externe) return;                                  // base de données, connexion, météo : jamais en copie
  // code versionné (?v=…) et images : la copie d'abord ; le reste : réseau d'abord
  const fige = externe || url.searchParams.has('v') || url.pathname.includes('/a/') || /\.(png|svg|webp|jpg|mp3|ogg)$/.test(url.pathname);
  e.respondWith((async () => {
    const cache = await caches.open(url.searchParams.has('v') ? CODE : FICHIERS);
    if (fige) { const hit = await cache.match(req); if (hit) return hit; }
    try {
      const r = await fetch(req);
      if (r.ok || r.type === 'opaque') {
        await cache.put(req, r.clone());
        // une seule version de chaque fichier de code
        if (url.searchParams.has('v')) for (const k of await cache.keys()) { const u = new URL(k.url); if (u.pathname === url.pathname && u.search !== url.search) cache.delete(k); }
      }
      return r;
    } catch (err) {
      const hit = await cache.match(req, { ignoreSearch: !fige }); if (hit) return hit;
      throw err;
    }
  })());
});

// Notification envoyée par le service du VPS : { title, body, tag, url }
self.addEventListener('push', (e) => {
  let d = {}; try { d = e.data ? e.data.json() : {}; } catch { d = { body: e.data && e.data.text() }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Maison', {
    body: d.body || '', tag: d.tag, icon: 'icon-192.png', badge: 'icon-192.png', data: { url: d.url || './' },
  }));
});

// Toucher la notification ouvre l'appli.
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || './', self.registration.scope).href;
  e.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const w of wins) { try { if ('focus' in w) return w.focus(); } catch (err) { /* rien */ } }
    return self.clients.openWindow(url);
  })());
});
