/**
 * PixelSprint Core State Store (TypeScript)
 * Handles Retro Sessions, Per-Session Cards, Per-Device Vote Locking, and Real-time Synchronization
 */

import { RetroCard, RetroCategory, RetroSession, StateChangeListener, RealtimeMessage } from '../types';
import { STORAGE_KEYS, INITIAL_DEMO_CARDS } from '../utils/constants';
import { generateAnonymousCodename, getCurrentTimeString } from '../utils/helpers';
import { audioSynth } from './audio';
import { realtimeSync } from './sync';

export type UserVoteState = 'up' | 'down' | null;

class RetroStore {
  private sessions: RetroSession[] = [];
  private activeSessionId: string | null = null;
  private cards: RetroCard[] = [];
  private userVotes: Record<string, UserVoteState> = {};
  private cardsRevealedMap: Record<string, boolean> = {};
  private hostedSessionIds: string[] = [];
  private showButtonLabels: boolean = false;
  private listeners: StateChangeListener[] = [];

  public init(): void {
    this.loadHostedSessions();
    this.loadCardsRevealed();
    this.loadShowButtonLabels();
    this.loadSessions();
    this.loadUserVotes();
    this.setupRealtimeListeners();
    this.checkUrlHash();

    window.addEventListener('hashchange', () => {
      this.checkUrlHash();
    });
  }

  private loadShowButtonLabels(): void {
    const saved = localStorage.getItem('pixelsprint_show_button_labels');
    this.showButtonLabels = saved === 'true';
  }

  public isShowButtonLabels(): boolean {
    return this.showButtonLabels;
  }

  public toggleButtonLabels(): boolean {
    this.showButtonLabels = !this.showButtonLabels;
    localStorage.setItem('pixelsprint_show_button_labels', String(this.showButtonLabels));
    this.notify();
    return this.showButtonLabels;
  }

  private loadCardsRevealed(): void {
    const saved = localStorage.getItem('pixelsprint_cards_revealed');
    if (saved) {
      try {
        this.cardsRevealedMap = JSON.parse(saved) as Record<string, boolean>;
      } catch (e) {
        this.cardsRevealedMap = {};
      }
    } else {
      this.cardsRevealedMap = {};
    }
  }

  private saveCardsRevealed(): void {
    localStorage.setItem('pixelsprint_cards_revealed', JSON.stringify(this.cardsRevealedMap));
  }

  public isCardsRevealed(sessionId?: string): boolean {
    const id = sessionId || this.activeSessionId;
    if (!id) return false;
    return this.cardsRevealedMap[id] ?? false;
  }

  public toggleCardsRevealed(): boolean {
    if (!this.isCurrentSessionHost() || !this.activeSessionId) return this.isCardsRevealed();
    const current = this.isCardsRevealed();
    const nextState = !current;
    this.cardsRevealedMap[this.activeSessionId] = nextState;
    this.saveCardsRevealed();
    realtimeSync.broadcast('TOGGLE_REVEAL_CARDS', { revealed: nextState });
    this.notify();
    return nextState;
  }

  private loadHostedSessions(): void {
    const saved = localStorage.getItem('pixelsprint_hosted_sessions');
    if (saved) {
      try {
        this.hostedSessionIds = JSON.parse(saved) as string[];
      } catch (e) {
        this.hostedSessionIds = [];
      }
    } else {
      this.hostedSessionIds = ['retro-demo-sprint-1'];
      this.saveHostedSessions();
    }
  }

  private saveHostedSessions(): void {
    localStorage.setItem('pixelsprint_hosted_sessions', JSON.stringify(this.hostedSessionIds));
  }

  public isHost(sessionId?: string): boolean {
    const targetId = sessionId || this.activeSessionId;
    if (!targetId) return false;
    return this.hostedSessionIds.includes(targetId);
  }

  public isCurrentSessionHost(): boolean {
    return this.isHost(this.activeSessionId || undefined);
  }

