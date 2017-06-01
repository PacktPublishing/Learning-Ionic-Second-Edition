import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ContactPage } from '../contact/contact.ts';
import { HomePage } from '../home/home.ts';


@Component({
	selector: 'page-about',
	templateUrl: 'about.html'
})
export class AboutPage {

	constructor(public navCtrl: NavController) { }

	ionViewDidLoad() {
		console.log('About Page Loaded');
	}

	goTo(page) {
		if (page === 'home') {
			this.navCtrl.push(HomePage);
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
