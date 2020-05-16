export class ShoppingListItem {
  constructor(
    public id: number,
    public description: string,
    public amount: number,
    public max_price: number,
  )
  {}
}
