import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ShoppingListService} from "../shared/shopping-list.service";
import {Feedback, ShoppingList} from "../shared/shoppingList";
import {ActivatedRoute, Router, NavigationEnd} from "@angular/router";
import {filter} from 'rxjs/operators';
import localeDe from '@angular/common/locales/de';
import {registerLocaleData} from "@angular/common";

@Component({
  selector: 'cs-shopping-list-detail',
  templateUrl: './shopping-list-detail.component.html',
  styleUrls: ['./shopping-list-detail.component.css']
})
export class ShoppingListDetailComponent implements OnInit {

  shoppingList: ShoppingList;
  comment: string;
  totalPrice: number;
  errors: { [key: string]: string } = {};

  constructor(private router: Router, private shoppingListService: ShoppingListService, private route: ActivatedRoute,) {
    registerLocaleData(localeDe);
  }

  ngOnInit():void {
    this.route.params.subscribe(() => {
      this.getList();
    });
  }

  isHelpseeker():boolean {
    return localStorage.role == "helpseeker";
  }

  volunteerIsSet():boolean {
    if (this.shoppingList !== undefined) {
      return this.shoppingList?.volunteer_id !== null;
    }
  }

  finishList($price: number) {
    if ($price > 0.00 && $price !== undefined && this.isNumber($price)) {
      this.shoppingList.done = true;
      this.shoppingList.total_price = $price;
      this.shoppingListService.update(this.shoppingList).subscribe(() => {
        this.getList();
        this.shoppingListService.updateDashboard();
      });
      this.errors["price"] = "";
    }
    else {
      this.errors["price"] = "Der Gesamtpreis muss angegeben werden und darf nur positive Zahlen enthalten";
    }
  }

  isNumber(value: string | number): boolean
  {
    return ((value != null) &&
      (value !== '') &&
      !isNaN(Number(value.toString())));
  }

  getList() {
    let params = this.route.snapshot.params;
    this.shoppingListService.getSingleList(params['id']).subscribe(res => this.shoppingList = res[0]);
  }

  addComment($comment: string) {
    if ($comment !== "" && $comment !== undefined && $comment !== null) {
      let $feedback = new Feedback(null, localStorage.userId, this.shoppingList.id, $comment, null);
      this.shoppingListService.createFeedback($feedback).subscribe(() => {
        this.getList();
      });
      this.errors["comment"] = "";
      this.comment = "";
    } else this.errors["comment"] = "Das Kommentarfeld darf nicht leer sein";
  }
}
