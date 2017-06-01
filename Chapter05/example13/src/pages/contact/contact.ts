import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

@Component({
	selector: 'page-contact',
	templateUrl: 'contact.html'
})
export class ContactPage {
	isWindows: Boolean;

	constructor(public platform: Platform) {
		this.isWindows = platform.is('windows');
	}
}
