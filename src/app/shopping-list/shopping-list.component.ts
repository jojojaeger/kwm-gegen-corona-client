import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Feedback, ShoppingList, ShoppingListItem} from "../shared/shoppingList" ;
import {ShoppingListService} from "../shared/shopping-list.service";

@Component({
    selector: 'bs-book-list',
    templateUrl: './shopping-list.component.html',
    styles: ['.container { padding-bottom: 60px; }']
})
export class ShoppingListComponent implements OnInit {

    lists: ShoppingList[];

    //Definition des Events
    @Output() showDetailsEvent = new EventEmitter<ShoppingList>();

    constructor(private shoppingListServive:ShoppingListService){
       //dependencies injection, angular macht das für uns und legt das an
    }

    //Event schmeißen
    showDetails(){

    }

    ngOnInit() {
        this.shoppingListServive.getOpen().subscribe(res => this.lists = res);
    }
}
