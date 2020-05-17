import {Injectable} from '@angular/core' ;
import {HttpClient} from "@angular/common/http" ;
import * as decode from 'jwt-decode' ;
import {ShoppingListService} from "./shopping-list.service";

@ Injectable ()
export class AuthService {

  private api:string =
    'http://covidstore.s1710456013.student.kwmhgb.at/api/auth';

  constructor(private http: HttpClient, private shoppingListService:ShoppingListService) {
  }

  login (email: string, password: string ) {
    return this.http.post(` ${this.api }/login` , { 'email' : email,
      'password' : password});
  }

  public setLocalStorage (token: string) {
    const decodedToken = decode(token);
    localStorage.setItem('token' , token);
    localStorage.setItem('role' , decodedToken.user.role);
    localStorage.setItem('userId' , decodedToken.user.id);
    localStorage.setItem('first_name' , decodedToken.user.first_name);
    localStorage.setItem('last_name' , decodedToken.user.last_name);
    this.shoppingListService.updateDashboard();
  }
  logout () {
    this.http.post ( ` ${this.api } /logout` , {});
    localStorage.removeItem ( "token" );
    localStorage.removeItem ( "userId" );
    localStorage.removeItem ( "role" );
    localStorage.removeItem ( "first_name" );
    localStorage.removeItem ( "last_name" );
  }

  public isLoggedIn ():boolean {
    if(localStorage.getItem ("token" )){
      let token:string = localStorage.getItem ( "token" );
      const decodedToken = decode(token);
      let expirationDate:Date = new Date ( 0 );
      expirationDate.setUTCSeconds (decodedToken.exp);
      if(expirationDate < new Date()){
        localStorage.removeItem ( "token" );
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
}