  private loadUserVotes(): void {
    const saved = localStorage.getItem('pixelsprint_user_votes');
    if (saved) {
      try {
        this.userVotes = JSON.parse(saved) as Record<string, UserVoteState>;
      } catch (e) {
        this.userVotes = {};
      }
    } else {
      this.userVotes = {};
    }
  }

  private saveUserVotes(): void {
    localStorage.setItem('pixelsprint_user_votes', JSON.stringify(this.userVotes));
  }

  public getUserVote(cardId: string): UserVoteState {
    return this.userVotes[cardId] || null;
  }

  private setupRealtimeListeners(): void {
    realtimeSync.onMessage((msg: RealtimeMessage) => {
      switch (msg.type) {
        case 'ADD_CARD':
          if (msg.payload && !this.cards.some((c) => c.id === msg.payload.id)) {
            this.cards.unshift(msg.payload as RetroCard);
            this.saveCardsForActiveSession();
            audioSynth.playSuccess();
          }
          break;

        case 'UPVOTE_CARD':
        case 'DOWNVOTE_CARD':
          if (msg.payload?.id) {
            const card = this.cards.find((c) => c.id === msg.payload.id);
            if (card) {
              if (msg.payload.upvotes !== undefined) card.upvotes = msg.payload.upvotes;
              if (msg.payload.downvotes !== undefined) card.downvotes = msg.payload.downvotes;
              this.saveCardsForActiveSession();
              if (msg.type === 'UPVOTE_CARD') audioSynth.playUpvote();
              else audioSynth.playDownvote();
            }
          }
          break;

        case 'MOVE_CARD':
          if (msg.payload?.id && msg.payload?.category) {
            const card = this.cards.find((c) => c.id === msg.payload.id);
            if (card) {
              card.category = msg.payload.category as RetroCategory;
              this.saveCardsForActiveSession();
              audioSynth.playClick();
            }
          }
          break;

        case 'DELETE_CARD':
          if (msg.payload?.id) {
            this.cards = this.cards.filter((c) => c.id !== msg.payload.id);
            delete this.userVotes[msg.payload.id];
            this.saveUserVotes();
            this.saveCardsForActiveSession();
            audioSynth.playDelete();
          }
          break;

        case 'CLEAR_CARDS':
          this.cards = [];
          this.userVotes = {};
          this.saveUserVotes();
          this.saveCardsForActiveSession();
          audioSynth.playDelete();
          break;

        case 'TOGGLE_REVEAL_CARDS':
          if (msg.payload?.revealed !== undefined && this.activeSessionId) {
            this.cardsRevealedMap[this.activeSessionId] = !!msg.payload.revealed;
            this.saveCardsRevealed();
            audioSynth.playClick();
            this.notify();
          }
          break;

        case 'REQUEST_SYNC':
          realtimeSync.broadcast('SYNC_STATE', { cards: this.cards, revealed: this.isCardsRevealed() });
          break;

        case 'SYNC_STATE':
          if (msg.payload) {
            if (Array.isArray(msg.payload)) {
              this.cards = msg.payload as RetroCard[];
            } else if (msg.payload.cards && Array.isArray(msg.payload.cards)) {
              this.cards = msg.payload.cards as RetroCard[];
              if (msg.payload.revealed !== undefined && this.activeSessionId) {
                this.cardsRevealedMap[this.activeSessionId] = !!msg.payload.revealed;
                this.saveCardsRevealed();
              }
            }
            this.saveCardsForActiveSession();
          }
          break;
      }
    });
  }

  private checkUrlHash(): void {
    const hash = window.location.hash;
    const match = hash.match(/#session=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      this.setActiveSession(match[1]);
    } else {
      this.activeSessionId = null;
      this.cards = [];
      realtimeSync.disconnect();
      this.notify();
    }
  }

