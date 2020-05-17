export class ErrorMessage {

  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }

}

export const ShoppingListErrorMessages = [
  new ErrorMessage('due_date', 'required', 'Es muss ein Fälligkeitsdatum angegeben werden'),
  new ErrorMessage('itemDescription', 'required', 'Es muss eine Beschreibung des Artikels angegeben werden'),
  new ErrorMessage('itemPrice', 'min', 'Maximaler Preis kann nur positive Werte annehmen'),
  new ErrorMessage('itemAmount', 'min', 'Stückzahl kann nur positive Werte annehmen'),
  new ErrorMessage('itemAmount', 'required', 'Stückzahl darf nicht null sein und muss eine ganze Zahl enthalten'),
  new ErrorMessage('itemPrice', 'required', 'Es muss ein maximaler Preis in Form einer Zahl angegeben werden'),
];
