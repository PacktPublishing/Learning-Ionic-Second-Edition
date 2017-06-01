import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	constructor(public platform: Platform) {}
}
