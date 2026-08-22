/**
 * PixelSprint Core Theme Manager (TypeScript)
 * Handles Light Mode / Dark Mode state, system preferences, and localStorage persistence
 */

import { ThemeMode } from '../types';

export type ThemeChangeListener = (theme: ThemeMode) => void;

class ThemeEngine {
  private currentTheme: ThemeMode = 'light';
  private listeners: ThemeChangeListener[] = [];

  public init(): void {
    const savedTheme = localStorage.getItem('pixelsprint_theme') as ThemeMode | null;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      this.currentTheme = savedTheme;
    } else {
      // Auto-detect system preference
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentTheme = prefersDark ? 'dark' : 'light';
    }

    this.applyTheme();

    // Listen for system theme changes if user hasn't explicitly set preference
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('pixelsprint_theme')) {
          this.currentTheme = e.matches ? 'dark' : 'light';
          this.applyTheme();
        }
      });
    }
  }

  public getTheme(): ThemeMode {
    return this.currentTheme;
  }

  public toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('pixelsprint_theme', this.currentTheme);
    this.applyTheme();
  }

  public setTheme(theme: ThemeMode): void {
    this.currentTheme = theme;
    localStorage.setItem('pixelsprint_theme', theme);
    this.applyTheme();
  }

  private applyTheme(): void {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    this.notify();
  }

  public subscribe(listener: ThemeChangeListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((l) => l(this.currentTheme));
  }
}

export const themeEngine = new ThemeEngine();
