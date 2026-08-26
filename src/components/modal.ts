/**
 * PixelSprint Modal Component (TypeScript)
 * Handles Add Card modal, About modal, and Mobile PWA Setup Guide modal with complete 100% i18n support
 */

import { store } from '../core/store';
import { audioSynth } from '../core/audio';
import { i18n } from '../i18n';
import { RetroCategory } from '../types';

export class ModalComponent {
  private modalAddCard: HTMLElement | null;
  private modalAbout: HTMLElement | null;
  private modalPwaGuide: HTMLElement | null;
  private addCardForm: HTMLFormElement | null;
  private startMenu: HTMLElement | null;

  constructor() {
    this.modalAddCard = document.getElementById('modal-add-card');
    this.modalAbout = document.getElementById('modal-about');
    this.modalPwaGuide = document.getElementById('modal-pwa-guide');
    this.addCardForm = document.getElementById('add-card-form') as HTMLFormElement | null;
    this.startMenu = document.getElementById('start-menu');
  }

  public init(): void {
    i18n.subscribe(() => this.updateLocalizedText());
    store.subscribe(() => this.updateLocalizedText());

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
    this.checkMobilePwaFirstVisit();
  }

  private checkMobilePwaFirstVisit(): void {
    const isMobile = window.innerWidth <= 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone;
    const hasSeenGuide = localStorage.getItem('pixelsprint_pwa_guide_seen');

    if (isMobile && !isStandalone && !hasSeenGuide && this.modalPwaGuide) {
      setTimeout(() => {
        this.openModal(this.modalPwaGuide);
        localStorage.setItem('pixelsprint_pwa_guide_seen', 'true');
      }, 600);
    }
  }

