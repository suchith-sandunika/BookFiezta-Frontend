import { Component } from '@angular/core';
import { AdminNavbarComponent } from "../../components/admin/admin-genearl-components/admin-navbar/admin-navbar.component";
import { AdminHomeComponent } from "../../components/admin/admin-genearl-components/admin-home/admin-home.component";
import { FooterComponent } from "../../components/general-components/footer/footer.component";
import { AdminManageBooksComponent } from "../../components/admin/admin-functional-components/admin-manage-books/admin-manage-books.component";
import { AdminManageUsersComponent } from "../../components/admin/admin-functional-components/admin-manage-users/admin-manage-users.component";

@Component({
  selector: 'app-admin-user-homepage',
  imports: [AdminNavbarComponent, AdminHomeComponent, FooterComponent, AdminManageBooksComponent, AdminManageUsersComponent],
  templateUrl: './admin-user-homepage.component.html',
  standalone: true,
  styleUrl: './admin-user-homepage.component.css'
})

export class AdminUserHomepageComponent {

}
