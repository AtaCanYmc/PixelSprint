/**
 * PixelSprint Export Component (TypeScript)
 */

import { store } from '../core/store.js';
import { audioSynth } from '../core/audio.js';
import { CATEGORIES } from '../utils/constants.js';

export class ExportComponent {
  private modalExport: HTMLElement | null;
  private exportTextArea: HTMLTextAreaElement | null;
  private btnOpenExport: HTMLElement | null;
  private smExport: HTMLElement | null;
  private btnCopyExport: HTMLElement | null;
  private btnDownloadTxt: HTMLElement | null;
  private startMenu: HTMLElement | null;

  constructor() {
    this.modalExport = document.getElementById('modal-export');
    this.exportTextArea = document.getElementById('export-text-area') as HTMLTextAreaElement | null;
    this.btnOpenExport = document.getElementById('btn-open-export');
    this.smExport = document.getElementById('sm-export');
    this.btnCopyExport = document.getElementById('btn-copy-export');
    this.btnDownloadTxt = document.getElementById('btn-download-txt');
    this.startMenu = document.getElementById('start-menu');
  }

  public init(): void {
    if (this.btnOpenExport) {
      this.btnOpenExport.addEventListener('click', () => this.showExportModal());
    }
    if (this.smExport) {
      this.smExport.addEventListener('click', () => this.showExportModal());
    }

    if (this.btnCopyExport) {
      this.btnCopyExport.addEventListener('click', () => this.copyToClipboard());
    }

    if (this.btnDownloadTxt) {
      this.btnDownloadTxt.addEventListener('click', () => this.downloadTxtReport());
    }
  }

  public generateReportText(): string {
    const cards = store.getCards();
    let report = `==========================================\n`;
    report += ` PIXELSPRINT - SPRINT RETROSPECTIVE RAPORU\n`;
    report += ` Tarih: ${new Date().toLocaleDateString('tr-TR')} ${new Date().toLocaleTimeString('tr-TR')}\n`;
    report += `==========================================\n\n`;

    CATEGORIES.forEach(cat => {
      const catCards = cards.filter(c => c.category === cat.key);
      report += `${cat.title} (${catCards.length} Kart)\n`;
      report += `------------------------------------------\n`;
      if (catCards.length === 0) {
        report += `(Kart eklenmedi)\n`;
      } else {
        catCards.forEach((card, i) => {
          report += `${i + 1}. [${card.author}] [👍 ${card.likes || 0} Beğeni]\n`;
          report += `   "${card.text.replace(/\n/g, '\n   ')}"\n\n`;
        });
      }
      report += `\n`;
    });

    return report;
  }

  public showExportModal(): void {
    audioSynth.playClick();
    if (this.exportTextArea) {
      this.exportTextArea.value = this.generateReportText();
    }
    if (this.startMenu) this.startMenu.classList.add('hidden');
    if (this.modalExport) this.modalExport.classList.remove('hidden');
  }

  public copyToClipboard(): void {
    if (!this.exportTextArea) return;
    this.exportTextArea.select();
    navigator.clipboard.writeText(this.exportTextArea.value).then(() => {
      audioSynth.playSuccess();
      alert('Retro raporu panoya kopyalandı! 📋');
    });
  }

  public downloadTxtReport(): void {
    audioSynth.playClick();
    const text = this.exportTextArea ? this.exportTextArea.value : this.generateReportText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PixelSprint_Retro_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
