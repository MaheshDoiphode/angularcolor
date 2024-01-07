import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
showComplaintsSuggestions() {
  console.log("showComplaintsSuggestions");


}
showBankDetails() {
  console.log("showBankDetails");
}
showWalletOptions() {
  console.log("showWalletOptions");
}
showPersonalInfo() {
  console.log("showPersonalInfo");
}
  userBalance = 1000; // Example balance
  gameResults = [
    { period: '20240104320', price: 1000, number: 8, result: 'Red', resultClass: 'text-danger' },
    { period: '20240104319', price: 1500, number: 1, result: 'Green', resultClass: 'text-success' },
    // Add more results as needed
  ];
  userRounds = [
    { id: '20240104320', win: true, amount: 196 },
    { id: '20240104319', win: false, amount: 0 },
    // Add more rounds as needed
  ];

  constructor() { }

  // Additional logic and methods for the game component here
}
