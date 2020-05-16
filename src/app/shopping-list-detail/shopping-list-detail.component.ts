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
  styles: [`.ui.container {
    padding: 50px 0 !important;
    margin: 0 130px !important;
  }

  .ui textarea {
    height: unset
  }`]
})
export class ShoppingListDetailComponent implements OnInit {

  shoppingList: ShoppingList;
  comment: string;
  totalPrice: number;

  constructor(private router: Router, private shoppingListService: ShoppingListService, private route: ActivatedRoute,) {
    registerLocaleData(localeDe);
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.getList();
    });
  }

  isHelpseeker() {
    return localStorage.role == "helpseeker";
  }

  volunteerIsSet?() {
    if (this.shoppingList !== undefined) {
      return this.shoppingList?.volunteer_id !== null;
    }
  }

  finishList($price: number) {
    if ($price !== 0.00 && $price !== undefined && this.isFloat($price)) {
      this.shoppingList.done = true;
      this.shoppingList.total_price = $price;
      this.shoppingListService.update(this.shoppingList).subscribe(() => {
        this.getList();
      });
    }
    else {
      alert("Bitte gib den Gesamtpreis an! Format: 23.99")
    }
  }

  isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
  }

  getList() {
    let params = this.route.snapshot.params;
    this.shoppingListService.getSingleList(params['id']).subscribe(res => this.shoppingList = res[0]);
  }

  addComment($comment: string) {
    if ($comment !== "") {
      let $feedback = new Feedback(null, localStorage.userId, this.shoppingList.id, $comment, null);
      this.shoppingListService.createFeedback($feedback).subscribe(() => {
        this.getList();
      });
      this.comment = "";
    } else alert("Ein Kommentar darf nicht leer sein.")
  }
}
