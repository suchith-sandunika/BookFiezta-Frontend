import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import axios from 'axios';

@Component({
  selector: 'app-optionaldata',
  imports: [
    FormsModule
  ],
  templateUrl: './optionaldata.component.html',
  standalone: true,
  styleUrl: './optionaldata.component.css'
})

export class OptionaldataComponent {
  userName: string = '';
  userEmail: string = '';
  dateofBirth: Date = new Date("");
  userAge: string = '';
  userPhoneNumber: string = '';
  userPhoneNumberAreaCode: string = '';
  isLoading: boolean = false;

  ageValue: number = 0;
  areaCodeValue: string = '';
  phoneNumberValue: string = '';
  fullPhoneNumber: string = '';

  yearGap: number = 0;
  monthGap: number = 0;
  dayGap: number = 0;

  currentYear: number = 0;
  currentMonth: number = 0;
  currentDay: number = 0;

  constructor(private router: Router, private userService: UserService) {
    this.userEmail = this.userService.getUserEmail();
    this.userName = this.userService.getUserName();
    console.log(this.userName, this.userEmail);
  }

  skipOperation(): any {
    this.isLoading = true;
    this.router.navigate(['login']);
    this.isLoading = false;
  }

  handleAge(): any {
    console.log(this.dateofBirth);
    const currentDate = new Date();
    const enteredDate = new Date(this.dateofBirth);

    // Avoid the wrong dates ...
    if(currentDate.getFullYear() < enteredDate.getFullYear()) {
      alert('Invalid Date Selection');
      return;
    }

    if(currentDate.getFullYear() == enteredDate.getFullYear() && currentDate.getMonth() < enteredDate.getMonth()) {
      alert('Invalid Date Selection');
      return;
    }

    if(currentDate.getFullYear() == enteredDate.getFullYear() && currentDate.getMonth() == enteredDate.getMonth() && currentDate.getDate() < enteredDate.getDate()) {
      alert('Invalid Date Selection');
      return;
    }

    if(currentDate.getMonth() < enteredDate.getMonth() && currentDate.getDate() > enteredDate.getDate()){
      console.log('Condition 1 Running');
      this.currentYear = currentDate.getFullYear() - 1;
      this.currentMonth = currentDate.getMonth() + 12;
      this.yearGap = this.currentYear - enteredDate.getFullYear();
      this.monthGap = this.currentMonth - enteredDate.getMonth();
      this.dayGap = currentDate.getDate() - enteredDate.getDate();
    } else if(currentDate.getMonth() > enteredDate.getMonth() && currentDate.getDate() < enteredDate.getDate()){
      console.log('Condition 2 Running');
      this.currentMonth = currentDate.getMonth() - 1;
      this.currentDay = currentDate.getDate() + 30;
      this.yearGap = currentDate.getFullYear() - enteredDate.getFullYear();
      this.monthGap = this.currentMonth - enteredDate.getMonth();
      this.dayGap = this.currentDay - enteredDate.getDate();
    } else if(currentDate.getDate() < enteredDate.getDate() && currentDate.getDate() < enteredDate.getDate()){
      console.log('Condition 3 Running');
      this.currentYear = currentDate.getFullYear() - 1;
      this.currentMonth = (currentDate.getMonth() - 1) + 12;
      this.currentDay = currentDate.getDate() + 30;
      this.yearGap = this.currentYear - enteredDate.getFullYear();
      this.monthGap = this.currentMonth - enteredDate.getMonth();
      this.dayGap = this.currentDay - enteredDate.getDate();
    } else {
      console.log('Else Part Running');
      this.yearGap = currentDate.getFullYear() - enteredDate.getFullYear();
      this.monthGap = currentDate.getMonth() - enteredDate.getMonth();
      this.dayGap = currentDate.getDate() - enteredDate.getDate();
    }

    console.log(`${this.yearGap} Years - ${this.monthGap} Months - ${this.dayGap} Days`);

    if(this.yearGap == 0 && this.monthGap == 0) {
      this.userAge = `${this.dayGap} Days`;
      this.ageValue = this.dayGap;
    } else if(this.yearGap == 0 && this.monthGap != 0) {
      this.userAge = `${this.monthGap} Months`;
      this.ageValue = this.monthGap;
    } else {
      this.userAge = `${this.yearGap} Years`;
      this.ageValue = this.yearGap;
    }
  }

  async confimData(): Promise<any> {

    if(this.userPhoneNumber.length !== 0 && this.userPhoneNumberAreaCode.length == 0) {
      alert('Please enter the Phone Number Area Code');
      return;
    }

    if(this.userPhoneNumber.length == 0 && this.userPhoneNumberAreaCode.length !== 0) {
      alert('Please enter the Phone Number');
      return;
    }

    if(this.userPhoneNumberAreaCode.length != 0 && this.userPhoneNumber.length == 10) {
      this.phoneNumberValue = this.userPhoneNumber.slice(1);
      console.log(this.phoneNumberValue);
      this.areaCodeValue = this.userPhoneNumberAreaCode.slice(1);
      this.fullPhoneNumber = this.areaCodeValue.concat(this.phoneNumberValue);
    } else {
      this.areaCodeValue = this.userPhoneNumberAreaCode.slice(1);
      this.fullPhoneNumber = this.areaCodeValue.concat(this.userPhoneNumber);
    }

    console.log(this.fullPhoneNumber);

    try {
      const updateDOBAGEResponse = await axios.put('http://localhost:8000/api/user/update/dob/age', {userName: this.userName, age: this.ageValue, dob: new Date(this.dateofBirth)});
      console.log(updateDOBAGEResponse);
      if(updateDOBAGEResponse.status == 200) {
        const sendMobileOTPResponse = await axios.post('http://localhost:8000/api/auth/sendOTP/mobile', {mobileNumber: this.fullPhoneNumber});
        console.log(sendMobileOTPResponse);
        if(sendMobileOTPResponse.status == 200) {
          alert('User Data Updated. An OTP has been sent to verify your phone number');
          this.userService.setUserPhoneNumber(this.fullPhoneNumber);
          await this.router.navigate(['verify-mobile']);
          return;
        } else {
          console.log('Error Occurred While Sending OTP');
          return;
        }
      } else {
        console.log('Error Occurred');
        return;
      }
    } catch (error: any) {
      console.log('Error:', error.message);
      return;
    }
  }
}
