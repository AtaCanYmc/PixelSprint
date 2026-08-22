import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'icons/*.png'],
      manifest: {
        name: 'PixelSprint - Retro Sprint Retrospective',
        short_name: 'PixelSprint',
        description: "90'lar Windows 95 ve Terminal temalı, anonim Sprint Sonu Retrospektif panosu.",
        theme_color: '#000080',
        background_color: '#008080',
        display: 'standalone',
        orientation: 'any',
        categories: ['developer', 'productivity', 'utilities'],
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ]
});
