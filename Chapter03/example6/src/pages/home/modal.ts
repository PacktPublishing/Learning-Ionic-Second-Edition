import {ViewController} from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
	template: `
  <ion-content padding>
    <h2>I'm a modal!</h2>
    <button (click)="close()" ion-button>Close</button>
  </ion-content>`
})
export class MyModal {
	constructor(public viewCtrl: ViewController) {
		this.viewCtrl = viewCtrl;
	}
	close() {
		this.viewCtrl.dismiss();
	}
} 
