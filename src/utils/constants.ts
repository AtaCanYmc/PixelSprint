/**
 * PixelSprint Constants (TypeScript)
 */

import { CategoryConfig, RetroCard } from '../types/index.js';

export const STORAGE_KEYS = {
  CARDS_PREFIX: 'pixelsprint_cards_session_',
  SESSIONS: 'pixelsprint_sessions_v1',
  ACTIVE_SESSION: 'pixelsprint_active_session_v1',
  SOUND: 'pixelsprint_sound_v1'
} as const;

export const RETRO_CODENAMES: readonly string[] = [
  'FloppyDisk-95', 'Agent-404', 'Kernel-Panic', 'Byte-Runner',
  'NullPointer', 'StackOverflow', 'Git-Push', 'Terminal-Ghost',
  'Matrix-Dev', 'Cyber-Pioneer', 'Cmd-User', 'Cache-Miss'
];

export const CATEGORIES: readonly CategoryConfig[] = [
  { key: 'went_well', title: '🟢 NEYİ İYİ YAPTIK? (Went Well)' },
  { key: 'improvement', title: '🔴 NEYİ BATIRDIK / GELİŞMELİ? (Needs Improvement)' },
  { key: 'action', title: '💡 AKSİYONLAR & FİKİRLER (Action Items)' }
];

export const INITIAL_DEMO_CARDS: readonly RetroCard[] = [
  {
    id: 'card-demo-1',
    category: 'went_well',
    text: 'Sprint hedeflerimizin %90\'ını zamanında canlıya aldık. Ekip iletişimi harikaydı! 🚀',
    upvotes: 4,
    downvotes: 0,
    timestamp: '14:20:00',
    author: 'FloppyDisk-95#404'
  },
  {
    id: 'card-demo-2',
    category: 'improvement',
    text: 'Kod inceleme (PR) süreçleri Cuma günleri çok yavaşlıyor. PR kuralları belirlemeliyiz.',
    upvotes: 6,
    downvotes: 1,
    timestamp: '14:22:15',
    author: 'Agent-404#101'
  },
  {
    id: 'card-demo-3',
    category: 'action',
    text: 'CI/CD pipeline test adımlarını paralelleştirerek build süresini düşürelim.',
    upvotes: 5,
    downvotes: 0,
    timestamp: '14:25:30',
    author: 'Byte-Runner#777'
  }
];
