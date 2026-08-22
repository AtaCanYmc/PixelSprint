/**
 * PixelSprint Modal Component (TypeScript)
 * Handles Add Card modal and About modal with i18n support
 */

import { store } from '../core/store';
import { audioSynth } from '../core/audio';
import { i18n } from '../i18n';
import { RetroCategory } from '../types';

export class ModalComponent {
  private modalAddCard: HTMLElement | null;
  private modalAbout: HTMLElement | null;
  private addCardForm: HTMLFormElement | null;
  private startMenu: HTMLElement | null;

  constructor() {
    this.modalAddCard = document.getElementById('modal-add-card');
    this.modalAbout = document.getElementById('modal-about');
    this.addCardForm = document.getElementById('add-card-form') as HTMLFormElement | null;
    this.startMenu = document.getElementById('start-menu');
  }

  public init(): void {
    i18n.subscribe(() => this.updateLocalizedText());

    document.querySelectorAll('.btn-close-modal').forEach((btn) => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay') as HTMLElement | null;
        if (modal) this.closeModal(modal);
      });
    });

    const btnOpenAdd = document.getElementById('btn-open-add-modal');
    const smAdd = document.getElementById('sm-add-card');

    if (btnOpenAdd) btnOpenAdd.addEventListener('click', () => this.openAddCardModal());
    if (smAdd) smAdd.addEventListener('click', () => this.openAddCardModal());

    if (this.addCardForm) {
      this.addCardForm.addEventListener('submit', (e: SubmitEvent) => {
        e.preventDefault();
        const categorySelect = document.getElementById('card-category') as HTMLSelectElement | null;
        const textInput = document.getElementById('card-text') as HTMLTextAreaElement | null;

        if (categorySelect && textInput && textInput.value.trim()) {
          const category = categorySelect.value as RetroCategory;
          const text = textInput.value;

          store.addCard(category, text);
          audioSynth.playSuccess();
          this.addCardForm?.reset();
          if (this.modalAddCard) this.closeModal(this.modalAddCard);
        }
      });
    }

    const btnAbout = document.getElementById('btn-about-trigger');
    const btnAboutDash = document.querySelector('.btn-about-dash');
    const smAbout = document.getElementById('sm-about');

    if (btnAbout && this.modalAbout) btnAbout.addEventListener('click', () => this.openModal(this.modalAbout));
    if (btnAboutDash && this.modalAbout) btnAboutDash.addEventListener('click', () => this.openModal(this.modalAbout));
    if (smAbout && this.modalAbout) smAbout.addEventListener('click', () => this.openModal(this.modalAbout));

    this.updateLocalizedText();
  }

  private updateLocalizedText(): void {
    const btnOpenAdd = document.getElementById('btn-open-add-modal');
    const btnExport = document.getElementById('btn-open-export');
    const btnClear = document.getElementById('btn-clear-board');
    const btnInstall = document.getElementById('btn-install-pwa');

    if (btnOpenAdd) btnOpenAdd.innerHTML = `<span>➕</span> ${i18n.t('btnAddCard')}`;
    if (btnExport) btnExport.innerHTML = `<span>💾</span> ${i18n.t('btnExportReport')}`;
    if (btnClear) btnClear.innerHTML = `<span>🗑️</span> ${i18n.t('btnClearBoard')}`;
    if (btnInstall) btnInstall.innerHTML = `<span>📱</span> ${i18n.t('btnInstallPwa')}`;
  }

  public openModal(modalEl: HTMLElement | null): void {
    if (!modalEl) return;
    audioSynth.playClick();
    modalEl.classList.remove('hidden');
    if (this.startMenu) this.startMenu.classList.add('hidden');
  }

  public closeModal(modalEl: HTMLElement | null): void {
    if (!modalEl) return;
    audioSynth.playClick();
    modalEl.classList.add('hidden');
  }

  public openAddCardModal(): void {
    this.openModal(this.modalAddCard);
    const textarea = document.getElementById('card-text') as HTMLTextAreaElement | null;
    if (textarea) textarea.focus();
  }
}
