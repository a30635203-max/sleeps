const CACHE_NAME = 'sleep-calc-v1';
const assets = [
  './',
  './index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// تثبيت الخدمة وحفظ الملفات في الكاش
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('جاري حفظ الملفات في الذاكرة...');
      return cache.addAll(assets);
    })
  );
});

// تفعيل الخدمة
self.addEventListener('activate', event => {
  console.log('الخدمة تعمل الآن');
});

// استرجاع الملفات من الذاكرة عند انقطاع الإنترنت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});