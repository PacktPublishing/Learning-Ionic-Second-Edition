import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Auth {
	private LS_AUTH_KEY = 'auth';

	constructor(private storage: Storage) { }

	login(user: any): Boolean {
		if (user.email === 'a@a.com', user.password === 'a') {
			this.storage.set(this.LS_AUTH_KEY, true)
			return true;
		} else {
			return false;
		}
	}

	isAuthenticated(): Promise<Storage> {
		return this.storage.get(this.LS_AUTH_KEY);
	}

	logout(): void {
		this.storage.set(this.LS_AUTH_KEY, undefined);
	}
}
