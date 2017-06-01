import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IP {
	constructor(private http: Http) {}

	get() : Observable <Response>{
		return this.http.get('https://api.ipify.org/?format=json');
	}
}