import { Component } from '@angular/core';
import { Geolocation } from 'ionic-native';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	latitude: Number = 0;
	longitude: Number = 0;
	accuracy: Number = 0;

	constructor() {
		Geolocation.getCurrentPosition().then((position) => {
			this.latitude = position.coords.latitude;
			this.longitude = position.coords.longitude;
			this.accuracy = position.coords.accuracy;
		});
	}
}
