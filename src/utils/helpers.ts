/**
 * PixelSprint Utility Helpers (TypeScript)
 */

import { RETRO_CODENAMES } from './constants.js';

export function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function generateAnonymousCodename(): string {
  const idx = Math.floor(Math.random() * RETRO_CODENAMES.length);
  const randNum = Math.floor(100 + Math.random() * 900);
  return `${RETRO_CODENAMES[idx]}#${randNum}`;
}

export function getCurrentTimeString(): string {
  const now = new Date();
  return now.toTimeString().split(' ')[0];
}
