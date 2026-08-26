/**
 * PixelSprint Board Component (TypeScript)
 * Handles rendering retro columns, cards, voting, and drag/move with i18n support
 */

import { store } from '../core/store';
import { audioSynth } from '../core/audio';
import { i18n } from '../i18n';
import { escapeHtml } from '../utils/helpers';
import { RetroCard, RetroCategory } from '../types';

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
    i18n.subscribe(() => this.render());

    if (this.searchInput) {
      this.searchInput.addEventListener('input', () => this.render());
    }

    if (this.boardContainer) {
      this.boardContainer.addEventListener('click', (e: MouseEvent) => this.handleCardClick(e));
    }

    this.mobileTabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        audioSynth.playClick();
        this.mobileTabBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const targetTabId = btn.dataset['tab'];
        document.querySelectorAll('.board-column').forEach((col) => {
          if (col.id === targetTabId) {
            col.classList.add('active-tab');
          } else {
            col.classList.remove('active-tab');
          }
        });
      });
    });

    const btnToggleReveal = document.getElementById('btn-toggle-reveal');
    if (btnToggleReveal) {
      btnToggleReveal.addEventListener('click', () => {
        if (!store.isCurrentSessionHost()) {
          alert(i18n.t('hostOnlyActionAlert'));
          return;
        }
        audioSynth.playClick();
        store.toggleCardsRevealed();
      });
    }

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

    if (action === 'upvote') {
      audioSynth.playUpvote();
      store.upvoteCard(id);
    } else if (action === 'downvote') {
      audioSynth.playDownvote();
      store.downvoteCard(id);
    } else if (action === 'move') {
      if (!store.isCurrentSessionHost()) {
        alert(i18n.t('hostOnlyActionAlert'));
        return;
      }
      const targetCat = btn.dataset['target'] as RetroCategory | undefined;
      if (targetCat) {
        audioSynth.playClick();
        store.moveCard(id, targetCat);
      }
    } else if (action === 'delete') {
      if (!store.isCurrentSessionHost()) {
        alert(i18n.t('hostOnlyActionAlert'));
        return;
      }
      if (confirm(i18n.t('deleteCardConfirm'))) {
        audioSynth.playDelete();
        store.deleteCard(id);
      }
    }
  }

  public render(): void {
    this.updateStaticHeaders();

    const filterText = this.searchInput ? this.searchInput.value.toLowerCase().trim() : '';
    const cards = store.getCards();
    const isHost = store.isCurrentSessionHost();
    const isRevealed = store.isCardsRevealed();

    const btnToggleReveal = document.getElementById('btn-toggle-reveal');
    if (btnToggleReveal) {
      const showLabels = store.isShowButtonLabels();
      if (isHost) {
        btnToggleReveal.innerHTML = showLabels
          ? isRevealed
            ? `<span>🙈</span> <strong>${escapeHtml(i18n.t('btnToggleMask'))}</strong>`
            : `<span>👁️</span> <strong>${escapeHtml(i18n.t('btnToggleReveal'))}</strong>`
          : isRevealed
            ? '🙈'
            : '👁️';
        btnToggleReveal.title = isRevealed ? i18n.t('btnToggleMask') : i18n.t('btnToggleReveal');
        btnToggleReveal.style.opacity = '1';
      } else {
        btnToggleReveal.innerHTML = showLabels
          ? isRevealed
            ? `<span>👁️</span> <strong>${escapeHtml(i18n.t('badgeRevealedPhase'))}</strong>`
            : `<span>🙈</span> <strong>${escapeHtml(i18n.t('badgeMaskedPhase'))}</strong>`
          : isRevealed
            ? '👁️'
            : '🙈';
        btnToggleReveal.title = `${isRevealed ? i18n.t('badgeRevealedPhase') : i18n.t('badgeMaskedPhase')} (${i18n.t('hostOnlyTooltip')})`;
        btnToggleReveal.style.opacity = '0.85';
      }
    }

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

    cards.forEach((card) => {
      if (
        filterText &&
        !card.text.toLowerCase().includes(filterText) &&
        !card.author.toLowerCase().includes(filterText)
      ) {
        return;
      }
      if (lists[card.category]) {
        lists[card.category].items.push(card);
      }
    });

    (Object.keys(lists) as RetroCategory[]).forEach((cat) => {
      const col = lists[cat];
      if (!col.el || !col.countEl) return;

      col.countEl.textContent = col.items.length.toString();

      if (col.items.length === 0) {
        col.el.innerHTML = `<div class="empty-msg">${escapeHtml(i18n.t('emptyColumnMsg'))}</div>`;
        return;
      }

      col.el.innerHTML = col.items
        .map((card) => {
          const up = card.upvotes || 0;
          const down = card.downvotes || 0;
          const score = up - down;
          const scoreClass = score > 0 ? 'score-positive' : score < 0 ? 'score-negative' : '';
          const scoreStr = score > 0 ? `+${score}` : `${score}`;

          const userVote = store.getUserVote(card.id);
          const upActive = userVote === 'up' ? 'active-upvote pressed' : '';
          const downActive = userVote === 'down' ? 'active-downvote pressed' : '';

          const cardContentHtml = isRevealed
            ? escapeHtml(card.text).replace(/\n/g, '<br>')
            : `<span class="card-text-masked" title="${escapeHtml(i18n.t('badgeMaskedPhase'))}">████████████████</span>`;

          const moveButtonsHtml = isHost
            ? `
                ${card.category !== 'went_well' ? `<button class="win-btn win-btn-sm" data-action="move" data-id="${card.id}" data-target="went_well" title="${escapeHtml(i18n.t('moveCardTitle'))}">🟢</button>` : ''}
                ${card.category !== 'improvement' ? `<button class="win-btn win-btn-sm" data-action="move" data-id="${card.id}" data-target="improvement" title="${escapeHtml(i18n.t('moveCardTitle'))}">🔴</button>` : ''}
                ${card.category !== 'action' ? `<button class="win-btn win-btn-sm" data-action="move" data-id="${card.id}" data-target="action" title="${escapeHtml(i18n.t('moveCardTitle'))}">💡</button>` : ''}
              `
            : '';

          const deleteButtonHtml = isHost
            ? `
                <button class="win-btn win-btn-sm" data-action="delete" data-id="${card.id}" title="Sil">
                  ❌
                </button>
              `
            : '';

          return `
          <div class="win-outset retro-card ${card.category}" data-id="${card.id}">
            <div class="card-header">
              <span class="card-author">👤 ${escapeHtml(card.author)}</span>
              <span class="card-time">⏱️ ${escapeHtml(card.timestamp)}</span>
            </div>
            <div class="card-body">
              ${cardContentHtml}
            </div>
            <div class="card-footer">

              <div class="card-actions">
                <!-- Reddit Style Vote Group -->
                <div class="vote-group">
                  <button class="win-btn win-btn-sm vote-btn upvote-btn ${upActive}" data-action="upvote" data-id="${card.id}" title="${escapeHtml(i18n.t('upvoteTooltip'))}">
                    ▲ ${up}
                  </button>
                  <span class="vote-score ${scoreClass}">${scoreStr}</span>
                  <button class="win-btn win-btn-sm vote-btn downvote-btn ${downActive}" data-action="downvote" data-id="${card.id}" title="${escapeHtml(i18n.t('downvoteTooltip'))}">
                    ▼ ${down}
                  </button>
                </div>

                ${moveButtonsHtml}
              </div>

              ${deleteButtonHtml}
            </div>
          </div>
        `;
        })
        .join('');
    });
  }

  private updateStaticHeaders(): void {
    const colWentWellHeader = document.querySelector('#col-went-well .column-header span:first-child');
    const colImprovementHeader = document.querySelector('#col-improvement .column-header span:first-child');
    const colActionHeader = document.querySelector('#col-action .column-header span:first-child');
    if (colWentWellHeader) colWentWellHeader.textContent = i18n.t('colWentWellTitle');
    if (colImprovementHeader) colImprovementHeader.textContent = i18n.t('colImprovementTitle');
    if (colActionHeader) colActionHeader.textContent = i18n.t('colActionTitle');

    if (this.searchInput) this.searchInput.placeholder = i18n.t('searchPlaceholder');
  }
}
