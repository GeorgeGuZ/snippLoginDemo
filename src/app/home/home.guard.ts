import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import * as firebase from "firebase";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {DataService} from "../services/data.service";

@Injectable()
export class AccountAuthGuard implements CanActivate {

    constructor (private cs: CookieService, private ds: DataService) {}

    canActivate() {
        var user = this.cs.getObject('signedInUser');
        if (!user)
            return false;
        else {
            this.ds.setUserInfo(user);
            return true;
        }
    }
}