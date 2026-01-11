const CACHE_ADI = "hesy-tools-v1"; // Versiyon güncelleyince burayı v2 yaparsın
const DOSYALAR = [
  "./",
  "./index.html",
  "./main.js",
  "./receteler.json",
  "./pedoguide.json",
  "./lathas.json",       // Eğer json kullanıyorsan
  "./herbst.json",       // Eğer json kullanıyorsan
  "./round-icon-new.png", // Logon
  "./manifest.json",
  "https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js",
  "https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js",
  "https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js",
  "https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" 
  // NOT: Font Awesome kullanıyorsan linkini buraya tam ekle
];

// 1. KURULUM (Dosyaları Önbelleğe Al)
self.addEventListener("install", (olay) => {
  olay.waitUntil(
    caches.open(CACHE_ADI).then((cache) => {
      console.log("Önbellek oluşturuluyor...");
      return cache.addAll(DOSYALAR);
    })
  );
});

// 2. AKTİF OLMA (Eski Önbellekleri Temizle)
self.addEventListener("activate", (olay) => {
  olay.waitUntil(
    caches.keys().then((cacheIsimleri) => {
      return Promise.all(
        cacheIsimleri.map((cache) => {
          if (cache !== CACHE_ADI) {
            console.log("Eski cache silindi:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. FETCH (İnternet Yoksa Cache'den Ver)
self.addEventListener("fetch", (olay) => {
  olay.respondWith(
    caches.match(olay.request).then((cevap) => {
      // Cache'de varsa onu döndür, yoksa internetten çek
      return cevap || fetch(olay.request).catch(() => {
          // Eğer internet de yoksa ve dosya cache'de yoksa (opsiyonel hata sayfası)
          // return caches.match("./offline.html"); 
      });
    })
  );
});