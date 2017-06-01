import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Auth } from '../../providers/auth';
import { IP } from '../../providers/ip';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	userIp = '';
	user = {
		email: 'a@a.com',
		password: 'a'
	}

	constructor(
		public navCtrl: NavController,
		public alertCtrl: AlertController,
		private auth: Auth,
		private ip: IP) {

		// check if the user is already 
		// authenticated
		auth.isAuthenticated().then((isAuth) => {
			if (isAuth) {
				navCtrl.setRoot(HomePage);
			}
		});

		// Get the user's IP
		ip.get().subscribe((data) => {
			this.userIp = data.json().ip;
		});
	}

	login() {
		if (this.auth.login(this.user)) {
			this.navCtrl.setRoot(HomePage);
		} else {
			let alert = this.alertCtrl.create({
				title: 'LOGIN FAILED',
				subTitle: 'Either the email or password is invalid.',
				buttons: ['OK']
			});
			alert.present();
		}
	}
}
