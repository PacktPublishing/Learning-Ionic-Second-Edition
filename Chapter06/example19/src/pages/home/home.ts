import { Component } from '@angular/core';
import { LocalNotifications } from 'ionic-native';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	defaultText: String = 'Hello World';
	constructor() {}

	triggerNotification(notifText) {
		notifText = notifText || this.defaultText;
		LocalNotifications.schedule({
			id: 1,
			text: notifText,
		});
	}

}
