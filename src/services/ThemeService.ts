import LocalService from "./LocalService";

export default class ThemeService {
  static setThemeToDark(): void {
    document.documentElement.classList.toggle('dark', true);
    LocalService.setTheme('dark');
  }

  static setThemeToLight(): void {
    document.documentElement.classList.toggle('dark', false);
    LocalService.setTheme('light');
  }

  static toggleTheme(): void {
    document.documentElement.classList.toggle('dark');
    LocalService.setTheme(this.getTheme());
  }

  static getTheme(): 'dark' | 'light' {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }

  static setTheme(theme: 'dark' | 'light'): void {
    if (theme === 'dark') {
      this.setThemeToDark();
    } else {
      this.setThemeToLight();
    }
  }

  static setThemeFromLocal(): void {
    const theme = LocalService.getTheme();
    if (theme) {
      this.setTheme(theme);
    }
  }
}
