/**
 * PixelSprint Main Entry Point (Vite & TypeScript)
 */

import './css/main.css';
import { i18n } from './i18n';
import { store } from './core/store';
import { pwaInstaller } from './core/pwa';
import { DashboardComponent } from './components/dashboard';
import { BoardComponent } from './components/board';
import { ModalComponent } from './components/modal';
import { ExportComponent } from './components/export';
import { TaskbarComponent } from './components/taskbar';
import { ShareComponent } from './components/share';

document.addEventListener('DOMContentLoaded', () => {
  i18n.init();
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

  console.log('[PixelSprint] Multi-Language i18n & Retro App initialized successfully.');
});
