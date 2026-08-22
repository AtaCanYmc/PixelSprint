/**
 * PixelSprint Core Internationalization (i18n) Engine (TypeScript)
 * Handles TR, EN, FR language switching and localized text retrieval
 */

import { Language } from '../types';
import { locales, Translations } from './locales';

export type LanguageChangeListener = (lang: Language) => void;

class I18nEngine {
  private currentLang: Language = 'tr';
  private listeners: LanguageChangeListener[] = [];

  public init(): void {
    const savedLang = localStorage.getItem('pixelsprint_language') as Language | null;
    if (savedLang && (savedLang === 'tr' || savedLang === 'en' || savedLang === 'fr')) {
      this.currentLang = savedLang;
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('fr')) {
        this.currentLang = 'fr';
      } else if (browserLang.startsWith('en')) {
        this.currentLang = 'en';
      } else {
        this.currentLang = 'tr';
      }
    }
  }

  public getLanguage(): Language {
    return this.currentLang;
  }

  public setLanguage(lang: Language): void {
    if (this.currentLang === lang) return;
    this.currentLang = lang;
    localStorage.setItem('pixelsprint_language', lang);
    this.notify();
  }

  public t(key: keyof Translations): string {
    const dict = locales[this.currentLang] || locales.tr;
    return dict[key] || locales.tr[key] || String(key);
  }

  public getTranslations(): Translations {
    return locales[this.currentLang] || locales.tr;
  }

  public subscribe(listener: LanguageChangeListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((l) => l(this.currentLang));
  }
}

export const i18n = new I18nEngine();
