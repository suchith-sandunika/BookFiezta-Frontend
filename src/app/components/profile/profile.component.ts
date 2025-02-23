import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import {NgForOf} from '@angular/common';
import {SessionService} from '../../services/session/session.service';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, NgForOf],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.css'
})

export class ProfileComponent {
  isLoading: boolean = false;
  loggedUserName: string = '';
  userName: string = '';
  userEmail: string = '';
  joinedDate: string = '';
  userImage: string | null = null;
  imageLink: string = '';
  cart: Array<any> = [];
  purchasedBooks: Array<any> = [];

  uploadedImage: File | null = null;
  uploadedImageName: string | null = null;

  newUserName: string = '';
  newUserEmail: string = '';

  editButtonClicked: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private sessionService: SessionService) {}

  async ngOnInit() : Promise<void> {
    const name = this.route.snapshot.paramMap.get('name');
    this.loggedUserName = name !== null ? name : ''; // Get the user name from the route ...
    console.log('Logged User: ' + this.loggedUserName);

    try {
      // Fetch the user data ...
      const loggeduserDataResponse = await axios.get(`http://localhost:8000/api/users/searchByName/${this.loggedUserName}`);
      console.log(loggeduserDataResponse);
      if(loggeduserDataResponse.status === 200) {
        this.userName = loggeduserDataResponse.data.data.name;
        this.userEmail = loggeduserDataResponse.data.data.email;
        this.joinedDate = loggeduserDataResponse.data.data.createdDate;
        this.userImage = loggeduserDataResponse?.data?.data?.image?.name || null;

        if(this.userImage) {
          this.imageLink = `http://localhost:8000/uploads/${this.userImage}`;
        }

        // Fetch the user's cart ...
        this.cart = loggeduserDataResponse.data.data.cart;
        // Fetch the user's purchased books ...
        this.purchasedBooks = loggeduserDataResponse.data.data.purchasedBooks;
      } else {
        console.log('Error fetching data');
        return;
      }
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  }

  // File upload handler
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadedImage = file; // Store the image name
      this.uploadedImageName = file.name;
      console.log(this.uploadedImage, this.uploadedImageName);
    }
  }

  editProfile() {
    this.isLoading = true;
    this.editButtonClicked = true;
    this.isLoading = false;
  }

  backToHome() {
    this.isLoading = true;
    this.router.navigate(['/home']);
    this.isLoading = false;
  }

  async updateProfile() {
    this.editButtonClicked = false;
    this.isLoading = true;
    const formdata = new FormData();
    formdata.append('newUserName', this.userName);
    formdata.append('userEmail', this.userEmail);

    if (this.uploadedImage) {
      formdata.append('image', this.uploadedImage);
    }

    console.log(formdata);

    try {
      const updateProfileResponse = await axios.put(`http://localhost:8000/api/user/profile/update/${this.loggedUserName}`, formdata);
      console.log(updateProfileResponse);
      if(updateProfileResponse.status === 200) {
        this.isLoading = false;
        alert('Profile updated successfully');
        this.uploadedImage = null;
        this.uploadedImageName = null;
        //await this.router.navigate([`/profile/${this.userName}`]);
        window.location.reload();
      } else {
        this.isLoading = false;
        alert('Error updating profile');
        return;
      }
    } catch (error: any) {
      this.isLoading = false;
      console.error('Error:', error.message);
    }
  }

  async deleteProfile() {
    this.editButtonClicked = false;
    this.isLoading = true;
    try {
      const deleteProfileResponse = await axios.delete(`http://localhost:8000/api/user/profile/delete/${this.loggedUserName}`);
      console.log(deleteProfileResponse);
      if(deleteProfileResponse.status === 200) {
        this.isLoading = false;
        alert('Profile deleted successfully');
        await this.router.navigate(['']);
      } else {
        this.isLoading = false;
        alert('Error deleting profile');
        return;
      }
    } catch (error: any) {
      this.isLoading = false;
      console.error('Error:', error.message);
    }
  }

  cancelUpdate() {
    this.editButtonClicked = false;
    this.isLoading = true;
    this.router.navigate([`/profile/${this.loggedUserName}`]);
    this.isLoading = false;
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
