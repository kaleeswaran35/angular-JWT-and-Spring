// src/app/services/logger.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private apiUrl = `http://localhost:3000/log`; // Use the correct backend URL and endpoint

  constructor(private http: HttpClient) {}

  log(level: string, message: string): void {
    this.http.post(this.apiUrl, { level, message })
      .subscribe({
        next: () => console.log('Log sent successfully'),
       // error: (err) => this.log('Error sending log', err)
      });
  }

  info(message: string): void {
    this.log('info', message);
  }

  warn(message: string): void {
    this.log('warn', message);
  }

  error(message: string): void {
    this.log('error', message);
  }
}
