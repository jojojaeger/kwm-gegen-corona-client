import {User} from "./user";

export class Feedback {
  constructor(
    public id: number,
    public user_id: number,
    public shopping_list_id: number,
    public comment: string,
    public user?: User
  )
  {}
}
