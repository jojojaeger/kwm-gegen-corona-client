import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import { AuthGuard } from './shared/auth.guard';
import {HomeComponent} from "./home/home.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {ShoppingListDetailComponent} from "./shopping-list-detail/shopping-list-detail.component";

const routes:Routes =[
  { path: '', component: HomeComponent, pathMatch:'full', canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent},
  { path: 'shoppingList/:id', component: ShoppingListDetailComponent},
  // { path: 'shoppingList/:id', component: ShoppingListFormComponent},
  // { path: 'shoppingList/:id', component: ShoppingListComponent},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule{}
