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
}
