import {Component, OnInit} from '@angular/core';
import {SpinnerService} from './services/spinner.service';

@Component({
  selector: 'snipp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor (private ss: SpinnerService) {

  }

  ngOnInit () {
    this.ss.hide();
  }
}
