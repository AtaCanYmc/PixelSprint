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
  isHost?: boolean;
}

export type UserRole = 'host' | 'guest';

export interface CategoryConfig {
  key: RetroCategory;
  title: string;
}

export type StateChangeListener = (cards: RetroCard[]) => void;

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export type RealtimeEventType =
  | 'ADD_CARD'
  | 'UPVOTE_CARD'
  | 'DOWNVOTE_CARD'
  | 'MOVE_CARD'
  | 'DELETE_CARD'
  | 'CLEAR_CARDS'
  | 'SYNC_STATE'
  | 'REQUEST_SYNC';

export interface RealtimeMessage {
  type: RealtimeEventType;
  sessionId: string;
  senderId: string;
  timestamp: number;
  payload?: any;
}

export type Language = 'tr' | 'en' | 'fr';
export type ThemeMode = 'light' | 'dark';

export type AiAnalysisType = 'summary' | 'action_plan' | 'root_cause' | 'sentiment' | 'jira';
export type AiRole = 'agile_coach' | 'scrum_master' | 'executive' | 'peer';
