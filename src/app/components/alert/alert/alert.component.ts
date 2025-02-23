import { Component } from '@angular/core';
import { AlertService } from '../../../services/alert/alert.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  styleUrls: ['./alert.component.css']
})

export class AlertComponent {
  message: string | null = null;
  title: string = '';
  showToast = false;

  constructor(private alertService: AlertService) {
    this.alertService.currentMessage.subscribe((msg: string | null) => {
      if (msg) {
        this.message = msg;
        this.title = this.alertService.title; // Get the title from AlertService
        this.showToast = true;

        // Hide after 3 seconds
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      }
    });
  }
}
