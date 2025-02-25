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
  status: string | null = '';
  orderId: string | null = '';
  token: string = '';

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
    console.log(this.router.url);
    if(this.router.url.includes('status') && this.router.url.includes('orderId') && this.router.url.includes('token')) {
      this.route.queryParams.subscribe(async params => {
        // Extract token and PayerID normally
        this.token = params['token'] || null;

        // Decode and fix the incorrect encoding of status and orderId
        let rawStatus = params['status']; // paid%3ForderId%3Dundefined
        if (rawStatus) {
          let decodedStatus = decodeURIComponent(rawStatus); // "paid?orderId=undefined"
          let statusParts = decodedStatus.split('?orderId=');

          this.status = statusParts[0] || null; // Extract "paid"
          this.orderId = statusParts[1] !== 'undefined' ? statusParts[1] : null; // Extract orderId
        }

        console.log('Status:', this.status);
        console.log('Order ID:', this.orderId);
        console.log('Token:', this.token);

        if (this.orderId != null || this.status != null || this.token != null) {
          if (this.status == 'paid') {
            await this.completePaymentInfo(this.orderId)
          } else {
            return;
          }
        } else {
          return;
        }
      });
    } else {
      return;
    }
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

  async completePaymentInfo(id: string | null): Promise<any> {
    try {
      const completeOrderResponse = await axios.post('http://localhost:8000/api/user/complete-order', { orderId: id, date: new Date(), token: this.token });
      console.log(completeOrderResponse);
      if(completeOrderResponse.status == 200) {
        const updatePurchasedItemResponse = await axios.post('http://localhost:8000/api/user/update-purchased-item', { orderId: id });
        console.log(updatePurchasedItemResponse);
        if(updatePurchasedItemResponse.status == 200) {
          alert('Payment Successfull');
          console.log('Payment Successfull');
          return;
        } else {
          alert('Payment Failed');
          return;
        }
      } else {
        alert('Error Occurred During the Payment. Try Again');
        return;
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      return;
    }
  }
}
