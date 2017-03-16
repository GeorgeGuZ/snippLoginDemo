import { Injectable } from '@angular/core';
declare var $;

@Injectable()
export class SpinnerService {

  constructor() { }

  show(message?: string) {
    $('#snipp-spinner').show();
  }

  hide() {
    $('#snipp-spinner').hide();
  }

}
