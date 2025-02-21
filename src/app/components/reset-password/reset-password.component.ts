import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  standalone: true,
  styleUrl: './reset-password.component.css'
})

export class ResetPasswordComponent {

  userEmail: string = '';
  userPassword: string = '';
  userConfirmPassword: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private userService: UserService) {
    this.userEmail = this.userService.getUserEmail();
  }

  async resetPassword () {
    this.isLoading = true;

    if(this.userPassword.length == 0 || this.userConfirmPassword.length == 0) {
      alert('Please fill all the fields');
      this.isLoading = false;
      return;
    }

    if(this.userPassword !== this.userConfirmPassword) {
      alert('Passwords do not match');
      this.isLoading = false;
      return;
    }

    try {
      // Make an API call to reset the password ..
      const resetPasswordResponse = await axios.post('http://localhost:8000/api/auth/reset-password', {email: this.userEmail, password: this.userPassword});
      console.log(resetPasswordResponse);
      if(resetPasswordResponse.status == 200) {
        this.isLoading = false;
        alert('Password reset successfully');
        this.router.navigate(['login']);
      } else {
        this.isLoading = false;
        alert('Failed to reset the password');
        return;
      }
    } catch (error : any) {
      this.isLoading = false;
      console.error('Error:', error);
    }
  }
}
