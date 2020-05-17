import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ShoppingListService} from "../shared/shopping-list.service";
import {ShoppingList} from "../shared/shoppingList";

@Component({
  selector: 'cs-shopping-list-listing',
  templateUrl: './shopping-list-listing.component.html',
  styles: [`.ui.container{padding: 50px 130px;
    margin: 0 !important;
    background-color: cadetblue;
    height: 100vh;
    color: white;} .ui.cards > .card{width: 600px;}`]
})
export class ShoppingListListingComponent implements OnInit{

  shoppingLists:ShoppingList[] = [];

  constructor(private shoppingListService:ShoppingListService) {

  }

  ngOnInit(){
    this.getAllLists();
  }

  getAllLists() {
    this.shoppingListService.getAll().subscribe(res => {this.shoppingLists = res; console.log(this.shoppingLists);});
  }

}
