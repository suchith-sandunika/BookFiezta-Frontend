import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-contactus',
  imports: [FormsModule],
  templateUrl: './contactus.component.html',
  standalone: true,
  styleUrl: './contactus.component.css'
})

export class ContactusComponent {
  constructor() {}

  name: string = '';
  email: string = '';
  message: string = '';
  isLoading: boolean = false;

  async submit() {
    this.isLoading = true;

    if(this.name.length == 0 || this.email.length == 0 || this.message.length == 0) {
      this.isLoading = false;
      alert("Please fill all fields");
      return;
    }

    try {
      const contactUsResponse = await axios.post('http://localhost:8000/api/contact-us', {name: this.name, email: this.email, message: this.message});
      if(contactUsResponse.status == 200) {
        this.isLoading = false;
        alert('Message sent successfully');
        this.name = '';
        this.email = '';
        this.message = '';
      } else {
        this.isLoading = false;
        alert('Something went wrong');
        return;
      }
    } catch (error: any) {
      this.isLoading = false;
      console.log("Error submitting form", error);
      return;
    }
  }
}
