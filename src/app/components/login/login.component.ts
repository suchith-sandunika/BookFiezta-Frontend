import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import {FormsModule} from '@angular/forms';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router, private userService: UserService) {}

  userEmail: string = '';
  userPassword: string = '';
  isLoading: boolean = false;

  async login() {
    this.isLoading = true;
    // Check whether the data is empty ...
    if(this.userEmail.length == 0 || this.userPassword.length == 0) {
      alert('Please fill all relevant fields');
      this.isLoading = false;
      return;
    }

    try {
      const loginResponse = await axios.post('http://localhost:8000/api/auth/login', {email: this.userEmail, password: this.userPassword})
      console.log(loginResponse);
      if(loginResponse.status == 200) {
        this.isLoading = false;
        alert('Login Successfull');
        this.userService.setUserEmail(this.userEmail);  // Save user data in the service
        this.router.navigate(['home']);
      } else {
        this.isLoading = false;
        alert('Login Failed. Please Check the data you entered.')
      }
    } catch (error: any) {
      this.isLoading = false;
      console.error('Error:', error.message);
      alert('An error occurred while trying to log in.');
    }
  }
}
