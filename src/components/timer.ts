/**
 * PixelSprint Timer Component (TypeScript)
 * Handles Retro Timer UI, live countdowns, host controls (presets, pause, resume, extend, reset),
 * and participant status indicators with 100% i18n support.
 */

import { store } from '../core/store';
import { audioSynth } from '../core/audio';
import { i18n } from '../i18n';

export class TimerComponent {
  private modalTimer: HTMLElement | null;
  private btnOpenTimer: HTMLElement | null;
  private timerDisplayText: HTMLElement | null;
  private timerModalClock: HTMLElement | null;
  private timerModalStatus: HTMLElement | null;
  private timerHostControls: HTMLElement | null;

  private btnPause: HTMLElement | null;
  private btnResume: HTMLElement | null;
  private btnExtend2m: HTMLElement | null;
  private btnExtend5m: HTMLElement | null;
  private btnReset: HTMLElement | null;

  constructor() {
    this.modalTimer = document.getElementById('modal-timer');
    this.btnOpenTimer = document.getElementById('btn-open-timer');
    this.timerDisplayText = document.getElementById('timer-display-text');
    this.timerModalClock = document.getElementById('timer-modal-clock');
    this.timerModalStatus = document.getElementById('timer-modal-status');
    this.timerHostControls = document.getElementById('timer-host-controls');

    this.btnPause = document.getElementById('btn-timer-pause');
    this.btnResume = document.getElementById('btn-timer-resume');
    this.btnExtend2m = document.getElementById('btn-timer-extend-2m');
    this.btnExtend5m = document.getElementById('btn-timer-extend-5m');
    this.btnReset = document.getElementById('btn-timer-reset');
  }

  public init(): void {
    i18n.subscribe(() => this.updateUI());
    store.subscribe(() => this.updateUI());

    if (this.btnOpenTimer) {
      this.btnOpenTimer.addEventListener('click', () => this.openTimerModal());
    }

    // Preset duration buttons
    document.querySelectorAll('.btn-timer-preset').forEach((btn) => {
      btn.addEventListener('click', () => {
        audioSynth.playClick();
        const minStr = (btn as HTMLElement).dataset['min'];
        const minutes = parseInt(minStr || '5', 10);
        store.setTimer(minutes);
      });
    });

    if (this.btnPause) {
      this.btnPause.addEventListener('click', () => {
        audioSynth.playClick();
        store.pauseTimer();
      });
    }

    if (this.btnResume) {
      this.btnResume.addEventListener('click', () => {
        audioSynth.playClick();
        store.resumeTimer();
      });
    }

    if (this.btnExtend2m) {
      this.btnExtend2m.addEventListener('click', () => {
        audioSynth.playClick();
        store.extendTimer(2);
      });
    }

    if (this.btnExtend5m) {
      this.btnExtend5m.addEventListener('click', () => {
        audioSynth.playClick();
        store.extendTimer(5);
      });
    }

    if (this.btnReset) {
      this.btnReset.addEventListener('click', () => {
        audioSynth.playDelete();
        store.resetTimer();
      });
    }

    this.updateUI();
  }

  public openTimerModal(): void {
    audioSynth.playClick();
    if (this.modalTimer) {
      this.modalTimer.classList.remove('hidden');
    }
  }

  private formatTime(totalSeconds: number): string {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const mStr = mins.toString().padStart(2, '0');
    const sStr = secs.toString().padStart(2, '0');
    return `${mStr}:${sStr}`;
  }

  public updateUI(): void {
    const timerState = store.getTimerState();
    const isHost = store.isCurrentSessionHost();
    const showLabels = store.isShowButtonLabels();

    if (this.btnOpenTimer) {
      this.btnOpenTimer.title = i18n.t('timerTitle');
    }

    if (this.timerHostControls) {
      this.timerHostControls.style.display = isHost ? 'flex' : 'none';
    }

    // Update preset duration button texts for current language
    document.querySelectorAll('.btn-timer-preset').forEach((btn) => {
      const minStr = (btn as HTMLElement).dataset['min'];
      const min = parseInt(minStr || '5', 10);
      if (min === 3) btn.textContent = i18n.t('timerPreset3m');
      else if (min === 5) btn.textContent = i18n.t('timerPreset5m');
      else if (min === 10) btn.textContent = i18n.t('timerPreset10m');
      else if (min === 15) btn.textContent = i18n.t('timerPreset15m');
    });

    if (!timerState) {
      if (this.timerDisplayText) {
        this.timerDisplayText.textContent = showLabels ? `--:-- (${i18n.t('timerTitle')})` : '--:--';
      }
      if (this.timerModalClock) this.timerModalClock.textContent = '--:--';
      if (this.timerModalStatus) {
        this.timerModalStatus.textContent = i18n.t('timerStatusUnset');
        this.timerModalStatus.style.color = 'var(--win-gray-dark)';
      }
      if (this.btnPause) this.btnPause.style.display = 'none';
      if (this.btnResume) this.btnResume.style.display = 'none';
    } else {
      const timeStr = this.formatTime(timerState.remainingSeconds);

      if (this.timerDisplayText) {
        if (timerState.isExpired) {
          this.timerDisplayText.textContent = showLabels ? `🔒 00:00 (${i18n.t('timerStatusExpired')})` : '🔒 00:00';
        } else if (timerState.isRunning) {
          this.timerDisplayText.textContent = showLabels ? `⏱️ ${timeStr}` : timeStr;
        } else {
          this.timerDisplayText.textContent = showLabels ? `⏸️ ${timeStr}` : `${timeStr} (⏸️)`;
        }
      }

      if (this.timerModalClock) {
        this.timerModalClock.textContent = timeStr;
        this.timerModalClock.style.color = timerState.isExpired ? '#800000' : 'var(--win-navy)';
      }

      if (this.timerModalStatus) {
        if (timerState.isExpired) {
          this.timerModalStatus.textContent = i18n.t('timerStatusExpired');
          this.timerModalStatus.style.color = '#800000';
        } else if (timerState.isRunning) {
          this.timerModalStatus.textContent = `${i18n.t('timerStatusRunning')} (${timeStr})`;
          this.timerModalStatus.style.color = '#008000';
        } else {
          this.timerModalStatus.textContent = `${i18n.t('timerStatusPaused')} (${timeStr})`;
          this.timerModalStatus.style.color = '#808000';
        }
      }

      if (isHost) {
        if (this.btnPause)
          this.btnPause.style.display = timerState.isRunning && !timerState.isExpired ? 'inline-block' : 'none';
        if (this.btnResume)
          this.btnResume.style.display =
            !timerState.isRunning && !timerState.isExpired && timerState.remainingSeconds > 0 ? 'inline-block' : 'none';
      }
    }

    // Update i18n modal titles & control buttons
    const txtModalTimerTitle = document.getElementById('txt-modal-timer-title');
    const txtTimerDesc = document.getElementById('txt-timer-desc');
    if (txtModalTimerTitle) txtModalTimerTitle.textContent = i18n.t('timerTitle');
    if (txtTimerDesc) txtTimerDesc.textContent = i18n.t('timerDesc');

    if (this.btnPause) this.btnPause.textContent = i18n.t('btnTimerPause');
    if (this.btnResume) this.btnResume.textContent = i18n.t('btnTimerResume');
    if (this.btnExtend2m) this.btnExtend2m.textContent = i18n.t('btnTimerExtend2m');
    if (this.btnExtend5m) this.btnExtend5m.textContent = i18n.t('btnTimerExtend5m');
    if (this.btnReset) this.btnReset.textContent = i18n.t('btnTimerReset');
  }
}
