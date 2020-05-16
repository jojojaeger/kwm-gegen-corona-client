import {AuthService} from "./shared/auth";
import {ActivatedRoute, Params, Router} from '@angular/router'
import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Feedback, ShoppingList, ShoppingListItem} from "./shared/shoppingList" ;
import {ShoppingListService} from "./shared/shopping-list.service";

@Component({
  selector: 'cs-root',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  openLists: ShoppingList[];
  doneLists: ShoppingList[];

  constructor(private router: Router, private shoppingListService:ShoppingListService, private authService:AuthService){
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  isVolunteer(){
    return localStorage.role == "volunteer";
  }

  logout (){
    this.authService.logout();
  }

  ngOnInit(){
    this.showLists();
    this.authService.getLoggedInUserId.subscribe(() => this.showLists());
  }

  showLists(): void {
    if (this.isLoggedIn()){
      this.shoppingListService.getOpen(localStorage.userId).subscribe(res => this.openLists = res);
      this.shoppingListService.getDone(localStorage.userId).subscribe(res => this.doneLists = res);
    }
  }

}
