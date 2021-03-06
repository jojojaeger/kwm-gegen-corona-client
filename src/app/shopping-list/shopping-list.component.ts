import {Component, OnInit, Output, EventEmitter, Input, SimpleChange, OnChanges} from '@angular/core';
import {Feedback, ShoppingList, ShoppingListItem} from "../shared/shoppingList" ;
import {ShoppingListService} from "../shared/shopping-list.service";
import {registerLocaleData} from "@angular/common";
import localeDe from "@angular/common/locales/de";

@Component({
    selector: 'div.cs-shopping-list',
    templateUrl: './shopping-list.component.html',
    styles: ['.container { padding-bottom: 60px; }']
})
export class ShoppingListComponent{
  @Input() shoppingList: ShoppingList;
  @Output() updateListing = new EventEmitter<string>();
  constructor(private shoppingListService:ShoppingListService) {
    registerLocaleData(localeDe);
  }

  acceptList(){
    this.shoppingList.volunteer_id = localStorage.userId;
    this.shoppingListService.update(this.shoppingList).subscribe(res => {this.shoppingList = res; this.updateListing.emit(); this.shoppingListService.updateDashboard();});
  }
}
