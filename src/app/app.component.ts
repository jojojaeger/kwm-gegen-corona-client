import {AuthService} from "./shared/auth";
import {ActivatedRoute, Params, Router} from '@angular/router'
import {Component, OnInit, Output} from '@angular/core';
import {ShoppingListService} from "./shared/shopping-list.service";

@Component({
  selector: 'cs-root',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  constructor(private router: Router, public shoppingListService:ShoppingListService, private authService:AuthService){
  }

  get username():string{
    return localStorage.first_name + ' ' + localStorage.last_name;
  }

  isLoggedIn():boolean{
    return this.authService.isLoggedIn();
  }

  isVolunteer():boolean{
    return localStorage.role == "volunteer";
  }

  logout ():void{
    this.authService.logout();
  }

}
