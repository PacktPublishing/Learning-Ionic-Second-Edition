import { Component } from '@angular/core';
import { Toast } from 'ionic-native';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	constructor() {
		Toast.show("I'm a toast", "5000", "center").subscribe(
			function(toast) {
				console.log(toast);
			}
		);
	}
}
