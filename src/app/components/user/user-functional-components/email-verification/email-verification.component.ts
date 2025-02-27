import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { UserService } from '../../../../services/user/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-email-verification',
  imports: [FormsModule],
  templateUrl: './email-verification.component.html',
  standalone: true,
  styleUrl: './email-verification.component.css'
})

export class EmailVerificationComponent {
  userEmail: string = '';
  userName: string = '';
  userOTP: string = '';
  isLoading1: boolean = false;
  isLoading2: boolean = false;

  constructor(private router: Router, private userService: UserService) {
    this.userEmail = this.userService.getUserEmail();
    this.userName = this.userService.getUserName();
  }

  async verifyUser() {
    this.isLoading1 = true;

    if(this.userOTP.length == 0) {
      alert('OTP is required');
      this.isLoading1 = false;
      return;
    }

    try {
      const verifyOTPResponse = await axios.post('http://localhost:8000/api/auth/verifyOTP', {otp: this.userOTP, userName: this.userName, userEmail: this.userEmail});
      if(verifyOTPResponse.status === 200) {
        this.isLoading1 = false;
        alert('Email Verified Successfully');
        await this.router.navigate(['optional-data-add']); // Redirect to login page if successful registration
      } else {
        this.isLoading1 = false;
        alert('Something went wrong');
        return;
      }
    } catch (error : any) {
      this.isLoading1 = false;
      console.error('Error verifying user:', error);
    }
  }

  async sendOTPAgain(): Promise<any> {
    this.isLoading2 = true;
    try {
      const sendOTPAgainResponse = await axios.post('http://localhost:8000/api/auth/sendOTP', {userEmail: this.userEmail});
      if(sendOTPAgainResponse.status == 200) {
        this.isLoading2 = false;
        alert('OTP Sent Successfully To Your Email');
        const verifyNewlySentOTPResponse = await axios.post('http://localhost:8000/api/auth/verifyOTP', {otp: this.userOTP, userName: this.userName, userEmail: this.userEmail});
        if(verifyNewlySentOTPResponse.status == 200) {
          this.isLoading2 = false;
          alert('Email Verified Successfully');
          await this.router.navigate(['optional-data-add']); // Redirect to login page if successful registration
        } else {
          this.isLoading2 = false;
          alert('Something went wrong');
        }
      } else {
        this.isLoading2 = false;
        alert('error occured while sending the OTP');
        return;
      }
    } catch (error) {
      this.isLoading2 = false;
      console.error('Error verifying user:', error);
      return;
    }
  }

}