  private updateLocalizedText(): void {
    const btnShareLink = document.getElementById('btn-share-link');
    const btnOpenAdd = document.getElementById('btn-open-add-modal');
    const btnOpenAi = document.getElementById('btn-open-ai-prompt');
    const btnExport = document.getElementById('btn-open-export');
    const btnClear = document.getElementById('btn-clear-board');
    const btnInstall = document.getElementById('btn-install-pwa');

    const showLabels = store.isShowButtonLabels();

    if (btnShareLink) {
      btnShareLink.innerHTML = showLabels ? `<span>📱</span> <strong>${i18n.t('btnShareQr')}</strong>` : '📱';
      btnShareLink.title = i18n.t('btnShareQr');
    }
    if (btnOpenAdd) {
      btnOpenAdd.innerHTML = showLabels ? `<span>➕</span> <strong>${i18n.t('btnAddCard')}</strong>` : '➕';
      btnOpenAdd.title = i18n.t('btnAddCard');
    }
    if (btnOpenAi) {
      btnOpenAi.innerHTML = showLabels ? `<span>🤖</span> <strong>${i18n.t('btnAiPrompt')}</strong>` : '🤖';
      btnOpenAi.title = i18n.t('btnAiPrompt');
    }
    if (btnExport) {
      btnExport.innerHTML = showLabels ? `<span>💾</span> <strong>${i18n.t('btnExportReport')}</strong>` : '💾';
      btnExport.title = i18n.t('btnExportReport');
    }
    if (btnClear) {
      btnClear.innerHTML = showLabels ? `<span>🗑️</span> <strong>${i18n.t('btnClearBoard')}</strong>` : '🗑️';
      btnClear.title = i18n.t('btnClearBoard');
    }
    if (btnInstall) {
      btnInstall.innerHTML = showLabels ? `<span>📱</span> <strong>${i18n.t('btnInstallPwa')}</strong>` : '📱';
      btnInstall.title = i18n.t('btnInstallPwa');
    }

    // Add Card Modal i18n
    const txtAddTitle = document.getElementById('txt-modal-add-title');
    const txtSelectCat = document.getElementById('txt-label-select-cat');
    const optWentWell = document.getElementById('opt-went-well');
    const optImprovement = document.getElementById('opt-improvement');
    const optAction = document.getElementById('opt-action');
    const txtMessageLabel = document.getElementById('txt-label-message');
    const cardTextarea = document.getElementById('card-text') as HTMLTextAreaElement | null;
    const btnSaveCard = document.getElementById('btn-save-card');

    if (txtAddTitle) txtAddTitle.textContent = i18n.t('modalAddTitle');
    if (txtSelectCat) txtSelectCat.textContent = i18n.t('selectCategoryLabel');
    if (optWentWell) optWentWell.textContent = i18n.t('colWentWellTitle');
    if (optImprovement) optImprovement.textContent = i18n.t('colImprovementTitle');
    if (optAction) optAction.textContent = i18n.t('colActionTitle');
    if (txtMessageLabel) txtMessageLabel.textContent = i18n.t('messageLabel');
    if (cardTextarea) cardTextarea.placeholder = i18n.t('messagePlaceholder');
    if (btnSaveCard) btnSaveCard.innerHTML = `<strong>${i18n.t('btnSaveAndSend')}</strong>`;

    // Share QR Modal i18n
    const txtShareTitle = document.getElementById('txt-modal-share-title');
    const txtShareDesc = document.getElementById('txt-share-desc');
    const txtDirectLink = document.getElementById('txt-label-direct-link');

    if (txtShareTitle) txtShareTitle.textContent = i18n.t('modalShareTitle');
    if (txtShareDesc) txtShareDesc.textContent = i18n.t('shareDesc');
    if (txtDirectLink) txtDirectLink.textContent = i18n.t('directLinkLabel');

    // Export Report Modal i18n
    const txtExportTitle = document.getElementById('txt-modal-export-title');
    const txtExportDesc = document.getElementById('txt-export-desc');

    if (txtExportTitle) txtExportTitle.textContent = i18n.t('modalExportTitle');
    if (txtExportDesc) txtExportDesc.textContent = i18n.t('exportDesc');

    // About Modal i18n
    const txtAboutTitle = document.getElementById('txt-modal-about-title');
    const txtAboutSubhead = document.getElementById('txt-about-subhead');
    const txtAboutDesc1 = document.getElementById('txt-about-desc1');
    const txtAboutDesc2 = document.getElementById('txt-about-desc2');
    const txtAboutDesc3 = document.getElementById('txt-about-desc3');
    const txtAboutDesc4 = document.getElementById('txt-about-desc4');

    if (txtAboutTitle) txtAboutTitle.textContent = i18n.t('modalAboutTitle');
    if (txtAboutSubhead) txtAboutSubhead.textContent = i18n.t('aboutSubhead');
    if (txtAboutDesc1) txtAboutDesc1.innerHTML = `<strong>PixelSprint</strong>, ${i18n.t('aboutDesc1')}`;
    if (txtAboutDesc2) txtAboutDesc2.textContent = `• ${i18n.t('aboutDesc2')}`;
    if (txtAboutDesc3) txtAboutDesc3.textContent = `• ${i18n.t('aboutDesc3')}`;
    if (txtAboutDesc4) txtAboutDesc4.textContent = `• ${i18n.t('aboutDesc4')}`;

    // PWA Guide Modal i18n
    const txtModalPwaTitle = document.getElementById('txt-modal-pwa-title');
    const txtPwaHeading = document.getElementById('txt-pwa-heading');
    const txtPwaSubheading = document.getElementById('txt-pwa-subheading');
    const txtIosTitle = document.getElementById('txt-ios-title');
    const txtIosStep1 = document.getElementById('txt-ios-step1');
    const txtIosStep2 = document.getElementById('txt-ios-step2');
    const txtAndroidTitle = document.getElementById('txt-android-title');
    const txtAndroidStep1 = document.getElementById('txt-android-step1');
    const txtAndroidStep2 = document.getElementById('txt-android-step2');
    const txtBtnInstallNow = document.getElementById('txt-btn-install-now');

    if (txtModalPwaTitle) txtModalPwaTitle.textContent = i18n.t('modalPwaTitle');
    if (txtPwaHeading) txtPwaHeading.textContent = i18n.t('pwaHeading');
    if (txtPwaSubheading) txtPwaSubheading.textContent = i18n.t('pwaSubheading');
    if (txtIosTitle) txtIosTitle.textContent = i18n.t('iosTitle');
    if (txtIosStep1) txtIosStep1.textContent = i18n.t('iosStep1');
    if (txtIosStep2) txtIosStep2.textContent = i18n.t('iosStep2');
    if (txtAndroidTitle) txtAndroidTitle.textContent = i18n.t('androidTitle');
    if (txtAndroidStep1) txtAndroidStep1.textContent = i18n.t('androidStep1');
    if (txtAndroidStep2) txtAndroidStep2.textContent = i18n.t('androidStep2');
    if (txtBtnInstallNow) txtBtnInstallNow.textContent = i18n.t('btnInstallNow');
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
