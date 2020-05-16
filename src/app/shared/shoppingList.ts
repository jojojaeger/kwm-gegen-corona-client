import {ShoppingListItem} from './shoppingListItem' ;
export {ShoppingListItem} from './shoppingListItem' ;
import {Feedback} from "./feedback";
export {Feedback} from './feedback' ;

export class ShoppingList {
  constructor(
    public id: number,
    public name: string,
    public due_date: Date,
    public done: boolean,
    public helpseeker_id: number,
    public shopping_items: ShoppingListItem[],
    public volunteer_id?: number,
    public total_price?: number,
    public feedback?: Feedback[],
  )
  {}
}
