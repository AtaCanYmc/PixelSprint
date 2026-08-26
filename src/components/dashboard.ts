/**
 * PixelSprint Dashboard Component (TypeScript)
 * Handles Retro Session creation, listing, joining, and management with full responsive mobile & i18n support
 */

import { store } from '../core/store';
import { audioSynth } from '../core/audio';
import { i18n } from '../i18n';
import { escapeHtml } from '../utils/helpers';

export class DashboardComponent {
  private windowDashboard: HTMLElement | null;
  private windowBoard: HTMLElement | null;
  private formNewSession: HTMLFormElement | null;
  private sessionTitleInput: HTMLInputElement | null;
  private inputJoinSession: HTMLInputElement | null;
  private btnJoinSession: HTMLElement | null;
  private sessionListContainer: HTMLElement | null;

  constructor() {
    this.windowDashboard = document.getElementById('window-dashboard');
    this.windowBoard = document.getElementById('window-board');
    this.formNewSession = document.getElementById('form-new-session') as HTMLFormElement | null;
    this.sessionTitleInput = document.getElementById('session-title-input') as HTMLInputElement | null;
    this.inputJoinSession = document.getElementById('input-join-session') as HTMLInputElement | null;
    this.btnJoinSession = document.getElementById('btn-join-session');
    this.sessionListContainer = document.getElementById('session-list-container');
  }

