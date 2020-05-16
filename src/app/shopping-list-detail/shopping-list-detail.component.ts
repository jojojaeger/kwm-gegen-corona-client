import { Component, OnInit } from '@angular/core';
import {ShoppingListService} from "../shared/shopping-list.service";
import {Feedback, ShoppingList} from "../shared/shoppingList";
import {ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs/operators';
import localeDe from '@angular/common/locales/de';
import {registerLocaleData} from "@angular/common";

@Component({
  selector: 'cs-shopping-list-detail',
  templateUrl: './shopping-list-detail.component.html',
  styles: [`.ui.container {padding: 50px 0 !important; margin: 0 130px !important;} .ui textarea{height:unset} .date{color: gray;}`]
})
export class ShoppingListDetailComponent {

  shoppingList: ShoppingList;
  comment: string;

  constructor(private router: Router, private shoppingListService:ShoppingListService, private route: ActivatedRoute,) {
    registerLocaleData(localeDe);
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getList();
    });

  }

  getList(){
    let params = this.route.snapshot.params;
    this.shoppingListService.getSingleList(params['id']).subscribe(res => this.shoppingList = res[0]);
  }

  addComment($comment:string){
    let $feedback = new Feedback(null, localStorage.userId, this.shoppingList.id , $comment, null);
    this.shoppingListService.createFeedback($feedback).subscribe(res => {this.getList()});
    this.comment = "";
  }
}
