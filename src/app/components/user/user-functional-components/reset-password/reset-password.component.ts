import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { UserService } from '../../../../services/user/user.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, NgClass],
  templateUrl: './reset-password.component.html',
  standalone: true,
  styleUrl: './reset-password.component.css'
})

export class ResetPasswordComponent {

  userEmail: string = '';
  userPassword: string = '';
  userConfirmPassword: string = '';
  isLoading: boolean = false;

  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';

  constructor(private router: Router, private userService: UserService) {
    this.userEmail = this.userService.getUserEmail();
  }

  togglePassword() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  toggleConfirmPassword() {
    this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
  }

  checkNewPasswordStrength(): boolean {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    const result = passwordRegex.test(this.userPassword);
    return result;
  }

  async resetPassword () {
    this.isLoading = true;

    if(this.userPassword.length == 0 || this.userConfirmPassword.length == 0) {
      alert('Please fill all the fields');
      this.isLoading = false;
      return;
    }

    if(this.userPassword.length <= 8 && this.userPassword.length > 15) {
      alert('New Password must be between 8 and 15 characters');
      this.isLoading = false;
      return;
    }

    if(this.userPassword !== this.userConfirmPassword) {
      alert('Passwords do not match');
      this.isLoading = false;
      return;
    }

    if(!this.checkNewPasswordStrength()) {
      alert('New Password must contain numbers, symbols and letters');
      this.isLoading = false;
      return;
    }

    try {
      // Make an API call to reset the password ..
      const resetPasswordResponse = await axios.post('http://localhost:8000/api/auth/reset-password', {email: this.userEmail, password: this.userPassword});
      if(resetPasswordResponse.status == 200) {
        this.isLoading = false;
        alert('Password reset successfully');
        await this.router.navigate(['login']);
      } else {
        this.isLoading = false;
        alert('Failed to reset the password');
        return;
      }
    } catch (error : any) {
      this.isLoading = false;
      console.error('Error:', error);
      return;
    }
  }
}
