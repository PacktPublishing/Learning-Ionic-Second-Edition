import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	users: any[] = [];

	constructor(public navCtrl: NavController, public storage: Storage) {
		// get all the users from storage on load
		this.getUsers();
	}

	getUsers() {
		this.storage.forEach((v, k, i) => {
			if (k.indexOf('user-') === 0) {
				this.users.push(v);
			}
		});
	}

	addUser(name, age) {
		let user = {
			id: this.genRandomId(),
			name: name.value,
			age: age.value
		};
		// save it to the storage
		this.storage.set('user-' + user.id, user);
		// update the inmemory variable to refresh the UI
		this.users.push(user);
		// reset the form
		name.value = '';
		age.value = '';
	}

	removeUser(user) {
		// remove from storage
		this.storage.remove('user-' + user.id);
		// update the inmemory variable to refresh the UI
		this.users.splice(this.users.indexOf(user), 1);
	}

	genRandomId() {
		return Math.floor(Math.random() * 9999); // up to 4 digits random number
	}

}
