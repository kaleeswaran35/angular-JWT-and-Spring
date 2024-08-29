import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpParams, provideHttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/Product';


const API_URL = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
};




@Injectable({
  providedIn: 'root',
})
export class UserService {




  constructor(private http: HttpClient) { }


  getPublicContent(): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + 'findAllProducts', httpOptions);
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  // Content search implmentation for REST API
  getsearchContent(searchQuery: string): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + `findAll?productName=${searchQuery}`, httpOptions);

  }

  updateItem(item: Product): Observable<Product[]> {
    console.log("Item in update" + JSON.stringify(item));
    return this.http.put<Product[]>(API_URL + 'update/' + item.id, item);
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(API_URL + 'delete/' + id);
  }

  insertItem(item: Product): Observable<Product[]> {
    console.log("Item in update" + JSON.stringify(item));
    return this.http.post<Product[]>(API_URL + 'insert/' , item);
  }

}
