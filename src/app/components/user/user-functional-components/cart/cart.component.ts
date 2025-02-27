import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import {NgForOf, NgIf} from '@angular/common';
import {SessionService} from '../../../../services/session/session.service';

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
  purchasingItems: Array<any> = [];
  appURL: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private sessionService: SessionService) {}

  async ngOnInit(): Promise<void> {
    const name = this.route.snapshot.paramMap.get('name');
    this.userName = name !== null ? name : ''; // Get the username from the route ...
    this.appURL = window.location.origin;
    try {
      const cartResponse = await axios.get(`http://localhost:8000/api/user/cart/${this.userName}`);
      if(cartResponse.status == 200) {
        this.userId = cartResponse.data.id;
        this.cartItems = cartResponse.data.data; // Populate the cart items array with the response data ...
      } else if(cartResponse.status == 204) {
        this.cartItems = [];
        alert('Cart is empty');
        return;
      } else {
        alert('Failed to fetch cart');
        return;
      }
    } catch (error: any) {
      console.error('Error fetching cart items:', error);
      return;
    }
  }

  addBooks(): any {
    this.router.navigate(['/home'], { fragment: 'books' });
    //this.router.navigate(['/home'], { queryParams: { section: 'books' } });
  }

  addMore(): any {
    this.router.navigate(['/home'], { fragment: 'books' });
    //this.router.navigate(['/home'], { queryParams: { section: 'books' } });
  }

  backToHome(): any {
    this.router.navigate(['/home']);
  }

  async removeBookFromCart(id: string): Promise<any> {
    const index = this.cartItems.findIndex(item => item._id === id);
    try {
      const removeBookFromCartResponse = await axios.patch('http://localhost:8000/api/user/cart/remove/book', {bookId: id, userId: this.userId});
      if(removeBookFromCartResponse.status == 200) {
        alert('Book removed successfully');
        // remove the relevant item from cartItems array ...
        this.cartItems.splice(index, 1);
        window.location.reload();
      } else {
        alert('An error occurred while removing the book from the cart');
        return;
      }
    } catch (error) {
      console.log('Error Occurred while removing book from the cart', error);
      return;
    }
  }

  onCheckboxChange(event: any, id: string, name: string, publishers: string, price: string) {
    // get the numeric value of the price ...
    const priceValue = price.split(" ");
    this.currencyUnit = priceValue[0];
    // set the numeric value to a float ...
    this.currencyAmount = parseFloat(priceValue[1]);
    // const priceValueWithoutDecimals = priceValue[1].split(".");
    if(event.target.checked) {
      // checkbox ticked ...
      this.total = this.total + this.currencyAmount;
      this.totalBalance = this.total.toFixed(2);
      this.purchasingItems.push({ "bookId": id, "bookName": name, "publishers": publishers, "priceValue": parseFloat(String(this.currencyAmount)), "priceUnit": this.currencyUnit  });
      console.log(this.purchasingItems);
    } else {
      // checkbox tick removed ...
      this.total = this.total - this.currencyAmount;
      this.totalBalance = this.total.toFixed(2);
      this.purchasingItems = this.purchasingItems.filter(item => item.id !== id);
    }
  }

  async pay(): Promise<any> {
    try {
      const createOrderResponse = await axios.post('http://localhost:8000/api/user/create-order', { items: this.purchasingItems, userId: this.userId });
      if(createOrderResponse.status == 201) {
        console.log('Order Created');
        const orderId = createOrderResponse.data.data._id;
        const paymentResponse = await axios.post('http://localhost:8000/api/cart/pay', { items: this.purchasingItems, orderId: orderId, url: this.appURL });
        if(paymentResponse.status == 200) {
          console.log(paymentResponse.data.url);
          window.location.href = paymentResponse.data.url;
        } else {
          alert('Payment Failed');
          return;
        }
      } else {
        alert('Order Failed');
        return;
      }
    } catch (error: any) {
      console.log('Error Occurred', error);
      return;
    }
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
