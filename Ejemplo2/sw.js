const CACHE_NAME = 'mi-cache'
const CACHE_VERSION = 'v1'

const filesToCache = [
  '/index.html', // Archivos HTML
  '/styles.css', // Archivos CSS
  '/images/icon512.png' // Imágenes
]

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(`${CACHE_NAME}-${CACHE_VERSION}`).then(function (cache) {
      return cache.addAll(filesToCache)
    })
  )
})

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== `${CACHE_NAME}-${CACHE_VERSION}`) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response
      }
      return fetch(event.request)
    })
  )
})
