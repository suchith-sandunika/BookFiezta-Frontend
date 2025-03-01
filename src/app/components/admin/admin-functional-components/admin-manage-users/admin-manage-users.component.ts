import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-admin-manage-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-manage-users.component.html',
  standalone: true,
  styleUrl: './admin-manage-users.component.css'
})

export class AdminManageUsersComponent implements OnInit{
  allUsers: Array<any> = [];
  filteredBooks: Array<any> = [];
  users: Array<any> = [];
  usersFound: boolean = false;
  profileLink: string = '';
  searchInput: string = '';

  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    if(this.searchInput == '') {
      await this.fetchAllUsers();
    } else {
      await this.filterUsers();
    }
  }

  trackByFn(index: number, user: any): number {
    return user.id; // Assuming each user has a unique `id`
  }

  viewUser(name: string): void {
    this.profileLink = `admin-view-employee/${name}`;
    this.router.navigate([this.profileLink]);
  }

  async fetchAllUsers(): Promise<void> {
    try {
      const usersResponse = await axios.get('http://localhost:8000/api/users');
      if(usersResponse.status == 200) {
        this.usersFound = true;
        this.allUsers = usersResponse.data;
        this.users = [...this.allUsers]; // Make a copy of the array to avoid mutation in the original array
        console.log(this.users);
      } else if(usersResponse.status == 404) {
        this.usersFound = false;
        alert('No books found');
        return;
      } else {
        alert('Error getting books');
        return;
      }
    } catch (error: any) {
      console.error('Error:', error);
      return;
    }
  }

  async filterUsers(): Promise<void> {
    this.filteredBooks = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchInput.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchInput.toLowerCase())
    )

    if(this.filteredBooks.length > 0) {
      this.usersFound = true;
      this.users = [...this.filteredBooks];
    } else {
      this.usersFound = false;
    }
  }
}
