/**
 * PixelSprint Taskbar & Start Menu Component (TypeScript)
 */

import { store } from '../core/store.js';
import { audioSynth } from '../core/audio.js';

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
      if (confirm('Tüm retro kartlarını silmek istediğinize emin misiniz? Bu işlem geri alınamaz!')) {
        audioSynth.playDelete();
        store.clearAll();
      }
    };

    if (this.btnClearBoard) this.btnClearBoard.addEventListener('click', handleClear);
    if (this.smClear) this.smClear.addEventListener('click', handleClear);

    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
    this.updateSoundUI();
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
      this.soundIndicator.title = isEnabled ? 'Ses Açık' : 'Ses Kapalı';
    }
  }

  private updateClock(): void {
    if (this.taskbarClock) {
      const now = new Date();
      this.taskbarClock.textContent = now.toLocaleTimeString('tr-TR');
    }
  }
}
