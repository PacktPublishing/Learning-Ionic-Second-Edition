import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import {MyModal} from './modal.ts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public modalCtrl: ModalController) {

  }

  showModal() {
		let modal = this.modalCtrl.create(MyModal);
    	modal.present();
	}

}
