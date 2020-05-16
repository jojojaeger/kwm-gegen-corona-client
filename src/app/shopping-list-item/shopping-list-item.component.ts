import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ShoppingListItem} from "../shared/shoppingListItem";
import {ShoppingList} from "../shared/shoppingList";

@Component({
  selector: 'div.cs-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styles: ['span{padding: 0 5px;}']
})
export class ShoppingListItemComponent implements OnInit {
  @Input() item: ShoppingListItem;

  constructor() { }

  ngOnInit(): void {
  }

}
