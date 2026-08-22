/**
 * PixelSprint Dashboard / Session Manager Component (TypeScript)
 * Handles listing retro sessions, creating new sessions, and joining by Session ID with i18n
 */

import { store } from '../core/store';
import { audioSynth } from '../core/audio';
import { i18n } from '../i18n';
import { escapeHtml } from '../utils/helpers';

export class DashboardComponent {
  private windowDashboard: HTMLElement | null;
  private windowBoard: HTMLElement | null;
  private sessionListContainer: HTMLElement | null;
  private formNewSession: HTMLFormElement | null;
  private inputJoinSession: HTMLInputElement | null;
  private btnJoinSession: HTMLElement | null;

  constructor() {
    this.windowDashboard = document.getElementById('window-dashboard');
    this.windowBoard = document.getElementById('window-board');
    this.sessionListContainer = document.getElementById('session-list-container');
    this.formNewSession = document.getElementById('form-new-session') as HTMLFormElement | null;
    this.inputJoinSession = document.getElementById('input-join-session') as HTMLInputElement | null;
    this.btnJoinSession = document.getElementById('btn-join-session');
  }

  public init(): void {
    store.subscribe(() => this.render());
    i18n.subscribe(() => this.render());

    // Create New Session Form
    if (this.formNewSession) {
      this.formNewSession.addEventListener('submit', (e: SubmitEvent) => {
        e.preventDefault();
        const inputTitle = document.getElementById('session-title-input') as HTMLInputElement | null;
        if (inputTitle && inputTitle.value.trim()) {
          audioSynth.playSuccess();
          const session = store.createSession(inputTitle.value);
          inputTitle.value = '';
          store.setActiveSession(session.id);
        }
      });
    }

    // Join Session by ID
    const handleJoin = () => {
      if (this.inputJoinSession && this.inputJoinSession.value.trim()) {
        audioSynth.playClick();
        const sessionId = this.inputJoinSession.value.trim();
        this.inputJoinSession.value = '';
        store.setActiveSession(sessionId);
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

    this.sessionListContainer.innerHTML = `
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
          ${sessions
            .map(
              (s) => `
            <tr>
              <td><strong>🚀 ${escapeHtml(s.title)}</strong></td>
              <td><code class="session-code">${escapeHtml(s.id)}</code></td>
              <td><span class="session-badge">${s.cardCount || 0}</span></td>
              <td>${escapeHtml(s.createdAt)}</td>
              <td>
                <div class="session-actions">
                  <button class="win-btn win-btn-sm" data-session-action="open" data-id="${s.id}">
                    ${escapeHtml(i18n.t('btnOpen'))}
                  </button>
                  <button class="win-btn win-btn-sm" data-session-action="delete" data-id="${s.id}">
                    ❌
                  </button>
                </div>
              </td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `;
  }
}
