import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-admin-view-employee',
  imports: [FormsModule],
  templateUrl: './admin-view-employee.component.html',
  standalone: true,
  styleUrl: './admin-view-employee.component.css'
})

export class AdminViewEmployeeComponent {
  imageLink: string = '';
  userName: string = '';
  userEmail: string = '';
  joinedDate: string = '';
  purchasedBooks: Array<any> = [];
  cart: Array<any> = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<any> {
    // Get the username from the route parameter and fetch the user data...
    const name = this.route.snapshot.paramMap.get('name');
    this.userName = name !== null ? name : ''; // Get the user name from the route ...
    // Fetch the user data ...
    try {
       const userDataResponse = await axios.get(`http://localhost:8000/api/users/searchByName/${this.userName}`);
       if(userDataResponse.status == 200) {
         this.userEmail = userDataResponse.data.data.email;
         this.joinedDate = userDataResponse.data.data.createdDate;
         this.purchasedBooks = userDataResponse.data.data.purchasedBooks;
         this.cart = userDataResponse.data.data.cart;
         this.imageLink = `http://localhost:8000/uploads/${userDataResponse.data.data.image.name}`;
       } else {
         alert('Failed to fetch user data');
         return;
       }
    } catch (error: any) {
      console.error('Error Occurred:', error);
      return;
    }
  }

  async deleteUser(): Promise<any> {
    try {
      const deleteUserResponse = await axios.delete(`http://localhost:8000/api/user/profile/delete/${this.userName}`);
      if(deleteUserResponse.status == 200) {
        alert('User deleted successfully!');
        await this.router.navigate(['/admin-home']);  // Navigate to admin homepage ...
      } else {
        alert('Failed to delete user:');
        return;
      }
    } catch(error: any) {
      console.error('Error Occurred:', error);
      return;
    }
  }

  moveToHome(): any {
    this.router.navigate(['/admin-home']);  // Navigate to admin homepage ...
  }
 }
