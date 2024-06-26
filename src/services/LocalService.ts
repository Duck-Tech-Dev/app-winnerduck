type Theme = 'dark' | 'light';

export default class LocalService {
  // Raffle ID
  static getAllRaffles(): string[] {
    return JSON.parse(localStorage.getItem('submitted_raffles') || '[]');
  }

  static checkRaffleID(id: string):boolean {
    const raffles: string[] = this.getAllRaffles();
    return raffles.includes(id);
  }

  static addRaffleID(id: string): void {
    const raffles = this.getAllRaffles();
    raffles.push(id);
    localStorage.setItem('submitted_raffles', JSON.stringify(raffles));
  }

  // Theme
  static getTheme(): Theme {
    // try-catch is added just in case, if
    // local storage is disabled or any differencse 
    // for any platform for prefers-color-scheme 
    try {
      const theme = localStorage.getItem('theme');
      if (!theme) {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        return systemTheme as Theme;
      }
      return theme as Theme;
    }
    catch {
      return 'dark';
    }
  }

  static setTheme(theme: 'dark' | 'light'): void {
    localStorage.setItem('theme', theme);
  }
}
