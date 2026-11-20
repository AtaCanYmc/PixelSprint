/**
 * PixelSprint Core Theme Manager (TypeScript)
 * Handles Light Mode / Dark Mode state, system preferences, <meta name="color-scheme"> sync, and localStorage persistence
 */

import { ThemeMode } from '../types';

export type ThemeChangeListener = (theme: ThemeMode) => void;

class ThemeEngine {
  private currentTheme: ThemeMode = 'light';
  private listeners: ThemeChangeListener[] = [];

  private getSystemTheme(): ThemeMode {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  public init(): void {
    const savedTheme = localStorage.getItem('pixelsprint_theme') as ThemeMode | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.currentTheme = savedTheme;
    } else {
      this.currentTheme = this.getSystemTheme();
    }

    this.applyTheme();

    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('pixelsprint_theme')) {
          this.currentTheme = e.matches ? 'dark' : 'light';
          this.applyTheme();
        }
      });
    }

    window.addEventListener('storage', (e) => {
      if (e.key === 'pixelsprint_theme') {
        const next = e.newValue as ThemeMode | null;
        this.currentTheme = next === 'light' || next === 'dark' ? next : this.getSystemTheme();
        this.applyTheme();
      }
    });
  }

  public getTheme(): ThemeMode {
    return this.currentTheme;
  }

  public toggleTheme(): void {
    const target: ThemeMode = this.currentTheme === 'light' ? 'dark' : 'light';
    const systemTheme = this.getSystemTheme();

    this.currentTheme = target;
    if (target === systemTheme) {
      localStorage.removeItem('pixelsprint_theme');
    } else {
      localStorage.setItem('pixelsprint_theme', target);
    }
    this.applyTheme();
  }

  public setTheme(theme: ThemeMode): void {
    this.currentTheme = theme;
    if (theme === this.getSystemTheme()) {
      localStorage.removeItem('pixelsprint_theme');
    } else {
      localStorage.setItem('pixelsprint_theme', theme);
    }
    this.applyTheme();
  }

  private applyTheme(): void {
    const saved = localStorage.getItem('pixelsprint_theme');
    const meta = document.querySelector('meta[name="color-scheme"]') as HTMLMetaElement | null;
    if (meta) {
      meta.content = saved === 'light' || saved === 'dark' ? saved : 'light dark';
    }
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
