// Сгенерировано tools/build-web.js — не править вручную.
const CACHE = 'victorina-534cad9717ca';
const FILES = [
  "./",
  "./_expo/static/js/web/index-b6bed1c1afb634be69cd8e7a38f63ea4.js",
  "./apple-touch-icon.png",
  "./assets/assets/sounds/correct.d3f0e4f8f4c407293a17ae3b20a99e9b.wav",
  "./assets/assets/sounds/select.79a2c021488aa4f984ec703ec9afed2a.wav",
  "./assets/assets/sounds/tap.96c1821c25a5e6fba23a0158f8300f57.wav",
  "./assets/assets/sounds/tick.8d9ff2d80f7dd996485c8c127f1b5375.wav",
  "./assets/assets/sounds/win.a9d8b18aa486f30901964b5dd0dca31e.wav",
  "./assets/assets/sounds/wrong.ad86117fa8fd0af82fdf3b83700aebc0.wav",
  "./assets/node_modules/@expo-google-fonts/nunito/600SemiBold/Nunito_600SemiBold.b1364260246b29fd9393a1a071f3af61.ttf",
  "./assets/node_modules/@expo-google-fonts/nunito/800ExtraBold/Nunito_800ExtraBold.2b1bb82750274fc2d1043bf3891cb531.ttf",
  "./assets/node_modules/@expo-google-fonts/nunito/900Black/Nunito_900Black.3ffae19d12dc67269f5cdd8d7a0aaeaf.ttf",
  "./assets/node_modules/@expo-google-fonts/russo-one/400Regular/RussoOne_400Regular.8a511841065ce7bd13b845eeea880d6e.ttf",
  "./favicon.ico",
  "./icon-192.png",
  "./icon-512.png",
  "./index.html",
  "./manifest.json",
  "./metadata.json"
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(FILES.map((url) => new Request(url, { cache: 'reload' }))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('victorina-') && key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  // Страница: всегда отдаём сохранённую index.html — игра открывается и без сети.
  if (request.mode === 'navigate') {
    event.respondWith(caches.match('./index.html').then((hit) => hit || fetch(request)));
    return;
  }

  // Остальное: сначала из сохранённого, иначе из сети (и запоминаем на будущее).
  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then((hit) => {
      if (hit) return hit;
      return fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    }),
  );
});
