import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { HelloModalComponent } from '../../components/hello-modal/hello-modal';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	constructor(public modalCtrl: ModalController) { }

	show() {
		let modal = this.modalCtrl.create(HelloModalComponent);
		modal.present();
		modal.onDidDismiss((data) => {
			console.log(data);
		});
	}

}
