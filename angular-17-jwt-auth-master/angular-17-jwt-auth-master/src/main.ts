import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpRequestInterceptorInterceptor } from './app/http-request-interceptor.interceptor';



  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
    
      // bootstrapApplication(AppModule, {providers: [
      //   provideHttpClient(
      //     withInterceptors([httpRequestInterceptorInterceptor.bind]),
      //   )
      // ]});  
