import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from '../../app.routes';
import axios from 'axios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-view-book',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-view-book.component.html',
  standalone: true,
  styleUrl: './admin-view-book.component.css'
})

export class AdminViewBookComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  imageLink: string = '';
  uploadedImage: File | null = null;
  uploadedImageName: string | null = null;
  viewedBook: string = '';

  editButtonClicked: boolean = false;
  isLoading: boolean = false;

  bookName: string = '';
  bookAuthor: string = '';
  bookPublishers: string = '';
  bookDescription: string = '';
  bookPrice: string = '';
  bookGenre: string = '';
  bookCreatedDate: string = '';
  publishedYear: number = 0;
  sells: string = '';
  ratings: string = '';
  reviews: Array<any> = [];

  async ngOnInit(): Promise<any> {
    const name = this.route.snapshot.paramMap.get('name');
    this.viewedBook = name !== null ? name : ''; // Get the username from the route ...
    console.log('Selected Book: ' + this.viewedBook);

    try {
      const bookResponse = await axios.get(`http://localhost:8000/api/books/name/${this.viewedBook}`);
      if(bookResponse.status === 200) {
        this.bookName = bookResponse.data.data.name;
        this.bookAuthor = bookResponse.data.data.auther;
        this.bookPublishers = bookResponse.data.data.publishers;
        this.bookDescription = bookResponse.data.data.description;
        this.bookGenre = bookResponse.data.data.genre;
        this.bookPrice = bookResponse.data.data.price;
        this.bookCreatedDate = bookResponse.data.data.addedDate;
        this.publishedYear = bookResponse.data.data.publishedYear;
        this.sells = bookResponse.data.data.sells;
        this.ratings = bookResponse.data.data.rating;
        this.reviews = bookResponse.data.data.reviews;
        this.imageLink = `http://localhost:8000/uploads/${bookResponse.data.data.image.name}`;
      } else {
        alert('Error fetching data');
        return;
      }
    } catch (error: any) {
      console.log('Error', error.message);
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

  editBook(): any {
    this.editButtonClicked = true;
  }

  backToHome(): any {
    this.router.navigate(['admin-home'])
  }

  async updateBook(): Promise<any> {
    const formData = new FormData();
    formData.append('name', this.bookName);
    formData.append('author', this.bookAuthor);
    formData.append('publishers', this.bookPublishers);
    formData.append('description', this.bookDescription);
    formData.append('genre', this.bookGenre);
    formData.append('price', this.bookPrice);
    formData.append('publishedYear', this.publishedYear.toString());

    // Check whether the image is added ...
    if (this.uploadedImage) {
      formData.append('image', this.uploadedImage);
    }

    try {
      const updateBookResponse = await axios.put(`http://localhost:8000/api/books/update/${this.viewedBook}`, formData);
      if(updateBookResponse.status === 200) {
        alert('Book updated successfully');
        await this.router.navigate(['admin-home']);
      } else {
        alert('Error updating book');
        return;
      }
    } catch (error: any) {
      console.log('Error', error.message);
    }
  }

  async deleteBook(): Promise<any> {
    try {
      const deletBookResponse = await axios.delete(`http://localhost:8000/api/books/delete/${this.viewedBook}`);
      if(deletBookResponse.status == 200) {
        alert('Book deleted successfully');
        await this.router.navigate(['admin-home']);
      } else {
        alert('Error deleting book');
        return;
      }
    } catch(error: any) {
      console.log('Error', error.message);
      return;
    }
  }

  cancelUpdate(): any {
    this.editButtonClicked = false;
  }

  trackByFn(index: number, review: any): number {
    return review.id; // Assuming each review has a unique `id` ...
  }
}
