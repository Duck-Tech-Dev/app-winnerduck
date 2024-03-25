export default class LocalService {
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
}
