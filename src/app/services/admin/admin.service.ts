import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  private adminEmail: string = '';
  private adminName: string = '';

  setAdminDetails(email: string, name: string) {
    this.adminEmail = email;
    this.adminName = name;
  }

  setAdminEmail(email: string) {
    this.adminEmail = email;
  }

  setAdminName(name: string) {
    this.adminName = name;
  }

  getAdminEmail(): string {
    return this.adminEmail;
  }

  getAdminName(): string {
    return this.adminName;
  }

  getAdminDetails(): string {
    return `${this.adminName} , ${this.adminEmail}`;
  }
}
