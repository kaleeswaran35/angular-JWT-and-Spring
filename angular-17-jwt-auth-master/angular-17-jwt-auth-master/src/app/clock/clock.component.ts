import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit, OnDestroy {
  currentDateTime!: string;
  private timer: any;

  ngOnInit(): void {
    this.updateDateTime();
    this.timer = setInterval(() => this.updateDateTime(), 1000); // Update every second
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  updateDateTime(): void {
    const now = new Date();
    
    // Date options
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    // Time options
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false // Set to true for 12-hour format
    };

    const date = now.toLocaleDateString('en-US', dateOptions);
    const time = now.toLocaleTimeString('en-US', timeOptions);
    
    this.currentDateTime = `${date} ${time}`;
  }
}
