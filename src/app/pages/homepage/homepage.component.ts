import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/general/navbar/navbar.component';
import { HomeComponent } from '../../components/general/home/home.component';
import { AboutusComponent } from "../../components/general/aboutus/aboutus.component";
import { FooterComponent } from "../../components/general/footer/footer.component";
import { ContactusComponent } from "../../components/general/contactus/contactus.component";

@Component({
  selector: 'app-homepage',
  imports: [NavbarComponent, HomeComponent, AboutusComponent, FooterComponent, ContactusComponent],
  templateUrl: './homepage.component.html',
  standalone: true,
  styleUrl: './homepage.component.css'
})

export class HomepageComponent {

}
