self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/styles.css',
          '/script.js',
          "/alarm.mp3",
          "/background.jpg",
          "/co2Info.html",
          "/infos.html",
          "/sleepSettings.html",
          "/statistics.html",
          "/temperaturInfo.html",
          "/manifest.json",
          "/sw.js",
          '/icons/icon-192x192.png',
          '/icons/icon-512x512.png'
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
  