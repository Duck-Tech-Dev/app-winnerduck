export class APIService {
  static baseURL: string = process.env.API_URL || 'http://localhost:3000';

  static async logIn(username: string, password: string) {
    const response = await fetch(`${APIService.baseURL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ 
        "username": username, 
        "password": password
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    console.log("API Response from logIn:\n", response);
    return response;
  }

  static async signUp(username: string, email: string, password: string) {
    const response = await fetch(`${APIService.baseURL}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify({ 
        "username": username, 
        "email": email, 
        "password": password 
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    console.log("API Response from signUp:\n", response);
    return response;
  }

  static async checkConnection(): Promise<boolean> {
    const response = await fetch(`${APIService.baseURL}/auth/check`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    return response.ok;
  }

  static async checkRaffleID(raffleID: string): Promise<boolean> {
    const query = new URLSearchParams({ id: raffleID });
    const response = await fetch(`${APIService.baseURL}/raffle/check?` + query, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    return response.ok;
  }

  static async getRaffleInfo(raffleID: string): Promise<any> {
    const query = new URLSearchParams({ id: raffleID });
    const response = await fetch(`${APIService.baseURL}/raffle/info?` + query, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    return response.json();
  }

  static async postRaffleForm(raffleID: string, fields: Array<string | string[]>) {
    const query = new URLSearchParams({ id: raffleID });
    const response = await fetch(`${APIService.baseURL}/raffle/submit?` + query, {
      method: 'POST',
      body: JSON.stringify(fields),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    return response;
  }

}
