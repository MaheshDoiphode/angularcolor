import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://demo-spring-8h3e.onrender.com/user';

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user, { responseType: 'text' });
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user, { responseType: 'text' });
  }
}
