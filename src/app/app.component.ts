import {Component, OnInit} from '@angular/core';
declare var $;

@Component({
  selector: 'snipp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  ngOnInit () {
    $('#snipp-spinner').hide();
  }
}
