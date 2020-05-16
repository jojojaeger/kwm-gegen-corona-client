import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ShoppingListService} from "../shared/shopping-list.service";
import {ShoppingList} from "../shared/shoppingList";

@Component({
  selector: 'cs-shopping-list-listing',
  templateUrl: './shopping-list-listing.component.html',
  styles: [`.ui.container {padding: 50px 0 !important; margin: 0 130px !important;} .ui.cards > .card{width: 600px;}`]
})
export class ShoppingListListingComponent implements OnInit{

  shoppingLists:ShoppingList[] = [];
  @Output() listingChange = new EventEmitter();

  constructor(private shoppingListService:ShoppingListService) {

  }

  ngOnInit(){
    this.getAllLists();
  }

  getAllLists() {
    this.shoppingListService.getAll().subscribe(res => {this.shoppingLists = res;});
    this.listingChange.emit();
  }

}
