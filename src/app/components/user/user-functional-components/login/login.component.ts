import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import {FormsModule} from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';
import {AuthService} from '../../../../services/auth/auth.service';
import {AlertService} from '../../../../services/alert/alert.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgClass],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}

  userEmail: string = '';
  userPassword: string = '';
  isLoading: boolean = false;

  passwordFieldType: string = 'password';

  togglePassword() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

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
      if(loginResponse.status == 200) {
        this.isLoading = false;
        this.authService.loginAuth();
        alert('Login Successfull');
        //this.alertService.showMessage('Login Successful!', 'success');
        localStorage.setItem('token', loginResponse.data.token);
        await this.router.navigate(['/home']);
      } else {
        this.isLoading = false;
        alert('Login Failed. Please Check the data you entered.');
        return;
      }
    } catch (error: any) {
      this.isLoading = false;
      console.error('Error:', error.message);
      alert('An error occurred while trying to log in.');
      return;
    }
  }
}
