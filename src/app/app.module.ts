import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms' ;
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {AuthService} from "./shared/auth";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {JwtInterceptorService} from "./shared/jwt-interceptor.service";
import {HomeComponent} from "./home/home.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import { ShoppingListDetailComponent } from './shopping-list-detail/shopping-list-detail.component';
import { ShoppingListFormComponent } from './shopping-list-form/shopping-list-form.component';
import { ShoppingListListingComponent } from './shopping-list-listing/shopping-list-listing.component';
import { ShoppingListItemComponent } from './shopping-list-item/shopping-list-item.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShoppingListComponent,
    LoginComponent,
    ShoppingListDetailComponent,
    ShoppingListFormComponent,
    ShoppingListListingComponent,
    ShoppingListItemComponent,
    CommentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },[{provide: LOCALE_ID, useValue: 'de'}],
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
