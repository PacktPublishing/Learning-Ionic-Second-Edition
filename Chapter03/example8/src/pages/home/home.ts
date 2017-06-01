import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	constructor(public navCtrl: NavController) {

	}

	ionViewDidLoad() {
		console.log('Home Page Loaded');
	}

	goTo(page) {
		if (page === 'about') {
			this.navCtrl.push(AboutPage);
		} else if (page === 'contact') {
			this.navCtrl.push(ContactPage);
		}
	}

	back() {
		if (this.navCtrl.getViews().length >= 2) {
			this.navCtrl.pop();
		}
	}
}
