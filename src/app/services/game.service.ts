import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'https://demo-spring-8h3e.onrender.com';
  //private apiUrl = 'http://localhost:8080';
  private socketUrl = 'ws://https:demo-spring-8h3e.onrender.com/get';
  private socket$: WebSocketSubject<any> | null = null;
  private timerSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient,
    ) {
    //this.connectWebSocket();
  }

  private connectWebSocket(): void {
    this.socket$ = webSocket(this.socketUrl);
    this.socket$.subscribe(
      msg => {
        this.timerSubject.next(msg);
      },
      err => console.error(err),
      () => console.warn('WebSocket connection completed')
    );
  }

  public getTimerUpdates(): Observable<number> {
    return this.timerSubject.asObservable();
  }

  getGameResults(): Observable<any> {
    return this.http.get(`${this.apiUrl}/game/rounds`);
  }
  placeBet(betDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/finance/bet`, betDetails);
  }

  
  rechargeAccount(rechargeDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/finance/recharge`, rechargeDetails);
  }
}
