import { Component } from '@angular/core';
import { AdminNavbarComponent } from "../../components/admin-navbar/admin-navbar.component";
import { AdminHomeComponent } from "../../components/admin-home/admin-home.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AdminManageBooksComponent } from "../../components/admin-manage-books/admin-manage-books.component";
import { AdminManageUsersComponent } from "../../components/admin-manage-users/admin-manage-users.component";

@Component({
  selector: 'app-admin-user-homepage',
  imports: [AdminNavbarComponent, AdminHomeComponent, FooterComponent, AdminManageBooksComponent, AdminManageUsersComponent],
  templateUrl: './admin-user-homepage.component.html',
  styleUrl: './admin-user-homepage.component.css'
})

export class AdminUserHomepageComponent {

}
