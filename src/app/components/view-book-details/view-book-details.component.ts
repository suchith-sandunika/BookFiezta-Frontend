import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-view-book-details',
  imports: [FormsModule, CommonModule],
  templateUrl: './view-book-details.component.html',
  standalone: true,
  styleUrl: './view-book-details.component.css'
})

export class ViewBookDetailsComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  imageLink: string = '';
  bookName: string = '';
  bookAuthor: string = '';
  bookPublishers: string = '';
  publishedYear: string = '';
  bookDescription: string = '';
  bookGenre: string = '';
  bookPrice: string = '';
  sells: string = '';
  ratings: string = '';
  viewedBook: string = '';
  loggedUserEmail: string = '';
  reviewButtonClicked: boolean = false;
  reviewMessage: string = '';
  reviews: Array<any> = [];

  async ngOnInit(): Promise<any> {
    const name = this.route.snapshot.paramMap.get('name');
    this.viewedBook = name !== null ? name : ''; // Get the user name from the route ...
    console.log('Selected Book: ' + this.viewedBook);
    // Fetch user data from the session ...
    await this.fetchLoggedUserDetails();
    // Fetch Book Details ...
    await this.fetchBookDetails(this.viewedBook);
  }

  async fetchLoggedUserDetails(): Promise<any> {
    // get the logged user data from the session ...
    try {
      const sessionUserResponse = await axios.get('http://localhost:8000/api/session/loggedUser');
      console.log(sessionUserResponse);
      if(sessionUserResponse.status == 200) {
        this.loggedUserEmail = sessionUserResponse.data.data[0].email;
        console.log('Logged User:', this.loggedUserEmail);
      } else {
        console.error('Failed to get logged user:', sessionUserResponse.data.message);
      }
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  }

  async fetchBookDetails(name: string): Promise<any> {
    try {
      // Fetch book details ...
      const bookResponse = await axios.get(`http://localhost:8000/api/books/name/${name}`);
      console.log(bookResponse);
      if(bookResponse.status == 200) {
        this.bookName = bookResponse.data.data.name;
        this.bookAuthor = bookResponse.data.data.auther;
        this.bookPublishers = bookResponse.data.data.publishers;
        this.publishedYear = bookResponse.data.data.publishedYear;
        this.bookDescription = bookResponse.data.data.description;
        this.bookGenre = bookResponse.data.data.genre;
        this.bookPrice = bookResponse.data.data.price;
        this.sells = bookResponse.data.data.sells;
        this.ratings = bookResponse.data.data.rating;
        this.reviews = bookResponse.data.data.reviews;
        this.imageLink = `http://localhost:8000/uploads/${bookResponse.data.data.image.name}`;
      } else {
        console.log('Error loading book');
        return;
      }
    } catch (error: any) {
      console.log('Error', error.message);
    }
  }

  async addToCart(name: string): Promise<any> {
    console.log('Adding book to cart:', name , 'For the Logged User', this.loggedUserEmail);
    try {
      const addToCartResponse = await axios.post('http://localhost:8000/api/user/book/addtocart', {userEmail: this.loggedUserEmail, bookName: name})
      console.log(addToCartResponse);
      if(addToCartResponse.status == 200) {
        alert('Book added to cart successfully');
        console.log(addToCartResponse.data);
        window.location.reload();
      } else {
        console.log('Error adding book to cart');
        return;
      }
    } catch (error: any) {
      console.log('Error', error.message);
    }
  }

  async rateBook(name: string): Promise<any> {
    try {
      const rateBookResponse = await axios.post('http://localhost:8000/api/user/book/rateBook', { userEmail: this.loggedUserEmail, bookName: this.bookName, bookPublisher: this.bookPublishers });
      console.log(rateBookResponse);
      if(rateBookResponse.status == 200) {
        alert('Book rated successfully');
        console.log(rateBookResponse.data);
        window.location.reload();
      } else {
        console.log('Error rating book');
        return;
      }
    } catch (error: any) {
      console.log('Error', error.message);
      return;
    }
  }

  addReview(name: string): any {
    this.reviewButtonClicked = true;
  }

  backToHome(): any {
    this.router.navigate(['home']);
  }

  async saveReview(): Promise<any> {
    try {
      if(this.reviewMessage.length == 0) {
        alert('Please enter a review message');
        return;
      }

      const reviewResponse = await axios.post('http://localhost:8000/api/user/book/addreview', { userEmail: this.loggedUserEmail, bookName: this.bookName, reviewBody: this.reviewMessage });
      console.log(reviewResponse);
      if(reviewResponse.status == 200) {
        alert('Review added successfully');
        this.reviewButtonClicked = false;
        this.reviewMessage = '';
        window.location.reload();
      } else {
        alert('Error adding review');
        return;
      }
    } catch (error: any) {
      console.log('Error', error.message);
      return;
    }
  }

  cancelReview(): any {
    this.reviewButtonClicked = false;
  }

  trackByFn(index: number, review: any): number {
    return review.id; // Assuming each review has a unique `id` ...
  }
}
