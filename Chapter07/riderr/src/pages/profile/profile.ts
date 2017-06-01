import { Component } from '@angular/core';
import { UberAPI } from '../../services/uber.service';

@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html'
})
export class ProfilePage {
	private profile;
	constructor(private uberApi: UberAPI) { }

	ngAfterViewInit() {
		this.uberApi.getMe().subscribe((data) => {
			// console.log(data.json());
			this.profile = data.json();
			// need a clean way to fix this!
			this.uberApi.hideLoader();
		}, (err) => {
			console.log(err);
			this.uberApi.hideLoader();
		});
	}
}
