/**
 * PixelSprint Core PWA Manager (Vite PWA Integration)
 */

import { registerSW } from 'virtual:pwa-register';
import { BeforeInstallPromptEvent } from '../types/index.js';

class PWAInstaller {
  private deferredPrompt: BeforeInstallPromptEvent | null = null;
  private btnInstallToolbar: HTMLElement | null = null;
  private btnInstallStartMenu: HTMLElement | null = null;

  public init(): void {
    this.btnInstallToolbar = document.getElementById('btn-install-pwa');
    this.btnInstallStartMenu = document.getElementById('sm-install');

    this.registerServiceWorker();
    this.listenForInstallPrompt();
  }

  private registerServiceWorker(): void {
    // Vite PWA automatic service worker registration
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

  private listenForInstallPrompt(): void {
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      this.deferredPrompt = e as BeforeInstallPromptEvent;

      if (this.btnInstallToolbar) this.btnInstallToolbar.style.display = 'inline-flex';
      if (this.btnInstallStartMenu) this.btnInstallStartMenu.style.display = 'flex';
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
      });
    };

    if (this.btnInstallToolbar) {
      this.btnInstallToolbar.addEventListener('click', triggerInstall);
    }
    if (this.btnInstallStartMenu) {
      this.btnInstallStartMenu.addEventListener('click', triggerInstall);
    }
  }
}

export const pwaInstaller = new PWAInstaller();
