import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-email-verification-reset-password',
  imports: [FormsModule],
  templateUrl: './email-verification-reset-password.component.html',
  standalone: true,
  styleUrl: './email-verification-reset-password.component.css'
})

export class EmailVerificationResetPasswordComponent {
  constructor(private router: Router, private userService: UserService) {}

  userEmail: string = '';
  isLoading: boolean = false;

  async verifyEmail() {
    this.isLoading = true;

    if(this.userEmail.length == 0) {
      this.isLoading = false;
      alert('Please enter the email');
      return;
    }

    try {
      const verifyEmailResponse = await axios.post('http://localhost:8000/api/auth/emailCheck', {email: this.userEmail});
      console.log(verifyEmailResponse);
      if(verifyEmailResponse.status === 200) {
        this.isLoading = false;
        this.userService.setUserEmail(this.userEmail);
        alert('Email verified successfully');
        await this.router.navigate(['reset-password']);
      } else {
        this.isLoading = false;
        alert('Failed to verify the email');
        return;
      }
    } catch(error: any) {
      this.isLoading = false;
      console.log('An error occurred while verifying the email');
    }
  }
}
