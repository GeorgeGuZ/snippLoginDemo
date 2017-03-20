import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import * as firebase from "firebase";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {DataService} from "../services/data.service";

@Injectable()
export class AccountAuthGuard implements CanActivate {

    constructor (private cs: CookieService, private ds: DataService) {}

    canActivate() {
        let user = firebase.auth().currentUser;
        if (!user)
            return false;
        else {
            let userInfo = this.cs.getObject('signedInUser');
            if (userInfo)
                this.ds.setUserInfo(userInfo);
            return true;
        }
    }
}