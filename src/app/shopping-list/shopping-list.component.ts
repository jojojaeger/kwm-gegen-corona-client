import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Feedback, ShoppingList, ShoppingListItem} from "../shared/shoppingList" ;
import {ShoppingListService} from "../shared/shopping-list.service";

@Component({
    selector: 'cs-shopping-list',
    templateUrl: './shopping-list.component.html',
    styles: ['.container { padding-bottom: 60px; }']
})
export class ShoppingListComponent {

    lists: ShoppingList[];


}
