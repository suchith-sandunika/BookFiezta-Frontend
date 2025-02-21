import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  imports: [],
  templateUrl: './admin-navbar.component.html',
  standalone: true,
  styleUrl: './admin-navbar.component.css'
})

export class AdminNavbarComponent {

  constructor(private router: Router) {}
  logout() {
    this.router.navigate(['']);
  }
}
