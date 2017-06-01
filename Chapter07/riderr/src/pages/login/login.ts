import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UberAPI } from '../../services/uber.service';
import { HomePage } from '../home/home';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {

	constructor(private api: UberAPI, private navCtrl: NavController) {
		// check if the user is already authenticated
		this.api.isAuthenticated().subscribe((isAuth) => {
			if (isAuth) {
				this.navCtrl.setRoot(HomePage);
			}
			// else relax!
		});
	}

	auth() {
		this.api.auth().subscribe((isAuthSuccess) => {
			this.navCtrl.setRoot(HomePage);
		}, function(e) {
			// handle this in a user friendly way.
			console.log('Fail!!', e);
		});
	}
}
