import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
	selector: 'page-about',
	templateUrl: 'about.html'
})
export class AboutPage {

	text: string;

	constructor(public navCtrl: NavController, public navParams: NavParams) { 
		this.text = navParams.get('data');
	}

	goBack() {
		this.navCtrl.pop();
	}

	ionViewDidLoad() {
		console.log("About page: ionViewDidLoad Fired");
	}

	ionViewWillEnter() {
		console.log("About page: ionViewWillEnter Fired");
	}

	ionViewDidEnter() {
		console.log("About page: ionViewDidEnter Fired");
	}

	ionViewWillLeave() {
		console.log("About page: ionViewWillLeave Fired");
	}

	ionViewDidLeave() {
		console.log("About page: ionViewDidLeave Fired");
	}

	ionViewWillUnload() {
		console.log("About page: ionViewWillUnload Fired");
	}

	ionViewDidUnload() {
		console.log("About page: ionViewDidUnload Fired");
	}
}
