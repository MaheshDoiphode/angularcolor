import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user = {
    username: '',
    email: '',
    password: '',
    dateOfBirth: '',
    contactNumber: ''
  };

  constructor(private userService: UserService) { }

  register(): void {
    this.userService.register(this.user).subscribe(
      response => {
        console.log('Registration successful', response);
      },
      error => {
        console.error('Registration failed', error);
      }
    );
  }
}
