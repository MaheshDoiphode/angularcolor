import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})


export class GameComponent implements OnInit {
  private timeSubscription!: Subscription;
  private apiUrl = 'https:demo-spring-8h3e.onrender.com/game';

  userBalance = 1000;
  gameResults: GameResult[] = [];
  userRounds: UserRound[] = [];
  countdownTimer: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages!: number;
Math: any;



  constructor(private gameService: GameService, private http: HttpClient) { }
  ngOnInit() {
    this.fetchGameResults();
    this.pollTime();
  }
  ngOnDestroy() {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }
  

  setPagination() {
    this.totalPages = Math.ceil(this.gameResults.length / this.itemsPerPage);
  }
  get paginatedResults() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.gameResults.slice(startIndex, startIndex + this.itemsPerPage);
  }
  pollTime() {
    this.timeSubscription = timer(0, 1000)  
      .pipe(
        switchMap(() => this.http.get<number>(`${this.apiUrl}/time`))
      )
      .subscribe(
        time => {
          this.countdownTimer = time;
          if (this.countdownTimer <= 0) {
            this.fetchNewTime();
          }
        },
        error => console.error('Error fetching time', error)
      );
  }
  fetchNewTime() {
    this.http.get<number>(`${this.apiUrl}/time`).subscribe(
      newTime => {
        this.countdownTimer = newTime;
      },
      error => console.error('Error fetching new time', error)
    );
  }
  
  

  fetchGameResults() {
    this.gameService.getGameResults().subscribe(
      data => {
        this.gameResults = data.sort((a: { period: number; }, b: { period: number; }) => a.period - b.period);
        this.setPagination();
      },
      error => console.error(error)
    );
  }

  placeBet(betType: string, betValue: string) {
    const betAmountInput = prompt("Enter your bet amount", "100");
    if (betAmountInput !== null) {
      const betAmount = +betAmountInput;
  
      if (!isNaN(betAmount) && betAmount > 0) {
        const betDetails = {
          username: localStorage.getItem('username'),
          betType: betType,
          betValue: betValue,
          betAmount: betAmount
        };
        
        this.gameService.placeBet(betDetails).subscribe(
          response => {
            console.log('Bet placed successfully');
            // You might want to update user balance or game state here
          },
          error => {
            console.error('Error placing bet', error);
          }
        );
      } else {
        console.log('Invalid bet amount entered');
      }
    } else {
      console.log('Bet placing cancelled');
    }
  }
  

  rechargeAccount() {
    const amountInput = prompt("Enter the amount to recharge", "500");
    if (amountInput !== null) {
      const amount = +amountInput;
  
      if (!isNaN(amount) && amount > 0) {
        const rechargeDetails = {
          username: localStorage.getItem('username'),
          amount: amount
        };
  
        this.gameService.rechargeAccount(rechargeDetails).subscribe(
          response => {
            console.log('Account recharged successfully');
            // Here you might want to update the user's balance in the UI
          },
          error => {
            console.error('Error in account recharge', error);
          }
        );
      } else {
        console.log('Invalid recharge amount entered');
      }
    } else {
      console.log('Recharge cancelled');
    }
  }
  

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

}



interface GameResult {
  period: string;
  price: number;
  number: number;
  result: string;
  resultClass: string;
}

interface UserRound {
  id: string;
  win: boolean;
  amount: number;
}