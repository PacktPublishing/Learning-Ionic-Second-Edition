import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  openAbout(text){
  	text = text || 'Nothing was entered';

  	this.navCtrl.push(AboutPage, {
  		data : text
  	});
  }
}
