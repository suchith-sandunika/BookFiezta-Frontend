import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import axios from 'axios';
import { UserService } from '../../../../services/user/user.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, NgClass],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  userName: string = '';
  userEmail: string = '';
  userPassword: string = '';
  userConfirmPassword: string = '';
  isLoading: boolean = false;

  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';

  constructor(private router: Router, private userService: UserService) {}

  togglePassword() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  toggleConfirmPassword() {
    this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
  }

  checkPasswordStrength(): boolean {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    const result = passwordRegex.test(this.userPassword);
    return result;
  }

  checkEmailFormat(): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const result = emailRegex.test(this.userEmail);
    return result;
  }

  async register() {
    this.isLoading = true;
    // Check whether the data is empty ...
    if(this.userName.length == 0 || this.userEmail.length == 0 || this.userPassword.length == 0 || this.userConfirmPassword.length == 0) {
      alert('Please fill all the fields');
      this.isLoading = false;
      return;
    }

    if(this.userPassword.length <= 8 && this.userPassword.length > 15) {
      alert('Password must be between 8 and 15 characters');
      this.isLoading = false;
      return;
    }

    if(this.userPassword !== this.userConfirmPassword) {
      alert('Passwords do not match');
      this.isLoading = false;
      return;
    }

    if(!this.checkEmailFormat()) {
      alert('Wrong Email Format');
      this.isLoading = false;
      return;
    }

    if(!this.checkPasswordStrength()) {
      alert('Password must contain numbers, symbols and letters');
      this.isLoading = false;
      return;
    }

    try {
      // Call the API End Point to register the user ...
      const response = await axios.post('http://localhost:8000/api/auth/register', {name: this.userName, email: this.userEmail, password: this.userPassword});
      if(response.status !== 201) {
        alert('Registration failed');
        this.isLoading = false;
        return;
      } else {
        const otpsendResponse = await axios.post('http://localhost:8000/api/auth/sendOTP', {userEmail: this.userEmail});
        console.log(otpsendResponse);
        if(otpsendResponse.status !== 200) {
          alert('OTP sending failed');
          this.isLoading = false;
          return;
        } else {
          console.log(response.data);
          this.userService.setUserDetails(this.userEmail, this.userName);
          this.isLoading = false;
          alert('Email Verification OTP has been sent to your email. Please validate your Email before registration');
          await this.router.navigate(['verify-email']);
        }
      }
    } catch (error : any) {
      this.isLoading = false;
      console.error(error);
      return;
    }
  }
}
