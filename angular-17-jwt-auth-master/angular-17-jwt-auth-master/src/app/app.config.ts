import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors,withInterceptorsFromDi } from "@angular/common/http";
import { provideRouter } from "@angular/router";
import { routes } from './app-routing.module';
import { ApplicationConfig } from "@angular/core";
import { httpRequestInterceptorInterceptor } from "./http-request-interceptor.interceptor";

export const appConfig:ApplicationConfig = {  
  providers: [provideRouter(routes),provideHttpClient(withInterceptors([httpRequestInterceptorInterceptor.bind]))],

};


