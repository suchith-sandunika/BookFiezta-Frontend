import { Component, Input, OnInit } from '@angular/core';
import axios from 'axios';
import { UserService } from '../../../../services/user/user.service';
import { Router } from '@angular/router';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-logged-user-navbar',
  imports: [],
  standalone: true,
  templateUrl: './logged-user-navbar.component.html',
  styleUrl: './logged-user-navbar.component.css'
})

export class LoggedUserNavbarComponent implements OnInit {
  loggedUserId: string = '';
  loggedUserEmail: string = '';
  loggedUserName: string = '';
  profileLink: string = ''; // Should be set based on the logged user's role and permissions...
  cartLink: string = ''; // Should be set based on the logged user's role and permissions...

  @Input() data!: string; // Should receive the loggedUserEmail ...

  constructor(private router: Router, private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    //console.log(`Logged user: ${this.data}`); // Log the logged user's email for testing purposes
    try {
      const sessionUserResponse = await axios.get('http://localhost:8000/api/session/loggedUser');
      if(sessionUserResponse.status == 200) {
        this.loggedUserId = sessionUserResponse.data.data[0].userId;
        this.loggedUserEmail = sessionUserResponse.data.data[0].email;
        await this.fetchUserData(this.loggedUserEmail);
        this.fetchUserCart(this.loggedUserName);
      } else {
        console.error('Failed to get logged user:', sessionUserResponse.data.message);
        alert('Failed to get logged user details');
        return;
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      return;
    }
  }

  async fetchUserData(userEmail: string) {
    // Fetch user data from the server
    try {
      const fetchDataResponse = await axios.get(`http://localhost:8000/api/users/searchByEmail/${userEmail}`);
      this.loggedUserName = fetchDataResponse.data.data.name;
      if(fetchDataResponse.status == 200) {
        this.profileLink = `/profile/${this.loggedUserName}`;
        //this.userService.setLoggedUserDetails(this.loggedUserName);
        return 'success';
      } else {
        console.log('Error fetching data');
        this.profileLink = '/profile'
        return 'error';
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      this.profileLink = '/profile'
      return 'error';
    }
  }

  fetchUserCart(userName: string): any {
    // Create the cart link for the logged user ...
    if(this.loggedUserName) {
      this.cartLink = `/cart/${userName}`;
    } else {
      this.cartLink = `/cart`;
    }
  }

  async logout() {
    try {
      const logoutResponse = await axios.get('http://localhost:8000/api/auth/logout');
      if(logoutResponse.status == 200) {
        alert('Successfully Logout from the System');
        this.authService.logoutAuth();
        await this.router.navigate(['login']);
      } else {
        alert('Something went wrong with logout');
        return;
      }
    } catch (error: any) {
      console.log('Error:', error.message);
      return;
    }
  }
}
