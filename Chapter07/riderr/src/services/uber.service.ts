import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { InAppBrowser } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UberAPI {
	private client_secret: string = 'tYnWxlDaGyCZq7-9NSJh_wszDsNGIkUD8YMRM0cj';
	private client_id: string = 'n2prVpCwjDJRsKkpttI-WyPyLkoD65QN';
	private redirect_uri: string = 'http://localhost/callback';
	private scopes: string = 'profile history places request';
	// we will be using the sandbox URL for our app
	private UBERSANDBOXAPIURL = 'https://sandbox-api.uber.com/v1.2/';
	// private UBERAPIURL = 'https://api.uber.com/v1.2/';
	private TOKENKEY = 'token'; // name of the key in storage
	private loader; // reference to the loader
	private token; // copy of token in memory

	constructor(private http: Http,
		private storage: Storage,
		private loadingCtrl: LoadingController) {
		// fetch the token on load
		this.storage.get(this.TOKENKEY).then((token) => {
			this.token = token;
		});
	}

	private createAuthorizationHeader(headers: Headers) {
		headers.append('Authorization', 'Bearer ' + this.token);
		headers.append('Accept-Language', 'en_US');
		headers.append('Content-Type', 'application/json');
	}

	isAuthenticated(): Observable<boolean> {
		this.showLoader('Autenticating...');
		return new Observable<boolean>((observer) => {
			this.storage.ready().then(() => {
				this.storage.get(this.TOKENKEY).then((token) => {
					observer.next(!!token); // !! -> converts truthy fasly to boolean.
					observer.complete();
					this.hideLoader();
				});
			});
		});
	}


	logout(): Observable<boolean> {
		return new Observable<boolean>((observer) => {
			this.storage.ready().then(() => {
				this.storage.set(this.TOKENKEY, undefined);
				this.token = undefined;
				observer.next(true);
				observer.complete();
			});
		});
	}

	auth(): Observable<boolean> {
		return new Observable<boolean>(observer => {
			this.storage.ready().then(() => {
				let browser = new InAppBrowser(`https://login.uber.com/oauth/v2/authorize?client_id=${this.client_id}&response_type=code&scope=${this.scopes}&redirect_uri=${this.redirect_uri}`, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
				browser.on('loadstart').subscribe((event) => {
					let url = event.url;
					// console.log(url);
					// URLS that get fired
					// 1. https://login.uber.com/oauth/v2/authorize?client_id=9i2dK88Ovw0WvH3wmS-H0JA6ZF5Z2GP1&response_type=code&scope=profile%20history%20places%20request
					// 2. https://auth.uber.com/login/?next_url=https%3A%2F%2Flogin.uber.com%2Foauth%…520places%2520request&state=Pa2ONzlEGsB4M41VLKOosWTlj9snJqJREyCFrEhfjx0%3D
					// 3. https://login.uber.com/oauth/v2/authorize?client_id=9i2dK88Ovw0WvH3wmS-H0JA…ry%20places%20request&state=Pa2ONzlEGsB4M41VLKOosWTlj9snJqJREyCFrEhfjx0%3D
					// 4. http://localhost/callback?state=Pa2ONzlEGsB4M41VLKOosWTlj9snJqJREyCFrEhfjx0%3D&code=9Xu6ueaNhUN1uZVvqvKyaXPhMj8Bzb#_

					// we are interested in #4
					if (url.indexOf(this.redirect_uri) === 0) {
						browser.close();
						let resp = (url).split("?")[1];
						let responseParameters = resp.split("&");
						var parameterMap: any = {};

						for (var i = 0; i < responseParameters.length; i++) {
							parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
						}

						// console.log('parameterMap', parameterMap);
						/*
							{
							  "state": "W9Ytf2cicTMPMpMgwh9HfojKv7gQxxhrcOgwffqdrUM%3D",
							  "code": "HgSjzZHfF4GaG6x1vzS3D96kGtJFNB#_"
							}
						*/

						let headers = new Headers({
							'Content-Type': "application/x-www-form-urlencoded"
						});
						let options = new RequestOptions({ headers: headers });
						let data = `client_secret=${this.client_secret}&client_id=${this.client_id}&grant_type=authorization_code&redirect_uri=${this.redirect_uri}&code=${parameterMap.code}`;

						return this.http.post('https://login.uber.com/oauth/v2/token', data, options)
							.subscribe((data) => {
								let respJson: any = data.json();
								// console.log('respJson', respJson);
								/*
									{
									  "last_authenticated": 0,
									  "access_token": "snipp",
									  "expires_in": 2592000,
									  "token_type": "Bearer",
									  "scope": "profile history places request",
									  "refresh_token": "26pgA43ZvQkxEQi7qYjMASjfq6lg8F"
									}
								*/

								this.storage.set(this.TOKENKEY, respJson.access_token);
								this.token = respJson.access_token; // load it up in memory
								observer.next(true);
								observer.complete();
							});
					}
				});
			});
		});
	}

	getMe(): Observable<Response> {
		this.showLoader();
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		return this.http.get(this.UBERSANDBOXAPIURL + 'me', {
			headers: headers
		});
	}

	getHistory(): Observable<Response> {
		this.showLoader();
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		return this.http.get(this.UBERSANDBOXAPIURL + 'history', {
			headers: headers
		});
	}

	getPaymentMethods(): Observable<Response> {
		this.showLoader();
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		return this.http.get(this.UBERSANDBOXAPIURL + 'payment-methods', {
			headers: headers
		});
	}

	getProducts(lat: Number, lon: Number): Observable<Response> {
		this.showLoader();
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		return this.http.get(this.UBERSANDBOXAPIURL + 'products?latitude=' + lat + '&longitude=' + lon, {
			headers: headers
		});
	}

	requestRideEstimates(start_lat: Number, end_lat: Number, start_lon: Number, end_lon: Number): Observable<Response> {
		this.showLoader();
		// before booking
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		return this.http.post(this.UBERSANDBOXAPIURL + 'requests/estimate', {
			"start_latitude": start_lat,
			"start_longitude": start_lon,
			"end_latitude": end_lat,
			"end_longitude": end_lon
		}, { headers: headers });
	}

	requestRide(product_id: String, fare_id: String, start_lat: Number, end_lat: Number, start_lon: Number, end_lon: Number): Observable<Response> {
		this.showLoader();
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		return this.http.post(this.UBERSANDBOXAPIURL + 'requests', {
			"product_id": product_id,
			"fare_id": fare_id,
			"start_latitude": start_lat,
			"start_longitude": start_lon,
			"end_latitude": end_lat,
			"end_longitude": end_lon
		}, { headers: headers });
	}

	getCurrentRides(lat: Number, lon: Number): Observable<Response> {
		this.showLoader();
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		return this.http.get(this.UBERSANDBOXAPIURL + 'requests/current', {
			headers: headers
		});
	}

	cancelCurrentRide(): Observable<Response> {
		this.showLoader();
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		return this.http.delete(this.UBERSANDBOXAPIURL + 'requests/current', {
			headers: headers
		});
	}

	private showLoader(text?: string) {
		this.loader = this.loadingCtrl.create({
			content: text || 'Loading...'
		});
		this.loader.present();
	}

	public hideLoader() {
		this.loader.dismiss();
	}
}