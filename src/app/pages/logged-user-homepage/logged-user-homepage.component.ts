import {AfterViewInit, Component, OnInit} from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BooksComponent } from '../../components/books/books.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { LoggedUserNavbarComponent } from '../../components/logged-user-navbar/logged-user-navbar.component';
import { LoggedUserHomeComponent } from "../../components/logged-user-home/logged-user-home.component";
import { FeedbackComponent } from '../../components/feedback/feedback.component';
import axios from 'axios';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from '../../services/session/session.service';

@Component({
  selector: 'app-logged-user-homepage',
  imports: [LoggedUserNavbarComponent, BooksComponent, FooterComponent, LoggedUserHomeComponent, FeedbackComponent],
  standalone: true,
  templateUrl: './logged-user-homepage.component.html',
  styleUrl: './logged-user-homepage.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class LoggedUserHomepageComponent implements AfterViewInit {
  loggedUserEmail: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private sessionService: SessionService) { }

  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment === 'books') {
        setTimeout(() => {
          const booksElement = document.getElementById('books'); // Get the element by ID
          if (booksElement) {
            booksElement.scrollIntoView({ behavior: 'smooth' });
          } else {
            console.error("Books element not found!");
          }
        }, 0); // Small timeout to ensure rendering
      }
    });
  }

  async ngOnInit(): Promise<any> {
    await this.fetchLoggedUser();
    // this.route.queryParams.subscribe(params => {
    //   this.scrollToSection(params['section']);
    // });
  }

  // ngAfterViewInit() {
  //   // This is crucial for navigation within the app (when the query parameter changes without a full page reload)
  //   this.route.queryParams.subscribe(params => {
  //     this.scrollToSection(params['section']);
  //   });
  // }

  // scrollToSection(section: string | undefined) {
  //   if (section) { // Check if section is defined
  //     setTimeout(() => { // Gives time for the view to fully render
  //       const element = document.getElementById(section); // Use the section name as the ID
  //
  //       if (element) {
  //         element.scrollIntoView({ behavior: 'smooth' });
  //       } else {
  //         console.error(`Section "${section}" element not found!`);
  //         // Optional: Navigate to a default section or display a message
  //         // this.router.navigate(['/home'], { fragment: 'default-section' });
  //       }
  //     }, 0); // A timeout of 0 is often sufficient
  //   }
  // }

  async fetchLoggedUser(): Promise<string> {
    try {
      const sessionUserResponse = await axios.get('http://localhost:8000/api/session/loggedUser');
      console.log(sessionUserResponse);
      if(sessionUserResponse.status == 200) {
        this.loggedUserEmail = sessionUserResponse.data.data[0].email;
        console.log('Logged User:', this.loggedUserEmail);
        return this.loggedUserEmail;
      } else {
        console.error('Failed to get logged user:', sessionUserResponse.data.message);
        return 'error';
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      return 'error';
    }
  }
}
