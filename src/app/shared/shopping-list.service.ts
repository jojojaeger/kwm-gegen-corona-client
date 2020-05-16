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

  getSingleList(id: number):Observable<ShoppingList> {
    return this.http.get(`${this.api}/shoppingList/${id}`).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getOpen(userId: number):Observable<Array<ShoppingList>> {
    return this.http.get(`${this.api}/shoppingLists/open/${userId}`).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getDone(userId: number):Observable<Array<ShoppingList>> {
    return this.http.get(`${this.api}/shoppingLists/done/${userId}`).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  createFeedback(feedback: Feedback):Observable<Feedback> {
    return this.http.post(`${this.api}/shoppingList/feedback`, feedback).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  update(list: ShoppingList):Observable<any> {
    return this.http.put(`${this.api}/shoppingList/${list.id}`, list).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error : Error | any):Observable<any>{
    return throwError(error);
  }

}
