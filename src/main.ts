/**
 * PixelSprint Main Entry Point (Vite & TypeScript)
 */

import './css/main.css';
import { store } from './core/store.js';
import { pwaInstaller } from './core/pwa.js';
import { audioSynth } from './core/audio.js';
import { DashboardComponent } from './components/dashboard.js';
import { BoardComponent } from './components/board.js';
import { ModalComponent } from './components/modal.js';
import { ExportComponent } from './components/export.js';
import { TaskbarComponent } from './components/taskbar.js';
import { ShareComponent } from './components/share.js';

document.addEventListener('DOMContentLoaded', () => {
  store.init();
  pwaInstaller.init();

  const dashboardComp = new DashboardComponent();
  dashboardComp.init();

  const boardComp = new BoardComponent();
  boardComp.init();

  const modalComp = new ModalComponent();
  modalComp.init();

  const exportComp = new ExportComponent();
  exportComp.init();

  const shareComp = new ShareComponent();
  shareComp.init();

  const taskbarComp = new TaskbarComponent();
  taskbarComp.init();

  // Sync title bar with active session
  store.subscribe(() => {
    const activeSession = store.getActiveSession();
    const titleEl = document.getElementById('board-session-title');
    if (activeSession && titleEl) {
      titleEl.textContent = `PixelSprint - [${activeSession.title}] (ID: ${activeSession.id})`;
    }
  });

  console.log('[PixelSprint] QR Share & Retro App initialized successfully.');
});
