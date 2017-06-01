import { Component } from '@angular/core';
import { BatteryStatus } from 'ionic-native';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	level: Number;
	isPlugged: Boolean;

	constructor() {
		BatteryStatus.onChange().subscribe(
			(status) => {
				this.level = status.level;
				this.isPlugged = status.isPlugged;
			}
		);
	}
}
