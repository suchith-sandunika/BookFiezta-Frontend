import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor() {}

  loginAuth(): void {
    localStorage.setItem('token', 'user-authenticated');
  }

  logoutAuth(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Checks if a token is stored ...
  }
}
