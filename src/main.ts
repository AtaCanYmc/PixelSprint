/**
 * PixelSprint Main Entry Point (Vite & TypeScript)
 */

import './css/main.css';
import { store } from './core/store.js';
import { pwaInstaller } from './core/pwa.js';
import { BoardComponent } from './components/board.js';
import { ModalComponent } from './components/modal.js';
import { ExportComponent } from './components/export.js';
import { TaskbarComponent } from './components/taskbar.js';

document.addEventListener('DOMContentLoaded', () => {
  store.init();
  pwaInstaller.init();

  const boardComp = new BoardComponent();
  boardComp.init();

  const modalComp = new ModalComponent();
  modalComp.init();

  const exportComp = new ExportComponent();
  exportComp.init();

  const taskbarComp = new TaskbarComponent();
  taskbarComp.init();

  console.log('[PixelSprint] Vite & TypeScript PWA app initialized successfully.');
});
