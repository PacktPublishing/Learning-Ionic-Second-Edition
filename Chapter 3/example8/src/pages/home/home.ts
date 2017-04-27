import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	constructor(private navCtrl: NavController) { }

	goTo(page) {
		if (page === 'about') {
			this.navCtrl.push(AboutPage);
		} else if (page === 'contact') {
			this.navCtrl.push(ContactPage);
		}
	}

	back() {
		if (this.navCtrl.length() >= 2) {
			this.navCtrl.pop();
		}
	}
}
