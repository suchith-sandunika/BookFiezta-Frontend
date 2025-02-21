import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  imports: [FormsModule, CommonModule],
  templateUrl: './books.component.html',
  standalone: true,
  styleUrl: './books.component.css'
})

export class BooksComponent implements OnInit {
  constructor(private router: Router) {}

  booksFound: boolean = false;
  latestBooksFound: boolean = false;
  allBooks: Array<any> = [];
  latestBooks: Array<any> = [];
  redirectLink: string = '';

  async ngOnInit(): Promise<any> {
    await this.fecthAllBooks();
    await this.fetchLatestBooks();
  }

  async fecthAllBooks(): Promise<any> {
    try {
      const booksResponse = await axios.get('http://localhost:8000/api/books');
      if(booksResponse.status === 200) {
        this.booksFound = true;
        this.allBooks = booksResponse.data.data;
        console.log(this.allBooks);
      } else {
        this.booksFound = false;
        console.error('Failed to fetch books');
      }
    } catch (error) {
      console.error('Error', error);
    }
  }

  async fetchLatestBooks(): Promise<any> {
    try {
      const latestBooksResponse = await axios.get('http://localhost:8000/api/books/latest');
      if(latestBooksResponse.status === 200) {
        this.latestBooksFound = true;
        this.latestBooks = latestBooksResponse.data.data;
        console.log(this.latestBooks);
      } else {
        this.latestBooksFound = false;
        console.error('Failed to fetch latest books');
      }
    } catch (error) {
      console.error('Error', error);
    }
  }

  trackByFn(index: number, book: any): number {
    return book.id; // Assuming each book has a unique `id` ...
  }

  viewBook(name: string, event: Event): any {
    event.preventDefault();
    this.redirectLink = `book-details/${name}`;
    this.router.navigate([this.redirectLink]);
  }
}
