import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	food: string;

	constructor(public navCtrl: NavController) {
		this.food = 'pizza';
	}
}
