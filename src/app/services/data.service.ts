import {Injectable} from '@angular/core';
import Database = firebase.database.Database;
import {Http} from "@angular/http";
import * as firebase from "firebase";

@Injectable()
export class DataService {

    private db: Database;
    private userInfo;

    constructor(private http: Http) {
        this.db = firebase.database();
    }

    writeUserData(userInfo: any, uid: string) {
        return firebase.database().ref('users/' + uid).set({
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            address1: userInfo.address1,
            address2: userInfo.address2,
            city: userInfo.city,
            state: userInfo.state,
            zip: userInfo.zip,
            gender: userInfo.gender,
            dob: userInfo.dob
        });
    }

    readUserData(uid) {
        return firebase.database().ref('users/' + uid).once('value').then(
            (snapshot) => {
                this.userInfo = snapshot.val();
            });
    }

    getUserInfo() {
        return this.userInfo;
    }

    setUserInfo(user) {
        this.userInfo = user;
    }

    signOut() {
        return firebase.auth().signOut();
    }

}
