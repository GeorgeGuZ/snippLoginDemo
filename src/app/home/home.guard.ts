import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import * as firebase from "firebase";

@Injectable()
export class AccountAuthGuard implements CanActivate {

    constructor() {}

    canActivate() {
        var user = firebase.auth().currentUser;
        return !!user;
    }
}