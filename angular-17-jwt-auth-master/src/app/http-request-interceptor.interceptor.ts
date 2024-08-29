import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { TokenService } from './token.service'; // Adjust the path as necessary

@Injectable()
export class httpRequestInterceptorInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("inteceptor Invoked");
    return from(this.tokenService.getToken()).pipe(
      switchMap(token => {
        // Clone the request and add the Authorization header
        const isAuthRequest = req.url.includes('/login') || req.url.includes('/authenticate')  || req.url.includes('/home')       
        if(!isAuthRequest)
        {
          return  this.tokenService.getToken().pipe(
            switchMap(token => {
              if(typeof token === 'string' && token)
              {
                req = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${token}`
                  }
                })                
              }else{console.log('token missing')                
              }
              return next.handle(req)
              
            })
          )
          console.log(token);
          if (token)
          {
           req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            })
          }
        }
        // const authReq = req.clone({
        //   setHeaders: {
        //     Authorization: `Bearer ${token}`
        //   }
        // });
        console.log("inteceptor handling next request");
        return next.handle(req).pipe(          
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              // Handle unauthorized error
              this.tokenService.clearToken(); // Optionally clear token or handle logout
            }
            return throwError(error);
          })
        );
      })
    );
  }
}


// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
// import { Observable, from, throwError } from 'rxjs';
// import { catchError, switchMap } from 'rxjs/operators';
// import { TokenService } from './token.service'; // Your token management service


 
// @Injectable({
//   providedIn: 'root',
// })
// export class httpRequestInterceptorInterceptor implements  HttpInterceptor   { 

//  constructor(private tokenService: TokenService)
//  {

//  }

//  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//   // Handle the token retrieval asynchronously
//   return from(this.tokenService.getToken()).pipe(
//     switchMap(token => {
//       // Clone the request and add the Authorization header if the token is present
//       const authReq = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       return next.handle(authReq).pipe(
//         catchError((error: HttpErrorResponse) => {
//           if (error.status === 401) {
//             // Handle unauthorized error
//             this.tokenService.clearToken(); // Optionally clear token or handle logout
//           }
//           return throwError(error);
//         })
//       );
//     })
//   );
// }


 

 /*intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
  console.log("headers before Interceptor Invoked");
  const httpOptions = {  
    headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})
  }; 
  
  const AUTH_API = 'http://localhost:8081/authenticate';
  let authreq;
  let token:HttpResponse<any>;
  
  const body = {
    "username":"javainuse",
    "password":"password"
  } 
  
  console.log("Post Interceptor Invoked");
  
 
  this.http.post(
    'http://localhost:8081/authenticate',
    body, httpOptions
  ).subscribe();

  });    
   
   


    const tokennew = JSON.stringify(tokenValue);       

    console.log("token New Value"+tokennew);


    let reqCopy: HttpRequest<any>;
    reqCopy = req.clone()
    reqCopy.headers.set("Authrization", "Bearer"+" "+ tokennew);
      
    
    console.log("headers added Interceptor Invoked"+JSON.stringify(req.headers.getAll));

    return next.handle(req);
 }*/
 
  
//}






    

  


// function showConfig(p0: boolean) {
//   throw new Error('Function not implemented.');
// }

// function res(value: Object, index: number): unknown {
//   throw new Error('Function not implemented.');
// }