  public init(): void {
    store.subscribe(() => this.render());
    i18n.subscribe(() => this.updateStaticTexts());

    // New Session Form Submission
    if (this.formNewSession) {
      this.formNewSession.addEventListener('submit', (e: SubmitEvent) => {
        e.preventDefault();
        const title = this.sessionTitleInput ? this.sessionTitleInput.value : '';
        if (title.trim()) {
          audioSynth.playSuccess();
          store.createSession(title);
          if (this.sessionTitleInput) this.sessionTitleInput.value = '';
        }
      });
    }

    // Join Session by ID Terminal
    const handleJoin = () => {
      const sessionId = this.inputJoinSession ? this.inputJoinSession.value.trim() : '';
      if (sessionId) {
        audioSynth.playClick();
        store.setActiveSession(sessionId);
        if (this.inputJoinSession) this.inputJoinSession.value = '';
      }
    };

    if (this.btnJoinSession) {
      this.btnJoinSession.addEventListener('click', handleJoin);
    }
    if (this.inputJoinSession) {
      this.inputJoinSession.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter') handleJoin();
      });
    }

    // Session List Event Delegation (Open / Delete)
    if (this.sessionListContainer) {
      this.sessionListContainer.addEventListener('click', (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;
        const btn = target.closest('button[data-session-action]') as HTMLButtonElement | null;
        if (!btn) return;

        const action = btn.dataset['sessionAction'];
        const id = btn.dataset['id'];
        if (!id) return;

        if (action === 'open') {
          audioSynth.playClick();
          store.setActiveSession(id);
        } else if (action === 'delete') {
          if (confirm(i18n.t('deleteSessionConfirm'))) {
            audioSynth.playDelete();
            store.deleteSession(id);
          }
        }
      });
    }

    this.render();
  }

  public render(): void {
    const activeSession = store.getActiveSession();

    if (activeSession) {
      if (this.windowDashboard) this.windowDashboard.style.display = 'none';
      if (this.windowBoard) this.windowBoard.style.display = 'flex';
    } else {
      if (this.windowDashboard) this.windowDashboard.style.display = 'flex';
      if (this.windowBoard) this.windowBoard.style.display = 'none';
      this.updateStaticTexts();
      this.renderSessionList();
    }
  }

  private updateStaticTexts(): void {
    const txtDashTitle = document.getElementById('txt-dashboard-title');
    const txtStart = document.getElementById('txt-start-new-session');
    const inputTitle = document.getElementById('session-title-input') as HTMLInputElement | null;
    const btnCreate = document.getElementById('btn-create-session');
    const txtJoin = document.getElementById('txt-join-by-id-title');
    const inputJoin = document.getElementById('input-join-session') as HTMLInputElement | null;
    const btnJoin = document.getElementById('btn-join-session');
    const txtSessions = document.getElementById('txt-my-sessions-title');

    if (txtDashTitle) txtDashTitle.textContent = i18n.t('dashboardTitle');
    if (txtStart) txtStart.textContent = i18n.t('startNewSession');
    if (inputTitle) inputTitle.placeholder = i18n.t('sprintTitlePlaceholder');
    if (btnCreate) btnCreate.innerHTML = `<strong>${i18n.t('createAndJoinSessionBtn')}</strong>`;
    if (txtJoin) txtJoin.textContent = i18n.t('joinByIdTitle');
    if (inputJoin) inputJoin.placeholder = i18n.t('joinByIdPlaceholder');
    if (btnJoin) btnJoin.innerHTML = `<strong>${i18n.t('goToSessionBtn')}</strong>`;
    if (txtSessions) txtSessions.textContent = i18n.t('mySessionsTitle');
  }

  private renderSessionList(): void {
    if (!this.sessionListContainer) return;
    const sessions = store.getSessions();

    if (sessions.length === 0) {
      this.sessionListContainer.innerHTML = `
        <div class="empty-msg">${escapeHtml(i18n.t('emptySessions'))}</div>
      `;
      return;
    }

    const tableRowsHtml = sessions
      .map((s) => {
        const isHost = store.isHost(s.id);
        const roleBadgeHtml = isHost
          ? `<span class="session-badge" style="background: #e3f2fd; color: #0d47a1; border-color: #90caf9;">${escapeHtml(i18n.t('badgeHost'))}</span>`
          : `<span class="session-badge" style="background: #f5f5f5; color: #616161; border-color: #e0e0e0;">${escapeHtml(i18n.t('badgeGuest'))}</span>`;

        const deleteBtnHtml = isHost
          ? `<button class="win-btn win-btn-sm" data-session-action="delete" data-id="${s.id}" title="${escapeHtml(i18n.t('btnDelete'))}">❌</button>`
          : '';

        return `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 6px;">
            <strong>🚀 ${escapeHtml(s.title)}</strong>
            ${roleBadgeHtml}
          </div>
        </td>
        <td><code class="session-code">${escapeHtml(s.id)}</code></td>
        <td><span class="session-badge">${s.cardCount || 0}</span></td>
        <td>${escapeHtml(s.createdAt)}</td>
        <td>
          <div class="session-actions">
            <button class="win-btn win-btn-sm" data-session-action="open" data-id="${s.id}">
              ${escapeHtml(i18n.t('btnOpen'))}
            </button>
            ${deleteBtnHtml}
          </div>
        </td>
      </tr>
    `;
      })
      .join('');

    const mobileCardsHtml = sessions
      .map((s) => {
        const isHost = store.isHost(s.id);
        const roleBadgeHtml = isHost
          ? `<span class="session-badge" style="background: #e3f2fd; color: #0d47a1; border-color: #90caf9;">${escapeHtml(i18n.t('badgeHost'))}</span>`
          : `<span class="session-badge" style="background: #f5f5f5; color: #616161; border-color: #e0e0e0;">${escapeHtml(i18n.t('badgeGuest'))}</span>`;

        const deleteBtnHtml = isHost
          ? `<button class="win-btn win-btn-sm btn-mobile-delete" data-session-action="delete" data-id="${s.id}">❌</button>`
          : '';

        return `
      <div class="win-outset session-mobile-card">
        <div class="session-mobile-header">
          <div style="display: flex; align-items: center; gap: 6px;">
            <strong class="session-mobile-title">🚀 ${escapeHtml(s.title)}</strong>
            ${roleBadgeHtml}
          </div>
          <span class="session-badge">${s.cardCount || 0}</span>
        </div>
        <div class="session-mobile-meta">
          <code class="session-code">${escapeHtml(s.id)}</code>
          <span class="session-mobile-date">📅 ${escapeHtml(s.createdAt)}</span>
        </div>
        <div class="session-mobile-actions">
          <button class="win-btn win-btn-sm btn-mobile-open" data-session-action="open" data-id="${s.id}">
            ${escapeHtml(i18n.t('btnOpen'))}
          </button>
          ${deleteBtnHtml}
        </div>
      </div>
    `;
      })
      .join('');

    this.sessionListContainer.innerHTML = `
      <div class="session-table-wrapper desktop-view">
        <table class="session-table win-inset">
          <thead>
            <tr>
              <th>${escapeHtml(i18n.t('colTitle'))}</th>
              <th>${escapeHtml(i18n.t('colSessionId'))}</th>
              <th>${escapeHtml(i18n.t('colCardCount'))}</th>
              <th>${escapeHtml(i18n.t('colCreatedAt'))}</th>
              <th>${escapeHtml(i18n.t('colActions'))}</th>
            </tr>
          </thead>
          <tbody>
            ${tableRowsHtml}
          </tbody>
        </table>
      </div>
      <div class="session-mobile-list mobile-view">
        ${mobileCardsHtml}
      </div>
    `;
  }
}
