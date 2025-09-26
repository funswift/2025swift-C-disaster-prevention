import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist, NetworkFirst, CacheFirst } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: WorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: false,
  runtimeCaching: [
    ...defaultCache,
    {
      matcher: ({ request }) => request.url.match(/^https?:\/\/.*/i),
      handler: new NetworkFirst({
        cacheName: "offlineCache",
        plugins: [{
          handlerDidError: async () => {
            return caches.match("/offline");
          },
        }],
      }),
    },
    {
      matcher: ({ request }) => request.url.match(/\.(png|jpg|jpeg|svg|gif|webp|ico)$/i),
      handler: new CacheFirst({
        cacheName: "images",
        plugins: [],
      }),
    },
  ],
  fallbacks: {
    entries: [
      {
        url: "/offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

serwist.addEventListeners();