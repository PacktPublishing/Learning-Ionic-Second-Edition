import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AboutPage } from '../about/about.ts';
import { HomePage } from '../home/home.ts';

@Component({
	selector: 'page-contact',
	templateUrl: 'contact.html'
})
export class ContactPage {

	constructor(public navCtrl: NavController) { }

	ionViewDidLoad() {
		console.log('Contact Page Loaded');
	}

	goTo(page) {
		if (page === 'home') {
			this.navCtrl.push(HomePage);
		} else if (page === 'about') {
			this.navCtrl.push(AboutPage);
		}
	}

	back() {
		if (this.navCtrl.getViews().length >= 2) {
			this.navCtrl.pop();
		}

	}
}
