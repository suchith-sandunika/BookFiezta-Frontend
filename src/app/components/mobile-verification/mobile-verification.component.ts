import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import axios from 'axios';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-mobile-verification',
  imports: [
    FormsModule
  ],
  templateUrl: './mobile-verification.component.html',
  standalone: true,
  styleUrl: './mobile-verification.component.css'
})
export class MobileVerificationComponent {
  userEmail: string = '';
  userName: string = '';
  userPhoneNumber: string = '';
  userOTP: string = '';
  isLoading1: boolean = false;
  isLoading2: boolean = false;

  constructor(private router: Router, private userService: UserService) {
    this.userEmail = this.userService.getUserEmail();
    this.userName = this.userService.getUserName();
    this.userPhoneNumber = this.userService.getUserPhoneNumber();
  }

  async verifyMobile() {
    this.isLoading1 = true;

    if(this.userOTP.length == 0) {
      alert('OTP is required');
      this.isLoading1 = false;
      return;
    }

    try {
      const verifyMobileOTPResponse = await axios.post('http://localhost:8000/api/auth/verifyOTP/mobile', {otp: this.userOTP, userName: this.userName, userEmail: this.userEmail});
      if(verifyMobileOTPResponse.status === 200) {
        this.isLoading1 = false;
        alert('Phone Number Updated Successfully');
        await this.router.navigate(['login']); // Redirect to login page if successful verification ...
      } else {
        this.isLoading1 = false;
        alert('Something went wrong');
        return;
      }
    } catch (error : any) {
      this.isLoading1 = false;
      console.error('Error verifying user:', error);
      return;
    }
  }

  async sendMobileOTPAgain(): Promise<any> {
    this.isLoading2 = true;
    try {
      const sendMobileOTPAgainResponse = await axios.post('http://localhost:8000/api/auth/sendOTP/mobile', {mobileNumber: this.userPhoneNumber});
      if(sendMobileOTPAgainResponse.status == 200) {
        this.isLoading2 = false;
        alert('OTP Sent Successfully To Your Email');
        const verifyNewlySentMobileOTPResponse = await axios.post('http://localhost:8000/api/auth/verifyOTP/mobile', {otp: this.userOTP, userName: this.userName, mobileNumber: this.userPhoneNumber});
        if(verifyNewlySentMobileOTPResponse.status == 200) {
          this.isLoading2 = false;
          alert('Phone Number Updated Successfully');
          await this.router.navigate(['login']); // Redirect to login page if successful verification ...
        } else {
          this.isLoading2 = false;
          alert('Something went wrong');
          return;
        }
      } else {
        this.isLoading2 = false;
        console.log('error occurred while sending the OTP');
        return;
      }
    } catch (error) {
      this.isLoading2 = false;
      console.error('Error verifying user:', error);
      return;
    }
  }

}
