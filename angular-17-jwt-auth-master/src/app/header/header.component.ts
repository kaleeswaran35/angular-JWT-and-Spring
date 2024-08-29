import { HttpRequest } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  private readonly loginUrl = '/login';

  constructor(private router:Router)
  {}

  // Method to check if the current URL is the login URL
  isLoginPage(): boolean {
    return this.router.url === this.loginUrl;
  }

  checkLoginPage(): boolean {
    if (this.isLoginPage()) {
      return false;
      // Add additional logic for the login page scenario here
    } else {
      return true;
      // Add additional logic for other pages here
    }
  }

  logout(): void {    
    this.router.navigate(['/login']); // Redirect to login page
  }

}
