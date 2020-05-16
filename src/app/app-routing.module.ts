import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import { AuthGuard } from './shared/auth.guard';
import {HomeComponent} from "./home/home.component";
import {ShoppingListDetailComponent} from "./shopping-list-detail/shopping-list-detail.component";
import {ShoppingListListingComponent} from "./shopping-list-listing/shopping-list-listing.component";
import {ShoppingListFormComponent} from "./shopping-list-form/shopping-list-form.component";

const routes:Routes =[
  { path: '', component: HomeComponent, pathMatch:'full', canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent},
  { path: 'shoppingList/:id', component: ShoppingListDetailComponent},
  { path: 'shoppingListForm', component: ShoppingListFormComponent},
  { path: 'shoppingLists', component: ShoppingListListingComponent},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule{}
