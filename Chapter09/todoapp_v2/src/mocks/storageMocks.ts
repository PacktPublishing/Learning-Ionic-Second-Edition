export class StorageMocks {
	// mock store	
	store = {};

	public get(key) {
		return new Promise((resolve, reject) => {
			resolve(this.store[key]);
		});
	}

	public set(key, value){
		return new Promise((resolve, reject) => {
			this.store[key] = value;
			resolve(this.store[key]);
		});
	}
}