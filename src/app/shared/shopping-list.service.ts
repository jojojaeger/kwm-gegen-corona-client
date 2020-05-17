import {Injectable} from '@angular/core';
import {ShoppingListItem, Feedback, ShoppingList} from './shoppingList';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, pipe, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private api = 'http://covidstore.s1710456013.student.kwmhgb.at/api';
  private readonly _openLists = new BehaviorSubject<ShoppingList[]>([]);
  private readonly _doneLists = new BehaviorSubject<ShoppingList[]>([]);

  readonly openLists$ = this._openLists.asObservable();
  readonly doneLists$ = this._doneLists.asObservable();

  constructor(private http: HttpClient) {}

  get openLists(): ShoppingList[] {
    return this._openLists.getValue();
  }

  get doneLists(): ShoppingList[] {
    return this._doneLists.getValue();
  }

  set openLists(val: ShoppingList[]) {
    this._openLists.next(val);
  }

  set doneLists(val: ShoppingList[]){
    this._doneLists.next(val);
  }

  updateDashboard(): void {
    if (localStorage.userId) {
      this.getOpen(localStorage.userId).subscribe(res => this.openLists = res);
      this.getDone(localStorage.userId).subscribe(res => this.doneLists = res);
    }
  }

  getAll(): Observable<Array<ShoppingList>> {
    return this.http.get(`${this.api}/shoppingLists`).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  save($list:ShoppingList): Observable<any> {
    return this.http.post(`${this.api}/shoppingList`, $list).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getSingleList(id: number): Observable<ShoppingList> {
    return this.http.get(`${this.api}/shoppingList/${id}`).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getOpen(userId: number): Observable<Array<ShoppingList>> {
    return this.http.get(`${this.api}/shoppingLists/open/${userId}`).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getDone(userId: number): Observable<Array<ShoppingList>> {
    return this.http.get(`${this.api}/shoppingLists/done/${userId}`).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  createFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post(`${this.api}/shoppingList/feedback`, feedback).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  update(list: ShoppingList): Observable<any> {
    return this.http.put(`${this.api}/shoppingList/${list.id}`, list).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

}
