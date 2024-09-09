import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private apiUrl = 'http://localhost:3000/api/logs'; // Your backend API endpoint

  constructor() { }

  log(level: string, message: string, meta: any = {}) {
    axios.post(this.apiUrl, { level, message, meta })
      .then(response => {
        console.log('Log sent successfully');
      })
      .catch(error => {
        console.error('Error sending log:', error);
      });
  }
}
