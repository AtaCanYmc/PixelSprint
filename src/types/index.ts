/**
 * PixelSprint Type Definitions
 */

export type RetroCategory = 'went_well' | 'improvement' | 'action';

export interface RetroCard {
  id: string;
  category: RetroCategory;
  text: string;
  upvotes: number;
  downvotes: number;
  likes?: number;
  timestamp: string;
  author: string;
}

export interface RetroSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  cardCount?: number;
}

export interface CategoryConfig {
  key: RetroCategory;
  title: string;
}

export type StateChangeListener = (cards: RetroCard[]) => void;

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}
