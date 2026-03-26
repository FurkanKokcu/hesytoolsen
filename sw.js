const CACHE_ADI = "hesy-tools-v3";

const DOSYALAR = [
  "./",
"./index.html",
"./main.js",
"./receteler.json",
"./pedoguide.json",
"./lathas.json",
"./herbst.json",
"./round-icon-new.png",
"./round-icon.png",
"./who.png",
"./williams.png",
"./mainlogo-Photoroom.png",
"./manifest.json",
"./flatly.css",
"./darkly.css",
// Kullanılan CDN linkleri (Çevrimdışı çalışabilmesi için)
"https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js",
"https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js",
"https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js",
"https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js",
"https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js",
"https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js"
];

// 1. KURULUM (Dosyaları Önbelleğe Al)
self.addEventListener("install", (olay) => {
  self.skipWaiting(); // Yeni versiyonu beklemeden hemen kur
  olay.waitUntil(
    caches.open(CACHE_ADI).then((cache) => {
      console.log("Önbellek oluşturuluyor...");
      return cache.addAll(DOSYALAR);
    })
  );
});

// 2. AKTİF OLMA (Eski Önbellekleri Temizle)
self.addEventListener("activate", (olay) => {
  olay.waitUntil(self.clients.claim()); // Sayfayı yenilemeye gerek kalmadan SW'yi devreye sok
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

// 3. FETCH (Stale-While-Revalidate Stratejisi)
self.addEventListener("fetch", (olay) => {
  // Sadece GET isteklerini ve HTTP/HTTPS protokollerini yakala (Eklenti hatalarını önler)
  if (olay.request.method !== 'GET' || !olay.request.url.startsWith('http')) return;

  olay.respondWith(
    caches.match(olay.request).then((cevap) => {
      // Arka planda dosyaların güncel halini internetten çek
      const internettenCek = fetch(olay.request).then((agCevabi) => {
        // Eğer başarılı bir şekilde çekildiyse cache'i güncelle
        if (agCevabi && agCevabi.status === 200) {
          const kopyalananCevap = agCevabi.clone();
          caches.open(CACHE_ADI).then((cache) => {
            cache.put(olay.request, kopyalananCevap);
          });
        }
        return agCevabi;
      }).catch(() => {
        console.log("İnternet yok, çevrimdışı veriler kullanılıyor.");
      });

      // Varsa ANINDA cache'deki dosyayı göster, yoksa internetten geleni bekle
      // Bu sayede uygulama saniyeden kısa sürede açılır ama arkadan veriler hep güncel kalır.
      return cevap || internettenCek;
    })
  );
});
