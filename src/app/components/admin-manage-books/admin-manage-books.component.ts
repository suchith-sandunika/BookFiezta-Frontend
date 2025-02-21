import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-admin-manage-books',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './admin-manage-books.component.html',
  styleUrl: './admin-manage-books.component.css'
})

export class AdminManageBooksComponent implements OnInit {

  allBooks: Array<any> = [];
  books: Array<any> = [];
  booksFound: boolean = false;
  filteredBooks: Array<any> = [];
  searchInput: string = '';
  redirectLink: string = '';

  constructor(private router: Router) {}

  async ngOnInit(): Promise<any> {
    if(this.searchInput == '') {
      console.log(this.searchInput);
      await this.fetchAllBooks();
    } else {
      console.log(this.searchInput);
      await this.filterBooks();
    }
  }

  async fetchAllBooks(): Promise<void> {
    try {
      const booksResponse = await axios.get('http://localhost:8000/api/books');
      console.log(booksResponse);
      if(booksResponse.status == 200) {
        this.booksFound = true;
        this.allBooks = booksResponse.data.data;
        this.books = [...this.allBooks]; // Make a copy of the array to avoid mutation in the original array ...
        console.log(booksResponse.data.data.image);
      } else if(booksResponse.status == 404) {
        this.booksFound = false;
      } else {
        console.error('Error getting books');
      }
    } catch (error: any) {
      console.error('Error:', error);
    }
  }

  addNewBook(): any {
    this.router.navigate(['/admin-add-book']);
  }

  trackByFn(index: number, book: any): number {
    return book.id; // Assuming each book has a unique `id` ...
  }

  async filterBooks(): Promise<void> {
    this.filteredBooks = this.books.filter(book =>
      book.name.toLowerCase().includes(this.searchInput.toLowerCase()) ||
      book.auther.toLowerCase().includes(this.searchInput.toLowerCase()) ||
      book.publishers.toLowerCase().includes(this.searchInput.toLowerCase()) ||
      book.genre.toLowerCase().includes(this.searchInput.toLowerCase())
    )
    console.log(this.filteredBooks);

    if(this.filteredBooks.length > 0) {
      this.booksFound = true;
      this.books = [...this.filteredBooks];
    } else {
      this.booksFound = false;
    }
  }

  viewBook(name: string): any {
    this.redirectLink = `admin-view-book/${name}`;
    this.router.navigate([this.redirectLink]);
  }
}
