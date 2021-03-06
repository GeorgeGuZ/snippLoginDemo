import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Ng2Bs3ModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {Routing} from "./app.router";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AccountAuthGuard} from "./home/home.guard";

import {Ng2DatetimePickerModule} from 'ng2-datetime-picker';
import {DataService} from "./services/data.service";
import {SpinnerService} from "./services/spinner.service";
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        Routing,
        Ng2Bs3ModalModule,
        Ng2DatetimePickerModule,
        NgReduxModule,
        NgReduxRouterModule
    ],
    providers: [
        AccountAuthGuard,
        DataService,
        SpinnerService,
        CookieService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
