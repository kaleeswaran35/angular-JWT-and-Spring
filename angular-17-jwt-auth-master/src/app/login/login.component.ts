import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, concatMap, from, of, switchMap, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../_services/storage.service';
import { TokenService } from '../token.service';

const AUTH_API = 'http://localhost:8081/authenticate';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',    
    'Allow-Access-Origin-Header': '*'
  })};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: TokenService,
    private storageService: StorageService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    console.log("ng-OnInit for login");
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

      
  }

  onSubmit(): void {
    // Check if the form is invalid
    //console.log(this.onSubmit());
    if (this.loginForm.invalid) {
      return; // Exit if form is invalid
    }
  
    // Extract username and password from the form
    const { username, password } = this.loginForm.value;
  
    // Send a POST request to the authentication API
    this.http.post<{ token: string }>(AUTH_API, { username, password }, httpOptions).pipe(
      tap(response => {
        // Save the token using the auth service
        this.authService.setToken(response.token);
        console.log("Token received:", response.token);
        this.isLoginFailed = false;
      }),
       concatMap(() => {
         // Navigate to the home page
         console.log("Navigating to home");
         return from(this.router.navigate(['/home']));
       }),
      catchError(error => {
        // Handle any errors
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid username or password.';
        this.isLoginFailed = true;
        // Return an empty observable to complete the stream
        return of(null);
      })
    ).subscribe();
  } 
}
