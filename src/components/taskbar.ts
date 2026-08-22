/**
 * PixelSprint Taskbar & Start Menu Component (TypeScript)
 * Handles Taskbar clock, Start Menu, sound toggle, and i18n localization
 */

import { store } from '../core/store';
import { audioSynth } from '../core/audio';
import { i18n } from '../i18n';
import { Language } from '../types';

export class TaskbarComponent {
  private startBtn: HTMLElement | null;
  private startMenu: HTMLElement | null;
  private taskbarClock: HTMLElement | null;
  private soundIndicator: HTMLElement | null;
  private btnSoundToggle: HTMLElement | null;
  private smHome: HTMLElement | null;
  private smSound: HTMLElement | null;
  private btnClearBoard: HTMLElement | null;
  private smClear: HTMLElement | null;

  constructor() {
    this.startBtn = document.getElementById('start-btn');
    this.startMenu = document.getElementById('start-menu');
    this.taskbarClock = document.getElementById('taskbar-clock');
    this.soundIndicator = document.getElementById('sound-indicator');
    this.btnSoundToggle = document.getElementById('btn-sound-toggle');
    this.smHome = document.getElementById('sm-home');
    this.smSound = document.getElementById('sm-sound');
    this.btnClearBoard = document.getElementById('btn-clear-board');
    this.smClear = document.getElementById('sm-clear');
  }

  public init(): void {
    i18n.subscribe(() => this.updateLocalizedText());

    if (this.startBtn && this.startMenu) {
      this.startBtn.addEventListener('click', (e: MouseEvent) => {
        e.stopPropagation();
        audioSynth.playClick();
        this.startMenu?.classList.toggle('hidden');
        this.startBtn?.classList.toggle('pressed');
      });

      document.addEventListener('click', (e: MouseEvent) => {
        const target = e.target as Node | null;
        if (this.startMenu && target && !this.startMenu.contains(target) && target !== this.startBtn) {
          this.startMenu.classList.add('hidden');
          this.startBtn?.classList.remove('pressed');
        }
      });
    }

    // Language Buttons in Start Menu
    const langBtns = document.querySelectorAll('.start-menu-lang-buttons .lang-btn');
    langBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        audioSynth.playClick();
        const lang = (btn as HTMLElement).dataset['lang'] as Language;
        if (lang) {
          i18n.setLanguage(lang);
        }
      });
    });

    if (this.smHome) {
      this.smHome.addEventListener('click', () => {
        audioSynth.playClick();
        if (this.startMenu) this.startMenu.classList.add('hidden');
        if (this.startBtn) this.startBtn.classList.remove('pressed');
        store.exitSession();
      });
    }

    if (this.btnSoundToggle) {
      this.btnSoundToggle.addEventListener('click', () => this.handleSoundToggle());
    }
    if (this.smSound) {
      this.smSound.addEventListener('click', () => {
        this.handleSoundToggle();
        if (this.startMenu) this.startMenu.classList.add('hidden');
      });
    }

    const handleClear = (): void => {
      if (this.startMenu) this.startMenu.classList.add('hidden');
      if (confirm(i18n.t('clearAllConfirm'))) {
        audioSynth.playDelete();
        store.clearAll();
      }
    };

    if (this.btnClearBoard) this.btnClearBoard.addEventListener('click', handleClear);
    if (this.smClear) this.smClear.addEventListener('click', handleClear);

    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
    this.updateSoundUI();
    this.updateLocalizedText();
  }

  private updateLocalizedText(): void {
    if (this.startBtn) {
      this.startBtn.innerHTML = `<span>💾</span> <strong>${i18n.t('startBtnText')}</strong>`;
    }
    if (this.smHome) {
      this.smHome.innerHTML = `<span>🏠</span> <strong>${i18n.t('startMenuHome')}</strong>`;
    }
    const smAdd = document.getElementById('sm-add-card');
    const smShare = document.getElementById('sm-share-qr');
    const smExport = document.getElementById('sm-export');
    const smInstall = document.getElementById('sm-install');
    const smAbout = document.getElementById('sm-about');

    if (smAdd) smAdd.innerHTML = `<span>➕</span> ${i18n.t('startMenuAddCard')}`;
    if (smShare) smShare.innerHTML = `<span>📱</span> ${i18n.t('startMenuShareQr')}`;
    if (smExport) smExport.innerHTML = `<span>💾</span> ${i18n.t('startMenuExport')}`;
    if (smInstall) smInstall.innerHTML = `<span>📲</span> ${i18n.t('startMenuInstall')}`;
    if (smAbout) smAbout.innerHTML = `<span>❓</span> ${i18n.t('startMenuAbout')}`;
    if (this.smClear) this.smClear.innerHTML = `<span>🗑️</span> ${i18n.t('startMenuClear')}`;

    // Highlight active language button in Start Menu
    const currentLang = i18n.getLanguage();
    const langBtns = document.querySelectorAll('.start-menu-lang-buttons .lang-btn');
    langBtns.forEach((btn) => {
      const btnLang = (btn as HTMLElement).dataset['lang'];
      if (btnLang === currentLang) {
        btn.classList.add('pressed');
      } else {
        btn.classList.remove('pressed');
      }
    });
  }

  private handleSoundToggle(): void {
    audioSynth.toggleSound();
    this.updateSoundUI();
  }

  private updateSoundUI(): void {
    const isEnabled = audioSynth.enabled;
    if (this.btnSoundToggle) this.btnSoundToggle.textContent = isEnabled ? '🔊' : '🔇';
    if (this.soundIndicator) {
      this.soundIndicator.textContent = isEnabled ? '🔊' : '🔇';
      this.soundIndicator.title = isEnabled ? i18n.t('soundToggleTitle') : 'Mute';
    }
  }

  private updateClock(): void {
    if (this.taskbarClock) {
      const now = new Date();
      const localeMap = { tr: 'tr-TR', en: 'en-US', fr: 'fr-FR' };
      this.taskbarClock.textContent = now.toLocaleTimeString(localeMap[i18n.getLanguage()]);
    }
  }
}
