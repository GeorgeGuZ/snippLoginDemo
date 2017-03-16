import { Injectable } from '@angular/core';
import Database = firebase.database.Database;
import {Http} from "@angular/http";
import * as firebase from "firebase";

@Injectable()
export class DataService {

  db: Database;

  constructor(private http: Http) {
    this.db = firebase.database();
  }

  writeUserData (userInfo:any, uid: string) {
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

}
