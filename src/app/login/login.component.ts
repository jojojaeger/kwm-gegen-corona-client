import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router' ;
import {AuthService} from '../shared/auth';

interface Response {
  response:string;
  result:
    {
    token:string;
  };
}

@Component({
  selector: 'cs-login',
  templateUrl: './login.component.html',
  styles: ['.ui.grid { height: 100vh}']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router) { }

  ngOnInit ():void {
    this.loginForm = this.fb.group ({
      username : [ '' , [Validators.required, Validators.email]],
      password : [ '' , Validators.required],
    });
  }
  login ():void {
    const val = this.loginForm.value ;
    if ( val.username && val.password ) {
      this.authService.login ( val.username , val.password ).subscribe(res =>
      {
        const resObj = res as Response;
        if (resObj.response === "success" ) {
          this.authService.setLocalStorage(resObj.result.token);

          this.router.navigateByUrl( '/' );
        }
      });
    }
  }
  isLoggedIn ():boolean{
    return this.authService.isLoggedIn();
  }
}
