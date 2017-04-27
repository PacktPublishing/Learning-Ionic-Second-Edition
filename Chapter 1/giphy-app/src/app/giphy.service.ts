import { Injectable } from '@angular/core';
import { Http, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class GiphyService {
	private giphyAPIBase = 'http://api.giphy.com/v1/gifs';
	private APIKEY = 'dc6zaTOxFJmzC';

	constructor(private http: Http) { }

	getRandomGif(): Observable<Response> {
		return this.http.get(this.giphyAPIBase + '/random?api_key=' + this.APIKEY)
			.map((res) => res.json());
	}

	getTrendingGifs(offset, limit): Observable<Response> {
		return this.http.get(this.giphyAPIBase + '/trending?api_key=' + this.APIKEY + '&offset=' + offset + '&limit=' + limit)
			.map((res) => res.json());
	}

	searchGifs(offset, limit, text): Observable<Response> {
		return this.http.get(this.giphyAPIBase + '/search?api_key=' + this.APIKEY + '&offset=' + offset + '&limit=' + limit + '&q=' + text)
			.map((res) => res.json());
	}
}
