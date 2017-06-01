import { Component } from '@angular/core';
import { Dialogs } from 'ionic-native';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	name: String;
	constructor() {
		let that = this;
		Dialogs
			.prompt('Name Please?', 'Identity', ['Cancel', 'Ok'], 'John McClane')
			.then(function(result) {
				if (result.buttonIndex == 2) {
					that.name = result.input1;
				}
			});
	}
}
