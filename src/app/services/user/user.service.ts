import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private userEmail: string = '';
  private userName: string = '';
  private userPhoneNumber: string = '';

  setUserDetails(email: string, name: string) {
    this.userEmail = email;
    this.userName = name;
  }

  setUserEmail(email: string) {
    this.userEmail = email;
  }

  setUserName(name: string) {
    this.userName = name;
  }

  setLoggedUserDetails(email: string) {
    this.userEmail = email;
  }

  getUserEmail(): string {
    return this.userEmail;
  }

  getUserName(): string {
    return this.userName;
  }

  getLoggedUserDetails(): string {
    return this.userEmail;
  }

  getUserPhoneNumber(): string {
    return this.userPhoneNumber;
  }

  setUserPhoneNumber(phone: string) {
    this.userPhoneNumber = phone;
  }
}
