import {AuthService} from "../shared/auth";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-home',
  templateUrl: './home.component.html',
  styles: ['.ui.container {padding: 50px 130px; margin: 0 !important;}']
})
export class HomeComponent{

  constructor() { }

  get firstName():string{
    return localStorage.first_name;
  }

  isVolunteer(){
    return localStorage.role == "volunteer";
  }

}
