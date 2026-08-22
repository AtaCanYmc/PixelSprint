/**
 * PixelSprint Board Component (TypeScript)
 */

import { store } from '../core/store.js';
import { audioSynth } from '../core/audio.js';
import { escapeHtml } from '../utils/helpers.js';
import { RetroCard, RetroCategory } from '../types/index.js';

export class BoardComponent {
  private listWentWell: HTMLElement | null;
  private listImprovement: HTMLElement | null;
  private listAction: HTMLElement | null;

  private countWentWell: HTMLElement | null;
  private countImprovement: HTMLElement | null;
  private countAction: HTMLElement | null;

  private searchInput: HTMLInputElement | null;
  private boardContainer: HTMLElement | null;
  private mobileTabBtns: NodeListOf<HTMLButtonElement>;

  constructor() {
    this.listWentWell = document.getElementById('list-went-well');
    this.listImprovement = document.getElementById('list-improvement');
    this.listAction = document.getElementById('list-action');

    this.countWentWell = document.getElementById('count-went-well');
    this.countImprovement = document.getElementById('count-improvement');
    this.countAction = document.getElementById('count-action');

    this.searchInput = document.getElementById('search-input') as HTMLInputElement | null;
    this.boardContainer = document.getElementById('board-container');
    this.mobileTabBtns = document.querySelectorAll('.mobile-tab-btn');
  }

  public init(): void {
    store.subscribe(() => this.render());

    if (this.searchInput) {
      this.searchInput.addEventListener('input', () => this.render());
    }

    if (this.boardContainer) {
      this.boardContainer.addEventListener('click', (e: MouseEvent) => this.handleCardClick(e));
    }

    this.mobileTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        audioSynth.playClick();
        this.mobileTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetTabId = btn.dataset['tab'];
        document.querySelectorAll('.board-column').forEach(col => {
          if (col.id === targetTabId) {
            col.classList.add('active-tab');
          } else {
            col.classList.remove('active-tab');
          }
        });
      });
    });

    this.render();
  }

  private handleCardClick(e: MouseEvent): void {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    const btn = target.closest('button[data-action]') as HTMLButtonElement | null;
    if (!btn) return;

    const action = btn.dataset['action'];
    const id = btn.dataset['id'];

    if (!id) return;

    if (action === 'like') {
      audioSynth.playLike();
      store.likeCard(id);
    } else if (action === 'move') {
      const targetCat = btn.dataset['target'] as RetroCategory | undefined;
      if (targetCat) {
        audioSynth.playClick();
        store.moveCard(id, targetCat);
      }
    } else if (action === 'delete') {
      if (confirm('Bu anonim kartı silmek istediğinizden emin misiniz?')) {
        audioSynth.playDelete();
        store.deleteCard(id);
      }
    }
  }

  public render(): void {
    const filterText = this.searchInput ? this.searchInput.value.toLowerCase().trim() : '';
    const cards = store.getCards();

    interface ColumnGroup {
      el: HTMLElement | null;
      countEl: HTMLElement | null;
      items: RetroCard[];
    }

    const lists: Record<RetroCategory, ColumnGroup> = {
      went_well: { el: this.listWentWell, countEl: this.countWentWell, items: [] },
      improvement: { el: this.listImprovement, countEl: this.countImprovement, items: [] },
      action: { el: this.listAction, countEl: this.countAction, items: [] }
    };

    cards.forEach(card => {
      if (filterText && !card.text.toLowerCase().includes(filterText) && !card.author.toLowerCase().includes(filterText)) {
        return;
      }
      if (lists[card.category]) {
        lists[card.category].items.push(card);
      }
    });

    (Object.keys(lists) as RetroCategory[]).forEach(cat => {
      const col = lists[cat];
      if (!col.el || !col.countEl) return;

      col.countEl.textContent = col.items.length.toString();

      if (col.items.length === 0) {
        col.el.innerHTML = `<div class="empty-msg">[Bu sütunda henüz kart yok]</div>`;
        return;
      }

      col.el.innerHTML = col.items.map(card => `
        <div class="win-outset retro-card ${card.category}" data-id="${card.id}">
          <div class="card-header">
            <span class="card-author">👤 ${escapeHtml(card.author)}</span>
            <span class="card-time">⏱️ ${escapeHtml(card.timestamp)}</span>
          </div>
          <div class="card-body">
            ${escapeHtml(card.text).replace(/\n/g, '<br>')}
          </div>
          <div class="card-footer">
            <div class="card-actions">
              <button class="win-btn win-btn-sm like-btn ${card.likes > 0 ? 'liked' : ''}" data-action="like" data-id="${card.id}">
                👍 ${card.likes || 0}
              </button>
              ${card.category !== 'went_well' ? `<button class="win-btn win-btn-sm" data-action="move" data-id="${card.id}" data-target="went_well" title="Went Well'e Taşı">🟢</button>` : ''}
              ${card.category !== 'improvement' ? `<button class="win-btn win-btn-sm" data-action="move" data-id="${card.id}" data-target="improvement" title="Improvement'a Taşı">🔴</button>` : ''}
              ${card.category !== 'action' ? `<button class="win-btn win-btn-sm" data-action="move" data-id="${card.id}" data-target="action" title="Action Items'a Taşı">💡</button>` : ''}
            </div>
            <button class="win-btn win-btn-sm" data-action="delete" data-id="${card.id}" title="Kartı Sil">
              ❌
            </button>
          </div>
        </div>
      `).join('');
    });
  }
}
