/**
 * PixelSprint Core State Store (TypeScript)
 * Handles Retro Sessions & Per-Session Cards
 */

import { RetroCard, RetroCategory, RetroSession, StateChangeListener } from '../types/index.js';
import { STORAGE_KEYS, INITIAL_DEMO_CARDS } from '../utils/constants.js';
import { generateAnonymousCodename, getCurrentTimeString } from '../utils/helpers.js';

class RetroStore {
  private sessions: RetroSession[] = [];
  private activeSessionId: string | null = null;
  private cards: RetroCard[] = [];
  private listeners: StateChangeListener[] = [];

  public init(): void {
    this.loadSessions();
    this.checkUrlHash();

    window.addEventListener('hashchange', () => {
      this.checkUrlHash();
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
      // Create initial demo session if empty
      const demoSession: RetroSession = {
        id: 'retro-demo-sprint-1',
        title: 'Demo Sprint 42 Retrospektif',
        createdAt: new Date().toLocaleDateString('tr-TR'),
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
    const cleanTitle = title.trim() || 'Yeni Sprint Retrospektif';
    const id = 'retro-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 4);
    const newSession: RetroSession = {
      id,
      title: cleanTitle,
      createdAt: new Date().toLocaleDateString('tr-TR'),
      updatedAt: getCurrentTimeString(),
      cardCount: 0
    };

    this.sessions.unshift(newSession);
    this.saveSessions();
    this.setActiveSession(id);
    return newSession;
  }

  public setActiveSession(sessionId: string): void {
    let session = this.sessions.find(s => s.id === sessionId);
    if (!session) {
      // Auto create session if joined via shared link with ID
      session = {
        id: sessionId,
        title: `Retro Pano (${sessionId})`,
        createdAt: new Date().toLocaleDateString('tr-TR'),
        updatedAt: getCurrentTimeString(),
        cardCount: 0
      };
      this.sessions.unshift(session);
      this.saveSessions();
    }

    this.activeSessionId = sessionId;
    window.location.hash = `session=${sessionId}`;
    this.loadCardsForActiveSession();
  }

  public exitSession(): void {
    this.activeSessionId = null;
    window.location.hash = '';
    this.cards = [];
    this.notify();
  }

  public deleteSession(sessionId: string): void {
    this.sessions = this.sessions.filter(s => s.id !== sessionId);
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
        this.cards = rawCards.map(c => ({
          ...c,
          upvotes: c.upvotes !== undefined ? c.upvotes : (c.likes || 0),
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
    const session = this.sessions.find(s => s.id === this.activeSessionId);
    if (session) {
      session.cardCount = this.cards.length;
      session.updatedAt = getCurrentTimeString();
      this.saveSessions();
    }
  }

  public subscribe(listener: StateChangeListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach(listener => listener(this.cards));
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
    return newCard;
  }

  public upvoteCard(id: string): void {
    const card = this.cards.find(c => c.id === id);
    if (card) {
      card.upvotes = (card.upvotes || 0) + 1;
      this.saveCardsForActiveSession();
    }
  }

  public downvoteCard(id: string): void {
    const card = this.cards.find(c => c.id === id);
    if (card) {
      card.downvotes = (card.downvotes || 0) + 1;
      this.saveCardsForActiveSession();
    }
  }

  public moveCard(id: string, targetCategory: RetroCategory): void {
    const card = this.cards.find(c => c.id === id);
    if (card) {
      card.category = targetCategory;
      this.saveCardsForActiveSession();
    }
  }

  public deleteCard(id: string): void {
    this.cards = this.cards.filter(c => c.id !== id);
    this.saveCardsForActiveSession();
  }

  public clearAll(): void {
    this.cards = [];
    this.saveCardsForActiveSession();
  }

  public getCards(): RetroCard[] {
    return [...this.cards];
  }

  public getSessions(): RetroSession[] {
    return [...this.sessions];
  }

  public getActiveSession(): RetroSession | null {
    if (!this.activeSessionId) return null;
    return this.sessions.find(s => s.id === this.activeSessionId) || null;
  }

  public getActiveSessionId(): string | null {
    return this.activeSessionId;
  }
}

export const store = new RetroStore();
