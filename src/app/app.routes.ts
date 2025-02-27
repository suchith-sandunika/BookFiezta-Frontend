import { Routes } from '@angular/router';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegisterComponent } from './components/user/user-functional-components/register/register.component';
import { LoginComponent } from './components/user/user-functional-components/login/login.component';
import { ResetPasswordComponent } from './components/user/user-functional-components/reset-password/reset-password.component';
import { EmailVerificationResetPasswordComponent } from './components/user/user-functional-components/email-verification-reset-password/email-verification-reset-password.component';
import { EmailVerificationComponent } from './components/user/user-functional-components/email-verification/email-verification.component';
import { LoggedUserHomepageComponent } from './pages/logged-user-homepage/logged-user-homepage.component';
import { ProfileComponent } from './components/user/user-functional-components/profile/profile.component';
import { CartComponent } from './components/user/user-functional-components/cart/cart.component';
import { ViewBookDetailsComponent } from './components/user/user-functional-components/view-book-details/view-book-details.component';
import { OptionaldataComponent } from './components/user/user-functional-components/optionaldata/optionaldata.component';
import { MobileVerificationComponent } from './components/user/user-functional-components/mobile-verification/mobile-verification.component';

import { AdminLoginComponent } from './components/admin/admin-functional-components/admin-login/admin-login.component';
import { AdminResetPasswordComponent } from './components/admin/admin-functional-components/admin-reset-password/admin-reset-password.component';
import { AdminUserHomepageComponent } from './pages/admin-user-homepage/admin-user-homepage.component';
import { AdminViewEmployeeComponent } from './components/admin/admin-functional-components/admin-view-employee/admin-view-employee.component';
import { AdminAddBookComponent } from './components/admin/admin-functional-components/admin-add-book/admin-add-book.component';
import { AdminViewBookComponent } from './components/admin/admin-functional-components/admin-view-book/admin-view-book.component';


import {AuthGuard} from './guard/auth.guard';

export const routes: Routes = [

  // User Routes ...
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'enter-email-reset-password', component: EmailVerificationResetPasswordComponent},
  {path: 'verify-email', component: EmailVerificationComponent},
  {path: 'optional-data-add', component: OptionaldataComponent},
  {path: 'verify-mobile', component: MobileVerificationComponent},
  {path: 'home', component: LoggedUserHomepageComponent, canActivate: [AuthGuard]},
  {path: 'verify-email-reset-password', component: EmailVerificationResetPasswordComponent},
  {path: 'profile/:name', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'cart/:name', component: CartComponent, canActivate: [AuthGuard]},
  {path: 'book-details/:name', component: ViewBookDetailsComponent, canActivate: [AuthGuard]},

  // Admin Routes ...
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'admin-reset-password', component: AdminResetPasswordComponent},
  {path: 'admin-home', component: AdminUserHomepageComponent},
  {path: 'admin-view-employee/:name', component: AdminViewEmployeeComponent},
  {path: 'admin-add-book', component: AdminAddBookComponent},
  {path: 'admin-view-book/:name', component: AdminViewBookComponent}
];
