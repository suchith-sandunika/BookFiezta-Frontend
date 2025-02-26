import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-admin-add-book',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './admin-add-book.component.html',
  styleUrl: './admin-add-book.component.css'
})

export class AdminAddBookComponent {
  constructor(private router: Router) {}

  uploadedImage: File | null = null;
  uploadedImageName: string | null = null;
  imageLink: string | null = null;

  bookName: string = '';
  bookAuthor: string = '';
  bookPublishers: string = '';
  bookPublishedYear: number = NaN;
  bookDescription: string = '';
  bookPrice: string = '';
  selectedGenre: string = '';

  // File upload handler
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadedImage = file; // Store the image name ...
      this.uploadedImageName = file.name;
      console.log(this.uploadedImage, this.uploadedImageName);
    }
  }

  async addBook(): Promise<any> {
    console.log(this.bookName, this.bookAuthor, this.bookPublishers, this.bookDescription, this.bookPrice, this.selectedGenre);
    console.log(this.uploadedImage);

    // Check if all the fields are filled ...
    if (this.bookName.length == 0 || this.bookAuthor.length == 0 || this.bookPublishers.length == 0 || this.bookPrice.length == 0 || this.selectedGenre.length == 0 || Number.isNaN(this.bookPublishedYear)) {
      alert('Please fill all the required fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.bookName);
    formData.append('auther', this.bookAuthor);
    formData.append('publishers', this.bookPublishers);
    formData.append('publishedYear', this.bookPublishedYear.toString());
    formData.append('description', this.bookDescription);
    formData.append('price', this.bookPrice);
    formData.append('genre', this.selectedGenre);
    // Check whether the image is added ...
    if (this.uploadedImage) {
      formData.append('image', this.uploadedImage);
    }

    // Send the data to the server to add the book ...
    try {
      const addBookResponse = await axios.post('http://localhost:8000/api/books/add', formData);
      if (addBookResponse.status === 201) {
        alert('Book added successfully');
        await this.router.navigate(['/admin-home']);
      } else {
        alert('Error adding book');
        return;
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      return;
    }
  }
}