  public loadSessions(): void {
    const saved = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    if (saved) {
      try {
        this.sessions = JSON.parse(saved) as RetroSession[];
      } catch (e) {
        this.sessions = [];
      }
    } else {
      const demoSession: RetroSession = {
        id: 'retro-demo-sprint-1',
        title: 'Demo Sprint Retrospective',
        createdAt: new Date().toLocaleDateString(),
        updatedAt: getCurrentTimeString(),
        cardCount: INITIAL_DEMO_CARDS.length
      };
      this.sessions = [demoSession];
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(this.sessions));
      localStorage.setItem(STORAGE_KEYS.CARDS_PREFIX + demoSession.id, JSON.stringify(INITIAL_DEMO_CARDS));
    }
  }

  public saveSessions(): void {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(this.sessions));
  }

  public createSession(title: string): RetroSession {
    const cleanTitle = title.trim() || 'Sprint Retrospective';
    const id = 'retro-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 4);
    const newSession: RetroSession = {
      id,
      title: cleanTitle,
      createdAt: new Date().toLocaleDateString(),
      updatedAt: getCurrentTimeString(),
      cardCount: 0
    };

    if (!this.hostedSessionIds.includes(id)) {
      this.hostedSessionIds.unshift(id);
      this.saveHostedSessions();
    }

    this.sessions.unshift(newSession);
    this.saveSessions();
    this.setActiveSession(id);
    return newSession;
  }

  public setActiveSession(sessionId: string): void {
    let session = this.sessions.find((s) => s.id === sessionId);
    if (!session) {
      session = {
        id: sessionId,
        title: `Retro Board (${sessionId})`,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: getCurrentTimeString(),
        cardCount: 0
      };
      this.sessions.unshift(session);
      this.saveSessions();
    }

    this.activeSessionId = sessionId;
    window.location.hash = `session=${sessionId}`;
    realtimeSync.init(sessionId);
    this.loadCardsForActiveSession();
  }

  public exitSession(): void {
    this.activeSessionId = null;
    window.location.hash = '';
    this.cards = [];
    realtimeSync.disconnect();
    this.notify();
  }

  public deleteSession(sessionId: string): void {
    if (!this.isHost(sessionId)) return;
    this.sessions = this.sessions.filter((s) => s.id !== sessionId);
    this.hostedSessionIds = this.hostedSessionIds.filter((id) => id !== sessionId);
    this.saveHostedSessions();
    localStorage.removeItem(STORAGE_KEYS.CARDS_PREFIX + sessionId);
    this.saveSessions();

    if (this.activeSessionId === sessionId) {
      this.exitSession();
    } else {
      this.notify();
    }
  }

  private loadCardsForActiveSession(): void {
    if (!this.activeSessionId) {
      this.cards = [];
      this.notify();
      return;
    }

    const saved = localStorage.getItem(STORAGE_KEYS.CARDS_PREFIX + this.activeSessionId);
    if (saved) {
      try {
        const rawCards = JSON.parse(saved) as RetroCard[];
        this.cards = rawCards.map((c) => ({
          ...c,
          upvotes: c.upvotes !== undefined ? c.upvotes : c.likes || 0,
          downvotes: c.downvotes !== undefined ? c.downvotes : 0
        }));
      } catch (e) {
        this.cards = [];
      }
    } else {
      this.cards = [];
    }

    this.updateActiveSessionCardCount();
    this.notify();
  }

  private saveCardsForActiveSession(): void {
    if (!this.activeSessionId) return;
    localStorage.setItem(STORAGE_KEYS.CARDS_PREFIX + this.activeSessionId, JSON.stringify(this.cards));
    this.updateActiveSessionCardCount();
    this.notify();
  }

  private updateActiveSessionCardCount(): void {
    if (!this.activeSessionId) return;
    const session = this.sessions.find((s) => s.id === this.activeSessionId);
    if (session) {
      session.cardCount = this.cards.length;
      session.updatedAt = getCurrentTimeString();
      this.saveSessions();
    }
  }

  public subscribe(listener: StateChangeListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener(this.cards));
  }

  public addCard(category: RetroCategory, text: string): RetroCard | null {
    if (!this.activeSessionId) return null;
    const newCard: RetroCard = {
      id: 'card-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      category: category,
      text: text.trim(),
      upvotes: 0,
      downvotes: 0,
      timestamp: getCurrentTimeString(),
      author: generateAnonymousCodename()
    };
    this.cards.unshift(newCard);
    this.saveCardsForActiveSession();
    realtimeSync.broadcast('ADD_CARD', newCard);
    return newCard;
  }

  public upvoteCard(id: string): void {
    const card = this.cards.find((c) => c.id === id);
    if (!card) return;

    const currentVote = this.getUserVote(id);

    if (currentVote === 'up') {
      // Untoggle upvote
      card.upvotes = Math.max(0, (card.upvotes || 0) - 1);
      delete this.userVotes[id];
    } else if (currentVote === 'down') {
      // Switch from downvote to upvote
      card.downvotes = Math.max(0, (card.downvotes || 0) - 1);
      card.upvotes = (card.upvotes || 0) + 1;
      this.userVotes[id] = 'up';
    } else {
      // New upvote
      card.upvotes = (card.upvotes || 0) + 1;
      this.userVotes[id] = 'up';
    }

    this.saveUserVotes();
    this.saveCardsForActiveSession();
    realtimeSync.broadcast('UPVOTE_CARD', { id, upvotes: card.upvotes, downvotes: card.downvotes });
  }

  public downvoteCard(id: string): void {
    const card = this.cards.find((c) => c.id === id);
    if (!card) return;

    const currentVote = this.getUserVote(id);

    if (currentVote === 'down') {
      // Untoggle downvote
      card.downvotes = Math.max(0, (card.downvotes || 0) - 1);
      delete this.userVotes[id];
    } else if (currentVote === 'up') {
      // Switch from upvote to downvote
      card.upvotes = Math.max(0, (card.upvotes || 0) - 1);
      card.downvotes = (card.downvotes || 0) + 1;
      this.userVotes[id] = 'down';
    } else {
      // New downvote
      card.downvotes = (card.downvotes || 0) + 1;
      this.userVotes[id] = 'down';
    }

    this.saveUserVotes();
    this.saveCardsForActiveSession();
    realtimeSync.broadcast('DOWNVOTE_CARD', { id, upvotes: card.upvotes, downvotes: card.downvotes });
  }

  public moveCard(id: string, targetCategory: RetroCategory): void {
    if (!this.isCurrentSessionHost()) return;
    const card = this.cards.find((c) => c.id === id);
    if (card) {
      card.category = targetCategory;
      this.saveCardsForActiveSession();
      realtimeSync.broadcast('MOVE_CARD', { id, category: targetCategory });
    }
  }

  public deleteCard(id: string): void {
    if (!this.isCurrentSessionHost()) return;
    this.cards = this.cards.filter((c) => c.id !== id);
    delete this.userVotes[id];
    this.saveUserVotes();
    this.saveCardsForActiveSession();
    realtimeSync.broadcast('DELETE_CARD', { id });
  }

  public clearAll(): void {
    if (!this.isCurrentSessionHost()) return;
    this.cards = [];
    this.userVotes = {};
    this.saveUserVotes();
    this.saveCardsForActiveSession();
    realtimeSync.broadcast('CLEAR_CARDS');
  }

  public getCards(): RetroCard[] {
    return [...this.cards];
  }

  public getSessions(): RetroSession[] {
    return [...this.sessions];
  }

  public getActiveSession(): RetroSession | null {
    if (!this.activeSessionId) return null;
    return this.sessions.find((s) => s.id === this.activeSessionId) || null;
  }

  public getActiveSessionId(): string | null {
    return this.activeSessionId;
  }
}

export const store = new RetroStore();
