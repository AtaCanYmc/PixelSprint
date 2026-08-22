/**
 * PixelSprint Export Component (TypeScript)
 * Formats and downloads retrospective reports as .TXT, .CSV, and .XLSX (Excel)
 */

import { store } from '../core/store.js';
import { audioSynth } from '../core/audio.js';
import { CATEGORIES } from '../utils/constants.js';
import { RetroCategory } from '../types/index.js';

export class ExportComponent {
  private modalExport: HTMLElement | null;
  private exportTextArea: HTMLTextAreaElement | null;
  private btnOpenExport: HTMLElement | null;
  private smExport: HTMLElement | null;
  private btnCopyExport: HTMLElement | null;
  private btnDownloadTxt: HTMLElement | null;
  private btnDownloadCsv: HTMLElement | null;
  private btnDownloadXlsx: HTMLElement | null;
  private startMenu: HTMLElement | null;

  constructor() {
    this.modalExport = document.getElementById('modal-export');
    this.exportTextArea = document.getElementById('export-text-area') as HTMLTextAreaElement | null;
    this.btnOpenExport = document.getElementById('btn-open-export');
    this.smExport = document.getElementById('sm-export');
    this.btnCopyExport = document.getElementById('btn-copy-export');
    this.btnDownloadTxt = document.getElementById('btn-download-txt');
    this.btnDownloadCsv = document.getElementById('btn-download-csv');
    this.btnDownloadXlsx = document.getElementById('btn-download-xlsx');
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

    if (this.btnDownloadCsv) {
      this.btnDownloadCsv.addEventListener('click', () => this.downloadCsvReport());
    }

    if (this.btnDownloadXlsx) {
      this.btnDownloadXlsx.addEventListener('click', () => this.downloadXlsxReport());
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
          const up = card.upvotes || 0;
          const down = card.downvotes || 0;
          const score = up - down;
          const scoreStr = score > 0 ? `+${score}` : `${score}`;
          report += `${i + 1}. [${card.author}] [Skor: ${scoreStr} (▲${up} / ▼${down})]\n`;
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
    this.triggerDownload(text, `PixelSprint_Retro_${this.getDateStr()}.txt`, 'text/plain;charset=utf-8');
  }

  public downloadCsvReport(): void {
    audioSynth.playClick();
    const cards = store.getCards();
    const categoryMap: Record<RetroCategory, string> = {
      went_well: 'Went Well (İyi Yaptık)',
      improvement: 'Needs Improvement (Batırdık/Gelişmeli)',
      action: 'Action Items (Aksiyonlar)'
    };

    let csv = '\uFEFF';
    csv += `"Kategori";"Yazar (Kod Adı)";"Mesaj";"Skor";"Upvote (▲)";"Downvote (▼)";"Saat"\n`;

    cards.forEach(card => {
      const catTitle = categoryMap[card.category] || card.category;
      const cleanText = card.text.replace(/"/g, '""').replace(/\n/g, ' ');
      const up = card.upvotes || 0;
      const down = card.downvotes || 0;
      const score = up - down;
      csv += `"${catTitle}";"${card.author}";"${cleanText}";"${score}";"${up}";"${down}";"${card.timestamp}"\n`;
    });

    this.triggerDownload(csv, `PixelSprint_Retro_${this.getDateStr()}.csv`, 'text/csv;charset=utf-8;');
  }

  public downloadXlsxReport(): void {
    audioSynth.playClick();
    const cards = store.getCards();
    const categoryMap: Record<RetroCategory, string> = {
      went_well: 'Went Well (İyi Yaptık)',
      improvement: 'Needs Improvement (Batırdık/Gelişmeli)',
      action: 'Action Items (Aksiyonlar)'
    };

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<?mso-application progid="Excel.Sheet"?>\n`;
    xml += `<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\n`;
    xml += `  xmlns:o="urn:schemas-microsoft-com:office:office"\n`;
    xml += `  xmlns:x="urn:schemas-microsoft-com:office:excel"\n`;
    xml += `  xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n`;
    xml += `  <Styles>\n`;
    xml += `    <Style ss:ID="Header">\n`;
    xml += `      <Font ss:Bold="1" ss:Color="#FFFFFF"/>\n`;
    xml += `      <Interior ss:Color="#000080" ss:Pattern="Solid"/>\n`;
    xml += `    </Style>\n`;
    xml += `  </Styles>\n`;
    xml += `  <Worksheet ss:Name="PixelSprint Retro">\n`;
    xml += `    <Table>\n`;
    xml += `      <Column ss:Width="160"/>\n`;
    xml += `      <Column ss:Width="130"/>\n`;
    xml += `      <Column ss:Width="280"/>\n`;
    xml += `      <Column ss:Width="60"/>\n`;
    xml += `      <Column ss:Width="70"/>\n`;
    xml += `      <Column ss:Width="70"/>\n`;
    xml += `      <Column ss:Width="80"/>\n`;
    xml += `      <Row ss:StyleID="Header">\n`;
    xml += `        <Cell><Data ss:Type="String">Kategori</Data></Cell>\n`;
    xml += `        <Cell><Data ss:Type="String">Yazar (Kod Adı)</Data></Cell>\n`;
    xml += `        <Cell><Data ss:Type="String">Mesaj</Data></Cell>\n`;
    xml += `        <Cell><Data ss:Type="String">Skor</Data></Cell>\n`;
    xml += `        <Cell><Data ss:Type="String">Upvote (▲)</Data></Cell>\n`;
    xml += `        <Cell><Data ss:Type="String">Downvote (▼)</Data></Cell>\n`;
    xml += `        <Cell><Data ss:Type="String">Saat</Data></Cell>\n`;
    xml += `      </Row>\n`;

    cards.forEach(card => {
      const catTitle = categoryMap[card.category] || card.category;
      const escapeXml = (str: string) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      const up = card.upvotes || 0;
      const down = card.downvotes || 0;
      const score = up - down;
      xml += `      <Row>\n`;
      xml += `        <Cell><Data ss:Type="String">${escapeXml(catTitle)}</Data></Cell>\n`;
      xml += `        <Cell><Data ss:Type="String">${escapeXml(card.author)}</Data></Cell>\n`;
      xml += `        <Cell><Data ss:Type="String">${escapeXml(card.text)}</Data></Cell>\n`;
      xml += `        <Cell><Data ss:Type="Number">${score}</Data></Cell>\n`;
      xml += `        <Cell><Data ss:Type="Number">${up}</Data></Cell>\n`;
      xml += `        <Cell><Data ss:Type="Number">${down}</Data></Cell>\n`;
      xml += `        <Cell><Data ss:Type="String">${escapeXml(card.timestamp)}</Data></Cell>\n`;
      xml += `      </Row>\n`;
    });

    xml += `    </Table>\n`;
    xml += `  </Worksheet>\n`;
    xml += `</Workbook>\n`;

    this.triggerDownload(xml, `PixelSprint_Retro_${this.getDateStr()}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  }

  private getDateStr(): string {
    return new Date().toISOString().slice(0, 10);
  }

  private triggerDownload(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
}
