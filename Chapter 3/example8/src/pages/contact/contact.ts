import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';

@Component({
	selector: 'page-contact',
	templateUrl: 'contact.html'
})
export class ContactPage {
	constructor(private navCtrl: NavController) { }

	goTo(page) {
		if (page === 'home') {
			this.navCtrl.push(HomePage);
		} else if (page === 'about') {
			this.navCtrl.push(AboutPage);
		}
	}

	back() {
		if (this.navCtrl.length() >= 2) {
			this.navCtrl.pop();
		}
	}
}
