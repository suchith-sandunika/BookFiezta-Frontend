import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import axios from 'axios';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
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

  constructor(private router: Router, private userService: UserService) {}

  async register() {
    this.isLoading = true;
    // Check whether the data is empty ...
    if(this.userName.length == 0 || this.userEmail.length == 0 || this.userPassword.length == 0 || this.userConfirmPassword.length == 0) {
      alert('Please fill all the fields');
      this.isLoading = false;
      return;
    }

    if(this.userPassword.length < 4 && this.userPassword.length > 10) {
      alert('Password must be between 4 and 10 characters');
      this.isLoading = false;
      return;
    }

    if(this.userPassword !== this.userConfirmPassword) {
      alert('Passwords do not match');
      this.isLoading = false;
      return;
    }

    try {
      // Call the API to register the user ...
      const response = await axios.post('http://localhost:8000/api/auth/register', {name: this.userName, email: this.userEmail, password: this.userPassword});
      console.log(response);
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
          alert('Email Verfication OTP has been sent to your email. Please validate your Email before registration');
          this.router.navigate(['verify-email']);
        }
      }
    } catch (error : any) {
      this.isLoading = false;
      console.error(error);
    }
  }
}
