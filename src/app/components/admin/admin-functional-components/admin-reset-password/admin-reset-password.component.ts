import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../../services/admin/admin.service';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-admin-reset-password',
  imports: [FormsModule],
  templateUrl: './admin-reset-password.component.html',
  standalone: true,
  styleUrl: './admin-reset-password.component.css'
})

export class AdminResetPasswordComponent {
  adminEmail: string = '';
  adminPassword: string = '';
  adminConfirmPassword: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private adminService: AdminService) {
    this.adminEmail = this.adminService.getAdminEmail();
    console.log(this.adminEmail);
  }

  async resetPassword () {
    this.isLoading = true;

    if(this.adminPassword.length == 0 || this.adminConfirmPassword.length == 0) {
      alert('Please fill all the fields');
      this.isLoading = false;
      return;
    }

    if(this.adminPassword !== this.adminConfirmPassword) {
      alert('Passwords do not match');
      this.isLoading = false;
      return;
    }

    try {
      // Make an API call to reset the password ...
      const resetPasswordResponse = await axios.post('http://localhost:8000/api/admin/auth/reset-password', {email: this.adminEmail, password: this.adminPassword});
      if(resetPasswordResponse.status == 200) {
        this.isLoading = false;
        alert('Password reset successfully');
        await this.router.navigate(['admin-login']);
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
