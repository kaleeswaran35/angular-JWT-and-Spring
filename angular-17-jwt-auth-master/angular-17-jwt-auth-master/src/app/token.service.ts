import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private token: string | null = null;
  private tokenUrl = '/api/authenticate'; // Token endpoint

  constructor(private http: HttpClient) { }

  // Retrieve and store the token
  setToken(token: string): void {
    this.token = token;
    // Optionally store token in local storage or session storage
    localStorage.setItem('authToken', token);
  }

  // Get the token from storage or service
  getToken(): Observable<string | any> {
    if (this.token) {
      //return Promise.resolve(this.token);
      //   return new Promise((resolve)=> {
      //     setTimeout(() => resolve(localStorage.getItem(this.token)), 100);
      //   })

      return of(this.token);
    } else {
      this.token = localStorage.getItem('authToken') || null;
      return of(this.token);
    }
  }

  // Clear the token
  clearToken(): void {
    this.token = null;
    localStorage.removeItem('authToken');
  }
}




