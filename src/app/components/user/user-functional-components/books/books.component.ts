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
  filteredBooks: Array<any> = [];
  filteredLatestBooks: Array<any> = [];
  redirectLink: string = '';
  searchInput1: string = '';
  searchInput2: string = '';

  token: string | null = localStorage.getItem('token');

  async ngOnInit(): Promise<any> {
    if(this.searchInput1 == '') {
      await this.fetchLatestBooks();
    } else {
      await this.filterLatestBooks();
    }

    if(this.searchInput2 == '') {
      await this.fecthAllBooks();
    } else {
      await this.filterBooks();
    }
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
        alert('Failed to fetch books');
        return;
      }
      // if(this.token) {
      //   console.log(this.token);
      //   const booksResponse = await axios.get('http://localhost:8000/api/books', {headers: {'Authorization': `Bearer ${this.token}`}});
      //   if(booksResponse.status === 200) {
      //     this.booksFound = true;
      //     this.allBooks = booksResponse.data.data;
      //     console.log(this.allBooks);
      //   } else {
      //     this.booksFound = false;
      //     console.error('Failed to fetch books');
      //   }
      // } else {
      //   alert('Authentication Error!!');
      // }
    } catch (error) {
      console.error('Error', error);
      return;
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
        alert('Failed to fetch latest books');
        return;
      }
    } catch (error) {
      console.error('Error', error);
      return;
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

  async filterBooks(): Promise<void> {
    this.filteredBooks = this.allBooks.filter(book =>
      book.name.toLowerCase().includes(this.searchInput2.toLowerCase()) ||
      book.auther.toLowerCase().includes(this.searchInput2.toLowerCase()) ||
      book.publishers.toLowerCase().includes(this.searchInput2.toLowerCase()) ||
      book.genre.toLowerCase().includes(this.searchInput2.toLowerCase())
    )
    console.log(this.filteredBooks);

    if(this.filteredBooks.length > 0) {
      this.booksFound = true;
      this.allBooks = [...this.filteredBooks];
    } else {
      this.booksFound = false;
    }
  }

  async filterLatestBooks(): Promise<void> {
    this.filteredLatestBooks = this.latestBooks.filter(book =>
      book.name.toLowerCase().includes(this.searchInput2.toLowerCase()) ||
      book.auther.toLowerCase().includes(this.searchInput2.toLowerCase()) ||
      book.publishers.toLowerCase().includes(this.searchInput2.toLowerCase()) ||
      book.genre.toLowerCase().includes(this.searchInput2.toLowerCase())
    )
    console.log(this.filteredLatestBooks);

    if(this.filteredLatestBooks.length > 0) {
      this.latestBooksFound = true;
      this.latestBooks = [...this.filteredLatestBooks];
    } else {
      this.latestBooksFound = false;
    }
  }
}
