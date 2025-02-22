import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import {NgForOf, NgIf} from '@angular/common';
import {SessionService} from '../../services/session/session.service';

@Component({
  selector: 'app-cart',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './cart.component.html',
  standalone: true,
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit {

  cartItems: any[] = [];
  userName: string = '';
  userId: string = '';
  total: number = 0;
  currencyUnit: string = 'USD';
  currencyAmount: number = 0;
  totalBalance: string = '0.00';

  constructor(private router: Router, private route: ActivatedRoute, private sessionService: SessionService) {}

  async ngOnInit(): Promise<void> {
    const name = this.route.snapshot.paramMap.get('name');
    this.userName = name !== null ? name : ''; // Get the username from the route ...
    console.log('User: ' + this.userName);

    try {
      const cartResponse = await axios.get(`http://localhost:8000/api/user/cart/${this.userName}`);
      console.log(cartResponse);
      if(cartResponse.status == 200) {
        this.userId = cartResponse.data.id;
        this.cartItems = cartResponse.data.data; // Populate the cart items array with the response data ...
        console.log('userId', this.userId);
        console.log('Cart items:', this.cartItems);
      } else if(cartResponse.status == 204) {
        this.cartItems = [];
        console.error('Cart is empty');
      } else {
        console.error('Failed to fetch cart');
      }
    } catch (error: any) {
      console.error('Error fetching cart items:', error);
    }
  }

  addBooks(): any {
    this.router.navigate(['/home'], { fragment: 'books' });
    //this.router.navigate(['/home'], { queryParams: { section: 'books' } });
  }

  backToHome(): any {
    this.router.navigate(['/home']);
  }

  async removeBookFromCart(id: string): Promise<any> {
    try {
      const removeBookFromCartResponse = await axios.patch('http://localhost:8000/api/user/cart/remove/book', {bookId: id, userId: this.userId});
      console.log(removeBookFromCartResponse);
      if(removeBookFromCartResponse.status == 200) {
        alert('Book removed successfully');
        const index = this.cartItems.findIndex(item => item.id === id);
        this.cartItems.splice(index, 1);
        console.log(this.cartItems);
      } else {
        console.log('An error occured while removing the book from the cart');
        return;
      }
    } catch (error) {
      console.log('Error Occured while removing book from the cart', error);
      return;
    }
  }

  onCheckboxChange(event: any, id: string, price: string) {
    const priceValue = price.split(" ");
    console.log(priceValue);
    this.currencyUnit = priceValue[0];
    this.currencyAmount = parseFloat(priceValue[1]);
    console.log(this.currencyUnit, this.currencyAmount);
    if(event.target.checked) {
      this.total = this.total + this.currencyAmount;
      this.totalBalance = this.total.toFixed(2);
      console.log(this.totalBalance);
    } else {
      this.total = this.total - this.currencyAmount;
      this.totalBalance = this.total.toFixed(2);
      console.log(this.totalBalance);
    }
  }

  pay(amount: string): any {
    alert('payment is in process');
    console.log(amount);
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
