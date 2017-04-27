import { Component, OnInit } from '@angular/core';
import { GiphyService } from '../giphy.service';

@Component({
	selector: 'app-trending',
	templateUrl: './trending.component.html',
	styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {

	private offset = 0;
	private perPage = 12;
	public results: any;
	public gifs: Array<any> = [];
	public isLoading: boolean = true;

	constructor(private giphyService: GiphyService) { }

	ngOnInit() {
		this.getTrendingGifs(this.offset, this.perPage);
	}

	getTrendingGifs(offset, limit) {
		this.giphyService.getTrendingGifs(offset, limit).subscribe(
			(data) => {
				this.results = data;
				this.gifs = this.gifs.concat(this.results.data);
				this.isLoading = false;
			},
			(err) => console.log('Oops!', err),
			() => console.log('Response', this.results)
		)
	}

	getMore() {
		this.isLoading = true;
		this.offset = this.offset + this.perPage;
		this.getTrendingGifs(this.offset, this.perPage);
	}
}
