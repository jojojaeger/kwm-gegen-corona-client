import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl, ValidatorFn} from '@angular/forms';

import {ShoppingListErrorMessages} from './shopping-list-form-error-messages';
import {ShoppingListService} from "../shared/shopping-list.service";
import {ShoppingListItem, Feedback, ShoppingList} from "../shared/shoppingList";
import {DatePipe, registerLocaleData} from "@angular/common";
import localeDe from "@angular/common/locales/de";

@Component({
  selector: 'div.cs-shopping-list-form',
  templateUrl: './shopping-list-form.component.html',
  styleUrls: ['./shopping-list-form.component.css']
})
export class ShoppingListFormComponent implements OnInit {
  shoppingListForm: FormGroup;
  shoppingList: ShoppingList;
  errors: { [key: string]: string } = {};
  itemsArray: ShoppingListItem[] = [];
  minDate;

  constructor(private fb: FormBuilder, private shoppingListService: ShoppingListService, public datepipe: DatePipe,
              private router:Router) {
    registerLocaleData(localeDe);
  }

  ngOnInit() {
    this.initForm();
    this.minDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  }

  initForm() {
    this.shoppingListForm = this.fb.group({
      id: 0,
      name: 'Einkaufsliste',
      due_date: ['', [
        Validators.required]],
      itemDescription: ['', [
        Validators.required]],
      itemAmount: [1, [
        Validators.min(0), Validators.required]],
      itemPrice: ['', [
        Validators.min(0), Validators.required]]
    });

    this.shoppingListForm.statusChanges.subscribe(() => this.showErrors());
  }

  addItem() {
    const $item = new ShoppingListItem(null, this.shoppingListForm.value.itemDescription,
      this.shoppingListForm.value.itemAmount, this.shoppingListForm.value.itemPrice);
    this.itemsArray.push($item);
    this.shoppingListForm.get('itemDescription').reset();
    this.shoppingListForm.get('itemAmount').reset();
    this.shoppingListForm.get('itemPrice').reset();
  }

  itemPropsInvalid() {
    return this.shoppingListForm.get('itemDescription').valid == false || this.shoppingListForm.get('itemAmount').valid == false
      || this.shoppingListForm.get('itemPrice').valid == false;
  }

  shoppingListPropsInvalid() {
    return this.shoppingListForm.get('name').valid == false || this.shoppingListForm.get('due_date').valid == false
      || this.itemsArray.length == 0;
  }

  submitForm() {
    const shoppingList: ShoppingList = new ShoppingList(this.shoppingListForm.value.id,
      this.shoppingListForm.value.name,this.shoppingListForm.value.due_date, false, localStorage.userId,
      this.shoppingListForm.value.shopping_items);
    console.log(shoppingList);

    // this.shoppingListService.create(shoppingList).subscribe(res => {
    //   this.shoppingListForm.reset();
    //   this.router.navigate([`../shoppingLists/${shoppingList.id}`]);
    // });
  }

  showErrors() {
    this.errors = {};
    for (const message of ShoppingListErrorMessages) {
      const control = this.shoppingListForm.get(message.forControl);
      if (control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}

