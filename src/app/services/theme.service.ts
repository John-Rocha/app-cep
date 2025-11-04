import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'app-cep-theme';
  private themeSubject: BehaviorSubject<Theme>;
  private mediaQuery: MediaQueryList;

  constructor() {
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = this.getSavedTheme();
    this.themeSubject = new BehaviorSubject<Theme>(savedTheme);

    // Aplica o tema inicial
    this.applyTheme(savedTheme);

    // Escuta mudanças na preferência do sistema
    this.mediaQuery.addEventListener('change', (e) => {
      if (this.themeSubject.value === 'system') {
        this.applySystemTheme();
      }
    });
  }

  /**
   * Retorna o tema atual como Observable
   */
  get theme$(): Observable<Theme> {
    return this.themeSubject.asObservable();
  }

  /**
   * Retorna o tema atual
   */
  get currentTheme(): Theme {
    return this.themeSubject.value;
  }

  /**
   * Define um novo tema
   */
  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    this.saveTheme(theme);
    this.applyTheme(theme);
  }

  /**
   * Alterna entre os temas disponíveis
   */
  toggleTheme(): void {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    this.setTheme(themes[nextIndex]);
  }

  /**
   * Retorna se o tema efetivo é dark (considerando system)
   */
  get isDarkMode(): boolean {
    if (this.currentTheme === 'dark') {
      return true;
    }
    if (this.currentTheme === 'system') {
      return this.mediaQuery.matches;
    }
    return false;
  }

  /**
   * Aplica o tema ao documento
   */
  private applyTheme(theme: Theme): void {
    const root = document.documentElement;

    // Remove classes anteriores
    root.classList.remove('light-theme', 'dark-theme');

    if (theme === 'system') {
      this.applySystemTheme();
    } else {
      root.classList.add(`${theme}-theme`);
    }
  }

  /**
   * Aplica o tema baseado na preferência do sistema
   */
  private applySystemTheme(): void {
    const root = document.documentElement;
    root.classList.remove('light-theme', 'dark-theme');

    if (this.mediaQuery.matches) {
      root.classList.add('dark-theme');
    } else {
      root.classList.add('light-theme');
    }
  }

  /**
   * Salva o tema no localStorage
   */
  private saveTheme(theme: Theme): void {
    localStorage.setItem(this.THEME_KEY, theme);
  }

  /**
   * Recupera o tema salvo do localStorage
   */
  private getSavedTheme(): Theme {
    const saved = localStorage.getItem(this.THEME_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      return saved;
    }
    return 'system'; // Tema padrão
  }
}
