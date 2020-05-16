import {AuthService} from "../shared/auth";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-home',
  templateUrl: './home.component.html',
  styles: ['.ui.container {padding-top: 50px !important;; margin-left: 150px !important;}']
})
export class HomeComponent{

  constructor() { }

  getUserName(){
    return localStorage.name;
  }

  isVolunteer(){
    return localStorage.role == "volunteer";
  }

}
