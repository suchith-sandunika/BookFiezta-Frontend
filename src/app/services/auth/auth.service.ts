import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor() {}

  loginAuth(): void {
    localStorage.setItem('token', 'user-authenticated');
  }

  // The localStorage.setItem method stores data in the browser's localStorage. Specifically, this function saves a key-value pair:
  //
  // Key: "token"
  // Value: "user-authenticated"

  logoutAuth(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Checks if a token is stored ...
  }
}
