import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/general-components/navbar/navbar.component';
import { HomeComponent } from '../../components/general-components/home/home.component';
import { AboutusComponent } from "../../components/general-components/aboutus/aboutus.component";
import { FooterComponent } from "../../components/general-components/footer/footer.component";
import { ContactusComponent } from "../../components/general-components/contactus/contactus.component";

@Component({
  selector: 'app-homepage',
  imports: [NavbarComponent, HomeComponent, AboutusComponent, FooterComponent, ContactusComponent],
  templateUrl: './homepage.component.html',
  standalone: true,
  styleUrl: './homepage.component.css'
})

export class HomepageComponent {

}
