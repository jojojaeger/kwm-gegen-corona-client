import { Injectable } from '@angular/core';
import {ShoppingListItem, Feedback, ShoppingList} from './shoppingList';
import {HttpClient} from "@angular/common/http";
import {Observable, pipe, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {AuthService} from "./auth";

// Dependencie Injection oder .. of Control
//  = new BookStoreService, wird von Angular übernommen, initiiert
// kann Daten in anderen Komponenten verwenden
// - Daten/Methoden

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private api = 'http://covidstore.s1710456013.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {
  }

  getAll():Observable<Array<ShoppingList>> {
    return this.http.get(`${this.api}/shoppingLists`).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getOpen():Observable<Array<ShoppingList>> {
    return this.http.get(`${this.api}/shoppingLists/open/${localStorage.userId}`).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getDone():Observable<Array<ShoppingList>> {
    return this.http.get(`${this.api}/shoppingLists/done/${localStorage.userId}`).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getSingle(isbn: string): Observable<ShoppingList> {
    return this.http.get(`${this.api}/books/${isbn}`).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error : Error | any):Observable<any>{
    return throwError(error);
  }

}
