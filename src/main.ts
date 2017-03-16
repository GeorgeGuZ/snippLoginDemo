import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import * as firebase from "firebase";
import 'bootstrap';

if (environment.production) {
  enableProdMode();
}

var config = {
  apiKey: "AIzaSyBkwoRyqCM0MJ44IWFlM2kcLrgf3CxHa3M",
  authDomain: "fir-auto-1ab39.firebaseapp.com",
  databaseURL: "https://fir-auto-1ab39.firebaseio.com",
  storageBucket: "fir-auto-1ab39.appspot.com",
  messagingSenderId: "426413417204"
};
firebase.initializeApp(config);

platformBrowserDynamic().bootstrapModule(AppModule);
