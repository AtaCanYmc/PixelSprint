/**
 * PixelSprint Modal Component (TypeScript)
 */

import { store } from '../core/store.js';
import { audioSynth } from '../core/audio.js';
import { RetroCategory } from '../types/index.js';

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
    document.querySelectorAll('.btn-close-modal').forEach(btn => {
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
    const smAbout = document.getElementById('sm-about');

    if (btnAbout && this.modalAbout) btnAbout.addEventListener('click', () => this.openModal(this.modalAbout));
    if (smAbout && this.modalAbout) smAbout.addEventListener('click', () => this.openModal(this.modalAbout));
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
