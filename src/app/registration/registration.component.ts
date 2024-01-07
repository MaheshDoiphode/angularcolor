import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor() { }

  onRegister(): void {
    // For now, just log the input values
    console.log('Registering:', this.username, this.email, this.password);
    // Here you will eventually add the logic to call the API for registration
  }
}
