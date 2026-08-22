/**
 * PixelSprint Core PWA & Network Monitor (Vite PWA Integration)
 * Handles Service Worker registration, offline detection (ERR_RETRO_OFFLINE), and PWA installation
 */

import { registerSW } from 'virtual:pwa-register';
import { BeforeInstallPromptEvent } from '../types';
import { audioSynth } from './audio';
import { realtimeSync } from './sync';
import { i18n } from '../i18n';

class PWAInstaller {
  private deferredPrompt: BeforeInstallPromptEvent | null = null;
  private btnInstallToolbar: HTMLElement | null = null;
  private btnInstallStartMenu: HTMLElement | null = null;
  private networkStatusBadge: HTMLElement | null = null;

  public init(): void {
    this.btnInstallToolbar = document.getElementById('btn-install-pwa');
    this.btnInstallStartMenu = document.getElementById('sm-install');
    this.networkStatusBadge = document.getElementById('network-status-badge');

    this.registerServiceWorker();
    this.listenForInstallPrompt();
    this.listenForNetworkStatus();
  }

  private registerServiceWorker(): void {
    registerSW({
      immediate: true,
      onNeedRefresh() {
        console.log('[Vite PWA] New content available, refresh needed.');
      },
      onOfflineReady() {
        console.log('[Vite PWA] PixelSprint ready to work offline!');
      }
    });
  }

  private listenForNetworkStatus(): void {
    const updateStatus = () => {
      const isOnline = navigator.onLine;
      if (this.networkStatusBadge) {
        if (isOnline) {
          this.networkStatusBadge.textContent = i18n.t('badgeOnline');
          this.networkStatusBadge.className = 'network-badge online';
          this.networkStatusBadge.title = 'Bağlantı aktif. Gerçek zamanlı senkronizasyon çalışıyor.';
        } else {
          this.networkStatusBadge.textContent = i18n.t('badgeOffline');
          this.networkStatusBadge.className = 'network-badge offline';
          this.networkStatusBadge.title =
            'İnternet bağlantısı kesildi! Kartlar çevrimdışı localStorage üzerinde saklanacak.';
        }
      }
    };

    i18n.subscribe(() => updateStatus());

    window.addEventListener('online', () => {
      updateStatus();
      audioSynth.playSuccess();
      // Re-trigger sync when coming back online
      realtimeSync.broadcast('REQUEST_SYNC');
    });

    window.addEventListener('offline', () => {
      updateStatus();
      audioSynth.playDelete();
    });

    updateStatus();
  }

  private listenForInstallPrompt(): void {
    const btnTriggerPwaInstall = document.getElementById('btn-trigger-pwa-install');

    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      this.deferredPrompt = e as BeforeInstallPromptEvent;

      if (this.btnInstallToolbar) this.btnInstallToolbar.style.display = 'inline-flex';
      if (this.btnInstallStartMenu) this.btnInstallStartMenu.style.display = 'flex';
      if (btnTriggerPwaInstall) btnTriggerPwaInstall.style.display = 'inline-flex';
    });

    const triggerInstall = (): void => {
      if (!this.deferredPrompt) return;
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
          console.log('[PixelSprint] PWA installed successfully');
        }
        this.deferredPrompt = null;
        if (this.btnInstallToolbar) this.btnInstallToolbar.style.display = 'none';
        if (this.btnInstallStartMenu) this.btnInstallStartMenu.style.display = 'none';
        if (btnTriggerPwaInstall) btnTriggerPwaInstall.style.display = 'none';
      });
    };

    if (this.btnInstallToolbar) {
      this.btnInstallToolbar.addEventListener('click', triggerInstall);
    }
    if (this.btnInstallStartMenu) {
      this.btnInstallStartMenu.addEventListener('click', triggerInstall);
    }
    if (btnTriggerPwaInstall) {
      btnTriggerPwaInstall.addEventListener('click', triggerInstall);
    }
  }
}

export const pwaInstaller = new PWAInstaller();
