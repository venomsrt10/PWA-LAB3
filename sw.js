self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
          'index.html',
          'index.js',
          'icone-192x192.png',
          'icone-256x256.png',
          'icone-384x384.png',
          'icone-512x512.png',
          'img/911.jpg',
          'img/FerrariBR20.jpg',
          'img/urus.jpg',
          'bootstrap-5.1.3-dist/css/bootstrap.min.css',
          'icons-1.7.2/font/bootstrap-icons.css',
          'bootstrap-5.1.3-dist/js/bootstrap.bundle.min.js',
          'page2_hs.html'
        
      ]);
    })
  );
});


self.addEventListener('fetch', function (event) {
  console.log("Fetching ..." + event.request.url);
  event.respondWith(ol(event.request).catch(() => PageHorsLigne()));
});


function ol(request) {
  return fromCache(request).catch(() => fetch(request));
};

function fromCache(request) {
  return caches.open('v1').then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function PageHorsLigne() {
  return caches.match("./page2_hs.html");
}


this.addEventListener('sync', function (event) {
  console.log("received: " + event);
  if (event.tag == 'NotifBackInternet') {
      console.log("Internet Works");
      event.waitUntil(envoyerNotification());
  }
});


function envoyerNotification() {
  if (Notification.permission === 'granted') {
      var options = {
          body: '',
          requireInteraction: true
      };

      self.registration.showNotification('Le site est en ligne!!', options);
  } else {
      console.log("Site en ligne. Rafraichissez la page.");
  }

}