/**
 * PixelSprint Share Component (TypeScript)
 * Generates interactive QR Code and share link for Retro Sessions with i18n support
 */

import QRCode from 'qrcode';
import { store } from '../core/store';
import { audioSynth } from '../core/audio';
import { i18n } from '../i18n';

export class ShareComponent {
  private modalShareQr: HTMLElement | null;
  private qrCanvas: HTMLCanvasElement | null;
  private shareUrlInput: HTMLInputElement | null;
  private shareSessionIdLabel: HTMLElement | null;
  private btnOpenShare: HTMLElement | null;
  private smShare: HTMLElement | null;
  private btnCopyShareUrl: HTMLElement | null;
  private startMenu: HTMLElement | null;

  constructor() {
    this.modalShareQr = document.getElementById('modal-share-qr');
    this.qrCanvas = document.getElementById('qr-code-canvas') as HTMLCanvasElement | null;
    this.shareUrlInput = document.getElementById('share-url-input') as HTMLInputElement | null;
    this.shareSessionIdLabel = document.getElementById('share-session-id-label');
    this.btnOpenShare = document.getElementById('btn-share-link');
    this.smShare = document.getElementById('sm-share-qr');
    this.btnCopyShareUrl = document.getElementById('btn-copy-share-url');
    this.startMenu = document.getElementById('start-menu');
  }

  public init(): void {
    i18n.subscribe(() => this.updateLocalizedText());

    if (this.btnOpenShare) {
      this.btnOpenShare.addEventListener('click', () => this.showShareModal());
    }
    if (this.smShare) {
      this.smShare.addEventListener('click', () => this.showShareModal());
    }

    if (this.btnCopyShareUrl && this.shareUrlInput) {
      this.btnCopyShareUrl.addEventListener('click', () => {
        if (!this.shareUrlInput) return;
        this.shareUrlInput.select();
        navigator.clipboard.writeText(this.shareUrlInput.value).then(() => {
          audioSynth.playSuccess();
          alert(i18n.t('copyLinkSuccess'));
        });
      });
    }

    this.updateLocalizedText();
  }

  private updateLocalizedText(): void {
    if (this.btnOpenShare) {
      this.btnOpenShare.innerHTML = `<span>📱</span> <strong>${i18n.t('btnShareQr')}</strong>`;
    }
    if (this.btnCopyShareUrl) {
      this.btnCopyShareUrl.textContent = i18n.t('btnCopy');
    }
  }

  public showShareModal(): void {
    const activeSession = store.getActiveSession();
    if (!activeSession) return;

    audioSynth.playClick();

    const currentUrl = window.location.href;

    if (this.shareUrlInput) {
      this.shareUrlInput.value = currentUrl;
    }

    if (this.shareSessionIdLabel) {
      this.shareSessionIdLabel.textContent = `Session ID: ${activeSession.id}`;
    }

    if (this.qrCanvas) {
      QRCode.toCanvas(
        this.qrCanvas,
        currentUrl,
        {
          width: 220,
          margin: 2,
          color: {
            dark: '#000080',
            light: '#FFFFFF'
          }
        },
        (error) => {
          if (error) console.error('[PixelSprint] QR Code generation failed:', error);
        }
      );
    }

    if (this.startMenu) this.startMenu.classList.add('hidden');
    if (this.modalShareQr) this.modalShareQr.classList.remove('hidden');
  }
}
