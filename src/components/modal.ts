/**
 * PixelSprint Modal Component (TypeScript)
 * Handles Add Card modal and About modal with complete 100% i18n support
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

    // Add Card Modal i18n
    const txtAddTitle = document.getElementById('txt-modal-add-title');
    const txtSelectCat = document.getElementById('txt-label-select-cat');
    const optWentWell = document.getElementById('opt-went-well');
    const optImprovement = document.getElementById('opt-improvement');
    const optAction = document.getElementById('opt-action');
    const txtMessageLabel = document.getElementById('txt-label-message');
    const cardTextarea = document.getElementById('card-text') as HTMLTextAreaElement | null;
    const btnCancelAdd = document.getElementById('btn-cancel-add');
    const btnSaveCard = document.getElementById('btn-save-card');

    if (txtAddTitle) txtAddTitle.textContent = i18n.t('modalAddTitle');
    if (txtSelectCat) txtSelectCat.textContent = i18n.t('selectCategoryLabel');
    if (optWentWell) optWentWell.textContent = i18n.t('colWentWellTitle');
    if (optImprovement) optImprovement.textContent = i18n.t('colImprovementTitle');
    if (optAction) optAction.textContent = i18n.t('colActionTitle');
    if (txtMessageLabel) txtMessageLabel.textContent = i18n.t('messageLabel');
    if (cardTextarea) cardTextarea.placeholder = i18n.t('messagePlaceholder');
    if (btnCancelAdd) btnCancelAdd.textContent = i18n.t('btnCancel');
    if (btnSaveCard) btnSaveCard.innerHTML = `<strong>${i18n.t('btnSaveAndSend')}</strong>`;

    // Share QR Modal i18n
    const txtShareTitle = document.getElementById('txt-modal-share-title');
    const txtShareDesc = document.getElementById('txt-share-desc');
    const txtDirectLink = document.getElementById('txt-label-direct-link');
    const btnCloseShare = document.getElementById('btn-close-share');

    if (txtShareTitle) txtShareTitle.textContent = i18n.t('modalShareTitle');
    if (txtShareDesc) txtShareDesc.textContent = i18n.t('shareDesc');
    if (txtDirectLink) txtDirectLink.textContent = i18n.t('directLinkLabel');
    if (btnCloseShare) btnCloseShare.textContent = i18n.t('btnClose');

    // Export Report Modal i18n
    const txtExportTitle = document.getElementById('txt-modal-export-title');
    const txtExportDesc = document.getElementById('txt-export-desc');
    const btnCloseExport = document.getElementById('btn-close-export');

    if (txtExportTitle) txtExportTitle.textContent = i18n.t('modalExportTitle');
    if (txtExportDesc) txtExportDesc.textContent = i18n.t('exportDesc');
    if (btnCloseExport) btnCloseExport.textContent = i18n.t('btnClose');

    // About Modal i18n
    const txtAboutTitle = document.getElementById('txt-modal-about-title');
    const txtAboutSubhead = document.getElementById('txt-about-subhead');
    const txtAboutDesc1 = document.getElementById('txt-about-desc1');
    const txtAboutDesc2 = document.getElementById('txt-about-desc2');
    const txtAboutDesc3 = document.getElementById('txt-about-desc3');
    const txtAboutDesc4 = document.getElementById('txt-about-desc4');
    const btnCloseAbout = document.getElementById('btn-close-about');

    if (txtAboutTitle) txtAboutTitle.textContent = i18n.t('modalAboutTitle');
    if (txtAboutSubhead) txtAboutSubhead.textContent = i18n.t('aboutSubhead');
    if (txtAboutDesc1) txtAboutDesc1.innerHTML = `<strong>PixelSprint</strong>, ${i18n.t('aboutDesc1')}`;
    if (txtAboutDesc2) txtAboutDesc2.textContent = `• ${i18n.t('aboutDesc2')}`;
    if (txtAboutDesc3) txtAboutDesc3.textContent = `• ${i18n.t('aboutDesc3')}`;
    if (txtAboutDesc4) txtAboutDesc4.textContent = `• ${i18n.t('aboutDesc4')}`;
    if (btnCloseAbout) btnCloseAbout.textContent = i18n.t('btnClose');
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
