import { Component } from '@angular/core';
import { ThemeService, Theme } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css'],
})
export class ThemeToggleComponent {
  currentTheme: Theme = 'system';

  constructor(private themeService: ThemeService) {
    this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }

  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

  get isDarkMode(): boolean {
    return this.themeService.isDarkMode;
  }
}
