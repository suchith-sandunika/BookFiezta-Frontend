import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {
  constructor(private router: Router) {}

  moveToLogin() {
    this.router.navigate(['/login']);
  }

  moveToRegister() {
    this.router.navigate(['/register']);
  }
}
