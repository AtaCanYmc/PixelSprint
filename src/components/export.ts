/**
 * PixelSprint Export Component (TypeScript)
 * Formats and downloads retrospective reports as .TXT, .CSV, .XLSX, .DOCX (Word), and .PDF with i18n support
 */

import { store } from '../core/store';
import { audioSynth } from '../core/audio';
import { i18n } from '../i18n';
import { CATEGORIES } from '../utils/constants';
import { RetroCategory } from '../types';

export class ExportComponent {
  private modalExport: HTMLElement | null;
  private exportTextArea: HTMLTextAreaElement | null;
  private btnOpenExport: HTMLElement | null;
  private smExport: HTMLElement | null;
  private btnCopyExport: HTMLElement | null;
  private btnDownloadTxt: HTMLElement | null;
  private btnDownloadCsv: HTMLElement | null;
  private btnDownloadXlsx: HTMLElement | null;
  private btnDownloadDocx: HTMLElement | null;
  private btnDownloadPdf: HTMLElement | null;
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
    this.btnDownloadDocx = document.getElementById('btn-download-docx');
    this.btnDownloadPdf = document.getElementById('btn-download-pdf');
    this.startMenu = document.getElementById('start-menu');
  }

  public init(): void {
    i18n.subscribe(() => this.updateLocalizedText());

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

    if (this.btnDownloadDocx) {
      this.btnDownloadDocx.addEventListener('click', () => this.downloadDocxReport());
    }

    if (this.btnDownloadPdf) {
      this.btnDownloadPdf.addEventListener('click', () => this.downloadPdfReport());
    }

    this.updateLocalizedText();
  }

  private updateLocalizedText(): void {
    if (this.btnCopyExport) this.btnCopyExport.textContent = i18n.t('btnCopy');
    if (this.btnDownloadTxt) this.btnDownloadTxt.innerHTML = `<strong>${i18n.t('btnDownloadTxt')}</strong>`;
    if (this.btnDownloadCsv) this.btnDownloadCsv.innerHTML = `<strong>${i18n.t('btnDownloadCsv')}</strong>`;
    if (this.btnDownloadXlsx) this.btnDownloadXlsx.innerHTML = `<strong>${i18n.t('btnDownloadXlsx')}</strong>`;
    if (this.btnDownloadDocx) this.btnDownloadDocx.innerHTML = `<strong>${i18n.t('btnDownloadDocx')}</strong>`;
    if (this.btnDownloadPdf) this.btnDownloadPdf.innerHTML = `<strong>${i18n.t('btnDownloadPdf')}</strong>`;
  }

  public generateReportText(): string {
    const cards = store.getCards();
    let report = `==========================================\n`;
    report += ` PIXELSPRINT - SPRINT RETROSPECTIVE REPORT\n`;
    report += ` Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}\n`;
    report += `==========================================\n\n`;

    CATEGORIES.forEach((cat) => {
      const catCards = cards.filter((c) => c.category === cat.key);
      const catTitleMap: Record<RetroCategory, string> = {
        went_well: i18n.t('colWentWellTitle'),
        improvement: i18n.t('colImprovementTitle'),
        action: i18n.t('colActionTitle')
      };

      report += `${catTitleMap[cat.key]} (${catCards.length})\n`;
      report += `------------------------------------------\n`;
      if (catCards.length === 0) {
        report += `(Empty)\n`;
      } else {
        catCards.forEach((card, i) => {
          const up = card.upvotes || 0;
          const down = card.downvotes || 0;
          const score = up - down;
          const scoreStr = score > 0 ? `+${score}` : `${score}`;
          report += `${i + 1}. [${card.author}] [Score: ${scoreStr} (▲${up} / ▼${down})]\n`;
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
      alert(i18n.t('copySuccess'));
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
      went_well: i18n.t('colWentWellTitle'),
      improvement: i18n.t('colImprovementTitle'),
      action: i18n.t('colActionTitle')
    };

    let csv = '\uFEFF';
    csv += `"Kategori";"Yazar";"Mesaj";"Skor";"Upvote";"Downvote";"Saat"\n`;

    cards.forEach((card) => {
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
      went_well: i18n.t('colWentWellTitle'),
      improvement: i18n.t('colImprovementTitle'),
      action: i18n.t('colActionTitle')
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
    xml += `        <Cell><Data ss:Type="String">Yazar</Data></Cell>\n`;
    xml += `        <Cell><Data ss:Type="String">Mesaj</Data></Cell>\n`;
    xml += `        <Cell><Data ss:Type="String">Skor</Data></Cell>\n`;
    xml += `        <Cell><Data ss:Type="String">Upvote</Data></Cell>\n`;
    xml += `        <Cell><Data ss:Type="String">Downvote</Data></Cell>\n`;
    xml += `        <Cell><Data ss:Type="String">Saat</Data></Cell>\n`;
    xml += `      </Row>\n`;

    cards.forEach((card) => {
      const catTitle = categoryMap[card.category] || card.category;
      const escapeXml = (str: string) =>
        str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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

    this.triggerDownload(
      xml,
      `PixelSprint_Retro_${this.getDateStr()}.xlsx`,
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
  }

  public downloadDocxReport(): void {
    audioSynth.playClick();
    const cards = store.getCards();
    const activeSession = store.getActiveSession();
    const sessionTitle = activeSession ? activeSession.title : 'Sprint Retrospective';

    const categoryMap: Record<RetroCategory, string> = {
      went_well: i18n.t('colWentWellTitle'),
      improvement: i18n.t('colImprovementTitle'),
      action: i18n.t('colActionTitle')
    };

    let docHtml = `<html lang="${i18n.getLanguage()}">`;
    docHtml += `<head><meta charset='utf-8'><title>${sessionTitle}</title>`;
    docHtml += `<style>
      body { font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; margin: 20px; color: #1a1a1a; }
      h1 { color: #000080; border-bottom: 2px solid #000080; padding-bottom: 6px; }
      h2 { color: #333333; margin-top: 20px; }
      table { border-collapse: collapse; width: 100%; margin-top: 10px; }
      th, td { border: 1px solid #cccccc; padding: 8px 12px; text-align: left; }
      th { background-color: #000080; color: #ffffff; }
      tr:nth-child(even) { background-color: #f8f9fa; }
      .badge-went-well { color: #2e7d32; font-weight: bold; }
      .badge-improvement { color: #c62828; font-weight: bold; }
      .badge-action { color: #b8860b; font-weight: bold; }
    </style></head><body>`;

    docHtml += `<h1>💾 PixelSprint - ${sessionTitle}</h1>`;
    docHtml += `<p><strong>Date:</strong> ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | <strong>Total Cards:</strong> ${cards.length}</p>`;

    CATEGORIES.forEach((cat) => {
      const catCards = cards.filter((c) => c.category === cat.key);
      const catTitle = categoryMap[cat.key];
      docHtml += `<h2>${catTitle} (${catCards.length})</h2>`;

      if (catCards.length === 0) {
        docHtml += `<p><em>(No items)</em></p>`;
      } else {
        docHtml += `<table><thead><tr><th>#</th><th>Author</th><th>Message</th><th>Score</th><th>Time</th></tr></thead><tbody>`;
        catCards.forEach((card, idx) => {
          const up = card.upvotes || 0;
          const down = card.downvotes || 0;
          const score = up - down;
          const scoreStr = score > 0 ? `+${score}` : `${score}`;
          const cleanText = card.text.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');

          docHtml += `<tr>
            <td>${idx + 1}</td>
            <td><strong>${card.author}</strong></td>
            <td>${cleanText}</td>
            <td>${scoreStr} (▲${up} / ▼${down})</td>
            <td>${card.timestamp}</td>
          </tr>`;
        });
        docHtml += `</tbody></table>`;
      }
    });

    docHtml += `<br><hr><p style='font-size: 10pt; color: #666666;'>Generated by PixelSprint v1.0 Retrospective App</p></body></html>`;

    this.triggerDownload(docHtml, `PixelSprint_Retro_${this.getDateStr()}.docx`, 'application/msword;charset=utf-8');
  }

  public downloadPdfReport(): void {
    audioSynth.playClick();
    const cards = store.getCards();
    const activeSession = store.getActiveSession();
    const sessionTitle = activeSession ? activeSession.title : 'Sprint Retrospective';

    const categoryMap: Record<RetroCategory, string> = {
      went_well: i18n.t('colWentWellTitle'),
      improvement: i18n.t('colImprovementTitle'),
      action: i18n.t('colActionTitle')
    };

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up blocked! Please allow pop-ups to print/save PDF.');
      return;
    }

    let pdfHtml = `<!DOCTYPE html><html lang="${i18n.getLanguage()}"><head><meta charset="utf-8">`;
    pdfHtml += `<title>PixelSprint Report - ${sessionTitle}</title>`;
    pdfHtml += `<style>
      @media print {
        body { margin: 0; padding: 15px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #000; }
        .no-print { display: none; }
      }
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 25px; color: #111; line-height: 1.5; }
      .header { border-bottom: 3px solid #000080; padding-bottom: 10px; margin-bottom: 20px; }
      .header h1 { margin: 0; font-size: 22px; color: #000080; }
      .header p { margin: 5px 0 0 0; font-size: 13px; color: #555; }
      .section-title { font-size: 16px; font-weight: bold; margin-top: 20px; padding: 6px 10px; background: #e0e0e0; border-left: 5px solid #000080; }
      table { border-collapse: collapse; width: 100%; margin-top: 10px; margin-bottom: 20px; font-size: 13px; }
      th, td { border: 1px solid #bbb; padding: 8px 10px; text-align: left; }
      th { background-color: #f0f0f0; font-weight: bold; }
      tr:nth-child(even) { background-color: #fafafa; }
      .btn-print { background: #000080; color: #fff; border: none; padding: 10px 20px; font-weight: bold; cursor: pointer; border-radius: 4px; margin-bottom: 15px; }
    </style></head><body>`;

    pdfHtml += `<div class="no-print"><button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button></div>`;
    pdfHtml += `<div class="header"><h1>💾 PixelSprint - ${sessionTitle}</h1><p>Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | Total Notes: ${cards.length}</p></div>`;

    CATEGORIES.forEach((cat) => {
      const catCards = cards.filter((c) => c.category === cat.key);
      const catTitle = categoryMap[cat.key];
      pdfHtml += `<div class="section-title">${catTitle} (${catCards.length})</div>`;

      if (catCards.length === 0) {
        pdfHtml += `<p style="font-style: italic; color: #666;">(No cards in this category)</p>`;
      } else {
        pdfHtml += `<table><thead><tr><th style="width: 5%;">#</th><th style="width: 25%;">Author</th><th>Message</th><th style="width: 15%;">Score</th><th style="width: 12%;">Time</th></tr></thead><tbody>`;
        catCards.forEach((card, idx) => {
          const up = card.upvotes || 0;
          const down = card.downvotes || 0;
          const score = up - down;
          const scoreStr = score > 0 ? `+${score}` : `${score}`;
          const cleanText = card.text.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');

          pdfHtml += `<tr>
            <td>${idx + 1}</td>
            <td><strong>${card.author}</strong></td>
            <td>${cleanText}</td>
            <td>${scoreStr} (▲${up} / ▼${down})</td>
            <td>${card.timestamp}</td>
          </tr>`;
        });
        pdfHtml += `</tbody></table>`;
      }
    });

    pdfHtml += `</body></html>`;

    printWindow.document.write(pdfHtml);
    printWindow.document.close();

    setTimeout(() => {
      printWindow.print();
    }, 300);
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
