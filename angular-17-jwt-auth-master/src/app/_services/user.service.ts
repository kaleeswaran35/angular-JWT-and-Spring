import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpParams, provideHttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/Product';
import { PageEvent } from '@angular/material/paginator';


const API_URL = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
};




@Injectable({
  providedIn: 'root',
})
export class UserService {




  constructor(private http: HttpClient) { }


  getPublicContent(event?: PageEvent): Observable<any> {
    let params = new HttpParams();
    
    if (event) {
      params = params.set('page', event.pageIndex.toString())
                     .set('size', event.pageSize.toString());
    }
    
    return this.http.get<any>(`${API_URL}findAllProducts`, { params, ...httpOptions });
  }

 
  // Content search implmentation for REST API
  getsearchContent(searchQuery: string): Observable<any> {
    return this.http.get<any>(API_URL + `findAll?productName=${searchQuery}`, httpOptions);

  }

  updateItem(item: Product): Observable<any> {
    console.log("Item in update" + JSON.stringify(item));
    return this.http.put<any>(API_URL + 'update/' + item.id, item);
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(API_URL + 'delete/' + id);
  }

  insertItem(item: Product): Observable<any> {
    console.log("Item in update" + JSON.stringify(item));
    return this.http.post<any>(API_URL + 'insert/' , item);
  }

  searchEvents(startDate: string, endDate: string, pageIndex: number, pageSize: number ): Observable<any> {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('page', pageIndex.toString())
      .set('size', pageSize.toString())
    
    return this.http.get<any>(API_URL + 'search/bydate', { params });
  }

}
