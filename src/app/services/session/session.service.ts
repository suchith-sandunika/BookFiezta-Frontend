import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class SessionService {

  private timeoutDuration = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
  private timeout: any;

  constructor(private router: Router) {
    this.startTimer();
    this.listenForActivity();
  }

  private async startTimer(): Promise<any> {
    this.clearTimer();
    this.timeout = setTimeout(async () => {
      alert('Session expired! Logging out...');
      try {
        const sessionDataUpdateResponse = await axios.get('http://localhost:8000/api/auth/logout');
        console.log(sessionDataUpdateResponse);
        if(sessionDataUpdateResponse.status == 200) {
          this.router.navigate(['/login']); // Redirect to login
        } else {
          console.error('Error logging out:');
          return;
        }
      } catch (err: any) {
        console.error('Error updating session data:', err);
      }

    }, this.timeoutDuration);
  }

  private clearTimer() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  private listenForActivity() {
    window.addEventListener('mousemove', () => this.startTimer());
    window.addEventListener('keydown', () => this.startTimer());
  }
}
