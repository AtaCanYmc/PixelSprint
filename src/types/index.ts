/**
 * PixelSprint Type Definitions
 */

export type RetroCategory = 'went_well' | 'improvement' | 'action';

export interface RetroCard {
  id: string;
  category: RetroCategory;
  text: string;
  likes: number;
  timestamp: string;
  author: string;
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
