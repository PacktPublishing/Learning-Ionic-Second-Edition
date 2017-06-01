import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Todos {
	private LS_TODOS_KEY = 'todos';

	constructor(private storage: Storage) { }

	set(todos): void {
		this.storage.set(this.LS_TODOS_KEY, todos);
	}

	get(): Promise<any> {
		return this.storage.get(this.LS_TODOS_KEY);
	}
}
