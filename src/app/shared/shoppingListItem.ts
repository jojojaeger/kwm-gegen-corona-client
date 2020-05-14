export class ShoppingListItem {
  constructor(
    public id: number,
    public description: string,
    public title: string,
    public amount: number,
    public max_price: number,
  )
  {}
}
