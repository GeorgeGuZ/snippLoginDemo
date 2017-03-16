import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {ModuleWithProviders} from "@angular/core";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AccountAuthGuard} from "./home/home.guard";

const AppRoute: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AccountAuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'pageNotFound', component: PageNotFoundComponent}
  // {path: '', redirectTo: 'login', pathMatch: "full"}
  // {path: '**', component: PageNotFoundComponent}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(AppRoute);
