import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor(private router: Router) {}

  onSubmit(): void {
    // Handle form submission, e.g., send form data to a server
    alert('Form submitted!');
  }

  goHome(): void {
    this.router.navigate(['/home']); // Navigate to the home route
  }

  
}