import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AlertService {
  title: string = '';

  private messageSource = new BehaviorSubject<string | null>(null);
  currentMessage = this.messageSource.asObservable();

  showMessage(message: string, title: string) {
    this.messageSource.next(message);
    this.title = title;
    // Automatically hide the alert after 3 seconds
    setTimeout(() => {
      this.clearMessage();
    }, 3000);
  }

  clearMessage() {
    this.messageSource.next(null);
  }
}
