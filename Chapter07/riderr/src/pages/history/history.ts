import { Component } from '@angular/core';
import { UberAPI } from '../../services/uber.service';

@Component({
	selector: 'page-history',
	templateUrl: 'history.html'
})
export class HistoryPage {
	history: Array<any>;
	total: Number;
	count: Number;

	constructor(private uberApi: UberAPI) { }

	ngAfterViewInit() {
		this.uberApi.getHistory().subscribe((data) => {
			// console.log(data.json());
			let d = data.json();
			this.history = d.history;
			this.total = d.count;
			this.count = d.history.length;

			// need a clean way to fix this!
			this.uberApi.hideLoader();
		}, (err) => {
			console.log(err);
			this.uberApi.hideLoader();
		});
	}
}
