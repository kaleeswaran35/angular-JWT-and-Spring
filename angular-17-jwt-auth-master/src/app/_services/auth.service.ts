import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const AUTH_API = 'http://localhost:8081/authenticate';

const httpOptions = {  
  headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router:Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API ,
      {
        username,
        password,
      },httpOptions     
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API  ,
      {
        username,        
        password,
      },
      httpOptions
    );
  }

  

  logout(): void {    
    this.router.navigate(['/login']); // Redirect to login page
  }
}
