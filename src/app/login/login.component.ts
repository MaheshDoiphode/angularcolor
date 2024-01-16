import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate(500, style({ opacity: 0 }))
      ])
    ]),
    trigger('focusPanel', [
      transition('void => *', [
        animate(500, keyframes([
          style({transform: 'scale(1)', offset: 0}),
          style({transform: 'scale(1.05)', offset: 0.5}),
          style({transform: 'scale(1)', offset: 1.0})
        ]))
      ])
    ]),
  ]
})
export class LoginComponent {
  user = {
    username: 'NGtest',
    password: 'ngpass'
  };

  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) { }

  login(): void {
    this.userService.login(this.user).subscribe(
      response => {
        console.log('Login successful', response);
        localStorage.setItem('username', this.user.username);
        this.router.navigate(['/game']);
      },
      error => {
        this.errorMessage = 'Login failed: ' + error.message;
      }
    );
  }
}
