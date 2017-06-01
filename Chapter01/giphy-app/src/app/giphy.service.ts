import { Injectable } from '@angular/core';
import { Http, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class GiphyService {
  private giphyAPIBase = 'http://api.giphy.com/v1/gifs';
	
  constructor(private http: Http) { }

  getRandomGif(): Observable<Response> {
    return this.http.get(this.giphyAPIBase + '/random?api_key=dc6zaTOxFJmzC').map(res => res.json());
  }

  getTrendingGifs(offset, limit): Observable<Response> {
    return this.http.get(this.giphyAPIBase + '/trending?api_key=dc6zaTOxFJmzC&offset=' + offset+ '&limit=' + limit).map(res => res.json());
  }

   searchGifs(offset, limit, text): Observable<Response> {
    return this.http.get(this.giphyAPIBase + '/search?api_key=dc6zaTOxFJmzC&offset=' + offset+ '&limit=' + limit + '&q=' + text).map(res => res.json());
  }
}
