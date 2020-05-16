import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Feedback, ShoppingList, ShoppingListItem} from "../shared/shoppingList" ;
import {ShoppingListService} from "../shared/shopping-list.service";
import {registerLocaleData} from "@angular/common";
import localeDe from "@angular/common/locales/de";

@Component({
    selector: 'div.cs-shopping-list',
    templateUrl: './shopping-list.component.html',
    styles: ['.container { padding-bottom: 60px; }']
})
export class ShoppingListComponent {
  @Input() shoppingList: ShoppingList;
  @Output() listingChange = new EventEmitter();
  constructor(private shoppingListService:ShoppingListService) {
    registerLocaleData(localeDe);
  }

  acceptList(){
    this.shoppingList.volunteer_id = localStorage.userId;
    this.shoppingListService.update(this.shoppingList).subscribe(res => console.log(res));
    this.listingChange.emit();
  }
}
