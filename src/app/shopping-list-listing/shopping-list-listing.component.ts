import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ShoppingListService} from "../shared/shopping-list.service";
import {ShoppingList} from "../shared/shoppingList";

@Component({
  selector: 'cs-shopping-list-listing',
  templateUrl: './shopping-list-listing.component.html',
  styleUrls: ['./shopping-list-listing.component.css']
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
