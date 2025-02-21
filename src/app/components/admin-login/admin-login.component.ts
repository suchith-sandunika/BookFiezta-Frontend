import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin/admin.service';
import axios from 'axios';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule],
  templateUrl: './admin-login.component.html',
  standalone: true,
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  constructor(private router: Router, private adminService: AdminService) {}

  adminEmail: string = '';
  adminPassword: string = '';
  isLoading: boolean = false;

  async login() {
    this.isLoading = true;
    // Check whether the data is empty ...
    if(this.adminEmail.length == 0 || this.adminPassword.length == 0) {
      alert('Please fill all relevant fields');
      this.isLoading = false;
      return;
    }

    try {
      const loginResponse = await axios.post('http://localhost:8000/api/admin/auth/login', {email: this.adminEmail, password: this.adminPassword})
      console.log(loginResponse);
      if(loginResponse.status == 200) {
        this.isLoading = false;
        alert('Login Successfull');
        //this.adminService.setAdminEmail(this.adminEmail);  // Save admin data in the service
        this.router.navigate(['admin-home']);
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
