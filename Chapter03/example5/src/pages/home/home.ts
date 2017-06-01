import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	myIcon: String;
	private iconNames: Array<String> = ['home', 'map', 'pin', 'heart', 'star'];

  constructor() {
    	this.myIcon = this.iconNames[Math.floor(Math.random() * this.iconNames.length)];
  }

}
