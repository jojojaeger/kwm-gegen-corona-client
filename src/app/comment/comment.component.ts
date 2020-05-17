import {Component, Input, OnInit} from '@angular/core';
import {ShoppingListItem} from "../shared/shoppingListItem";
import {Feedback} from "../shared/feedback";

@Component({
  selector: 'div.cs-comment',
  templateUrl: './comment.component.html',
  styles: ['*{color:white} .name {font-weight: bold; margin-bottom:-5px;}']
})
export class CommentComponent implements OnInit {
  @Input() comment : Feedback;

  constructor() { }

  ngOnInit(): void {
  }

}
