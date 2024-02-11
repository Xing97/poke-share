import react from '@vitejs/plugin-react-swc';
import million from 'million/compiler';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from "vite-plugin-pwa";
import { cacheAbility, cacheItem, cacheMove, cachePokemon, cachePokemonSpecies } from './src/services/cache';

const POKEAPI_CACHE_OPTIONS = {
  cacheName: 'pokeapi-cache',
  expiration: {
    maxEntries: 1000,
    maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
  },
  cacheableResponse: {
    statuses: [0, 200]
  }
}

export default defineConfig({
  plugins: [
    million.vite({ auto: true, mute: true }),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'apple-touch-icon.png',
        'physical.png',
        'special.png',
        'status.png'
      ],
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/pokeapi\.co\/api\/v2\/pokemon\/.*/i,
            handler: 'CacheFirst',
            options: {
              ...POKEAPI_CACHE_OPTIONS,
              plugins: [
                {
                  cacheWillUpdate: cachePokemon
                }
              ]
            }
          },
          {
            urlPattern: /^https:\/\/pokeapi\.co\/api\/v2\/pokemon-species\/.*/i,
            handler: 'CacheFirst',
            options: {
              ...POKEAPI_CACHE_OPTIONS,
              plugins: [
                {
                  cacheWillUpdate: cachePokemonSpecies
                }
              ]
            }
          },
          {
            urlPattern: /^https:\/\/pokeapi\.co\/api\/v2\/item\/.*/i,
            handler: 'CacheFirst',
            options: {
              ...POKEAPI_CACHE_OPTIONS,
              plugins: [
                {
                  cacheWillUpdate: cacheItem
                }
              ]
            }
          },
          {
            urlPattern: /^https:\/\/pokeapi\.co\/api\/v2\/ability\/.*/i,
            handler: 'CacheFirst',
            options: {
              ...POKEAPI_CACHE_OPTIONS,
              plugins: [
                {
                  cacheWillUpdate: cacheAbility
                }
              ]
            }
          },
          {
            urlPattern: /^https:\/\/pokeapi\.co\/api\/v2\/move\/.*/i,
            handler: 'CacheFirst',
            options: {
              ...POKEAPI_CACHE_OPTIONS,
              plugins: [
                {
                  cacheWillUpdate: cacheMove
                }
              ]
            }
          }
        ]
      },
      manifest: {
        name: "Pokezi",
        short_name: "Pokezi",
        description: "Web to share Pokemon sets with anyone",
        theme_color: "#334155",
        background_color: "#0f172a",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ],
      }
    })
  ],
  build: {
    target: 'ESNext'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
