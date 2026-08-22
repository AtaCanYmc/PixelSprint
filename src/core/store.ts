/**
 * PixelSprint Core State Store (TypeScript)
 */

import { RetroCard, RetroCategory, StateChangeListener } from '../types/index.js';
import { STORAGE_KEYS, INITIAL_DEMO_CARDS } from '../utils/constants.js';
import { generateAnonymousCodename, getCurrentTimeString } from '../utils/helpers.js';

class RetroStore {
  private cards: RetroCard[] = [];
  private listeners: StateChangeListener[] = [];

  public init(): void {
    const saved = localStorage.getItem(STORAGE_KEYS.CARDS);
    if (saved) {
      try {
        this.cards = JSON.parse(saved) as RetroCard[];
      } catch (e) {
        this.cards = [...INITIAL_DEMO_CARDS];
      }
    } else {
      this.cards = [...INITIAL_DEMO_CARDS];
      this.save();
    }
  }

  public save(): void {
    localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(this.cards));
    this.notify();
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

  public addCard(category: RetroCategory, text: string): RetroCard {
    const newCard: RetroCard = {
      id: 'card-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      category: category,
      text: text.trim(),
      likes: 0,
      timestamp: getCurrentTimeString(),
      author: generateAnonymousCodename()
    };
    this.cards.unshift(newCard);
    this.save();
    return newCard;
  }

  public likeCard(id: string): void {
    const card = this.cards.find(c => c.id === id);
    if (card) {
      card.likes = (card.likes || 0) + 1;
      this.save();
    }
  }

  public moveCard(id: string, targetCategory: RetroCategory): void {
    const card = this.cards.find(c => c.id === id);
    if (card) {
      card.category = targetCategory;
      this.save();
    }
  }

  public deleteCard(id: string): void {
    this.cards = this.cards.filter(c => c.id !== id);
    this.save();
  }

  public clearAll(): void {
    this.cards = [];
    this.save();
  }

  public getCards(): RetroCard[] {
    return [...this.cards];
  }
}

export const store = new RetroStore();
