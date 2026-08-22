/**
 * PixelSprint Dashboard / Session Manager Component (TypeScript)
 * Handles listing retro sessions, creating new sessions, and joining by Session ID
 */

import { store } from '../core/store.js';
import { audioSynth } from '../core/audio.js';
import { escapeHtml } from '../utils/helpers.js';

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
          if (confirm('Bu Retro Oturumunu silmek istediğinize emin misiniz?')) {
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
      // Hide Dashboard, Show Board
      if (this.windowDashboard) this.windowDashboard.style.display = 'none';
      if (this.windowBoard) this.windowBoard.style.display = 'flex';
    } else {
      // Show Dashboard, Hide Board
      if (this.windowDashboard) this.windowDashboard.style.display = 'flex';
      if (this.windowBoard) this.windowBoard.style.display = 'none';
      this.renderSessionList();
    }
  }

  private renderSessionList(): void {
    if (!this.sessionListContainer) return;
    const sessions = store.getSessions();

    if (sessions.length === 0) {
      this.sessionListContainer.innerHTML = `
        <div class="empty-msg">[Henüz kaydedilmiş bir Retro Oturumu yok. Yukarıdan yeni bir tane oluşturun!]</div>
      `;
      return;
    }

    this.sessionListContainer.innerHTML = `
      <table class="session-table win-inset">
        <thead>
          <tr>
            <th>Retro Başlığı</th>
            <th>Oturum Kimliği (Session ID)</th>
            <th>Kart Sayısı</th>
            <th>Oluşturulma</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          ${sessions.map(s => `
            <tr>
              <td><strong>🚀 ${escapeHtml(s.title)}</strong></td>
              <td><code class="session-code">${escapeHtml(s.id)}</code></td>
              <td><span class="session-badge">${s.cardCount || 0} kart</span></td>
              <td>${escapeHtml(s.createdAt)}</td>
              <td>
                <div class="session-actions">
                  <button class="win-btn win-btn-sm" data-session-action="open" data-id="${s.id}">
                    ▶ Aç
                  </button>
                  <button class="win-btn win-btn-sm" data-session-action="delete" data-id="${s.id}" title="Oturumu Sil">
                    ❌
                  </button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
}
