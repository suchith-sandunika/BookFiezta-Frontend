import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HomeComponent } from '../../components/home/home.component';
import { AboutusComponent } from "../../components/aboutus/aboutus.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ContactusComponent } from "../../components/contactus/contactus.component";

@Component({
  selector: 'app-homepage',
  imports: [NavbarComponent, HomeComponent, AboutusComponent, FooterComponent, ContactusComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})

export class HomepageComponent {

}
