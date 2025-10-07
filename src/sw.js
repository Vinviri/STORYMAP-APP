/* eslint-disable no-restricted-globals */

import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';

// Precaching App Shell
precacheAndRoute(self.__WB_MANIFEST);

// Caching untuk API (Strategi NetworkFirst)
registerRoute(
  ({ url }) => url.href.startsWith('https://story-api.dicoding.dev/v1/stories'),
  new NetworkFirst({
    cacheName: 'story-api-cache',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
  }),
);

// Caching untuk Gambar dari API (Strategi CacheFirst)
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'story-image-cache',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Hari
      }),
    ],
  }),
);

// Logika Push Notification dengan perbaikan try...catch
self.addEventListener('push', (event) => {
  console.log('Push event received.');
  
  let data;
  // --- PERBAIKAN DIMULAI DI SINI ---
  try {
    // Coba parsing sebagai JSON
    data = event.data.json();
  } catch (e) {
    // Jika gagal, anggap sebagai teks biasa
    data = {
      title: 'Notifikasi Baru',
      options: {
        body: event.data.text(),
      },
    };
  }
  // --- PERBAIKAN SELESAI ---

  const { title } = data;
  const { options } = data;
  
  const notificationOptions = {
    body: options.body,
    icon: '/icons/icon-192x192.png',
    vibrate: [200, 100, 200],
    data: {
      url: options.data ? options.data.url : '/',
    },
    actions: [
      {
        action: 'open-story-action',
        title: 'Lihat',
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(title, notificationOptions),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data.url;
  event.waitUntil(clients.openWindow(urlToOpen));
});