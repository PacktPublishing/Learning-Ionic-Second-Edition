import { Component } from '@angular/core';
import { UberAPI } from '../../services/uber.service';
import {
	Platform,
	NavController,
	AlertController,
	ModalController,
	Events
} from 'ionic-angular';
import {
	Geolocation,
	Diagnostic,
	GoogleMap,
	GoogleMapsEvent,
	GoogleMapsLatLng,
	CameraPosition,
	GoogleMapsMarkerOptions,
	GoogleMapsMarker
} from 'ionic-native';
import { AutocompletePage } from '../auto-complete/auto-complete';

@Component({
	selector: 'page-book-ride',
	templateUrl: 'book-ride.html'
})
export class BookRidePage {
	private map: GoogleMap;
	private products;
	private fromGeo;
	private toGeo;
	private selectedProduct;
	private isRideinProgress: boolean = false;
	private currentRideInfo;

	constructor(private uberApi: UberAPI,
		private platform: Platform,
		private navCtrl: NavController,
		private alertCtrl: AlertController,
		private modalCtrl: ModalController,
		public events: Events) { }

	ngAfterViewInit() {
		//https://github.com/mapsplugin/cordova-plugin-googlemaps/issues/1140
		this.platform.ready().then(() => {
			this.requestPerms();

			//https://github.com/driftyco/ionic/issues/9942#issuecomment-280941997
			this.events.subscribe('menu:opened', () => {
				this.map.setClickable(false);
			});
			this.events.subscribe('menu:closed', () => {
				this.map.setClickable(true);
			});
		});
	}

	private requestPerms() {
		let that = this;
		function success(statuses) {
			for (var permission in statuses) {
				switch (statuses[permission]) {
					case Diagnostic.permissionStatus.GRANTED:
						// console.log("Permission granted to use " + permission);
						that.fetCords();
						break;
					case Diagnostic.permissionStatus.NOT_REQUESTED:
						console.log("Permission to use " + permission + " has not been requested yet");
						break;
					case Diagnostic.permissionStatus.DENIED:
						console.log("Permission denied to use " + permission + " - ask again?");
						break;
					case Diagnostic.permissionStatus.DENIED_ALWAYS:
						console.log("Permission permanently denied to use " + permission + " - guess we won't be using it then!");
						break;
				}
			}
		}

		function error(e) {
			console.log(e);
		}

		Diagnostic.requestRuntimePermissions([
			Diagnostic.permission.ACCESS_FINE_LOCATION,
			Diagnostic.permission.ACCESS_COARSE_LOCATION
		]).then(success).catch(error);
	}

	private isExecuted = false;
	private fetCords() {
		// this needs to be called only once
		// since we are requesting 2 permission
		// this will be called twice.
		// hence the isExecuted
		if (this.isExecuted) return;
		this.isExecuted = true;
		// maps api key : AIzaSyCZhTJB1kFAP70RuwDtt6uso9e3DCLdRWs
		// ionic plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyCZhTJB1kFAP70RuwDtt6uso9e3DCLdRWs"
		Geolocation.getCurrentPosition().then((resp) => {
			// resp.coords.latitude
			// resp.coords.longitude
			// console.log(resp);
			this.fromGeo = resp.coords;
			// Get the products at this location
			this.uberApi.getProducts(this.fromGeo.latitude, this.fromGeo.longitude).subscribe((data) => {
				this.uberApi.hideLoader();
				this.products = data.json().products;
			});
			// Trip in progress?
			this
				.uberApi
				.getCurrentRides(this.fromGeo.latitude, this.fromGeo.longitude)
				.subscribe((crrRides) => {
					console.log('crrRides', crrRides.json());
					this.currentRideInfo = crrRides.json();
					this.isRideinProgress = true;
					this.uberApi.hideLoader();
					// check for existing rides before processing
					this.loadMap(this.fromGeo.latitude, this.fromGeo.longitude);
				}, (err) => {
					if (err.status === 404) {
						// no rides availble
					}
					this.isRideinProgress = false;
					this.uberApi.hideLoader();
					// check for existing rides before processing
					this.loadMap(this.fromGeo.latitude, this.fromGeo.longitude);
				},() => {
					// not sure why
					this.uberApi.hideLoader();
				});
		}).catch((error) => {
			console.log('Error getting location', error);
		});
	}

	private loadMap(lat: number, lon: number) {
		let element: HTMLElement = document.getElementById('map');
		element.innerHTML = '';
		this.map = undefined;
		this.map = new GoogleMap(element);
		let crrLoc: GoogleMapsLatLng = new GoogleMapsLatLng(lat, lon);
		let position: CameraPosition = {
			target: crrLoc,
			zoom: 18,
			tilt: 30
		};

		this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
			// move the map's camera to position
			this.map.moveCamera(position); // works on iOS and Android

			let markerOptions: GoogleMapsMarkerOptions = {
				position: crrLoc,
				draggable: true,
				title: this.isRideinProgress ? 'Ride in Progess' : 'Select Destination >',
				infoClick: (() => {
					if (!this.isRideinProgress) {
						this.selectDestination();
					}
				}),
				markerClick: (() => {
					if (!this.isRideinProgress) {
						this.selectDestination();
					}
				})
			};

			this.map.addMarker(markerOptions)
				.then((marker: GoogleMapsMarker) => {
					marker.showInfoWindow();
				});
			
			// a rare bug
			// loader doesn't hide
			this.uberApi.hideLoader();
		});
	}

	private productClick(product) {
		// console.log(product);
		// set the active product in the UI
		for (let i = 0; i < this.products.length; i++) {
			if (this.products[i].product_id === product.product_id) {
				this.products[i].isSelected = true;
			} else {
				this.products[i].isSelected = false;
			}
		}

		this.selectedProduct = product;
	}

	private selectDestination() {
		if (this.isRideinProgress) {
			this.map.setClickable(false);
			let alert = this.alertCtrl.create({
				title: 'Only one ride!',
				subTitle: 'You can book only one ride at a time.',
				buttons: ['Ok']
			});
			alert.onDidDismiss(() => {
				this.map.setClickable(true);
			});
			alert.present();
		} else {
			if (!this.selectedProduct) {
				// since the alert has a button
				// we need to first stop the map from 
				// listening. Then process the alert
				// then renable
				this.map.setClickable(false);
				let alert = this.alertCtrl.create({
					title: 'Select Ride',
					subTitle: 'Select a Ride type to continue (Pool or Go or X)',
					buttons: ['Ok']
				});
				alert.onDidDismiss(() => {
					this.map.setClickable(true);
				});
				alert.present();
			} else {
				this.map.setClickable(false);
				let modal = this.modalCtrl.create(AutocompletePage);
				modal.onDidDismiss((data) => {
					this.map.setClickable(true);
					this.toGeo = data;
					this
						.uberApi
						.requestRideEstimates(this.fromGeo.latitude, this.toGeo.latitude, this.fromGeo.longitude, this.toGeo.longitude)
						.subscribe((data) => {
							this.uberApi.hideLoader();
							this.processRideFares(data.json());
						});
				});
				modal.present();
			}
		}
	}

	private processRideFares(fareInfo: any) {
		// ask the user if the fare is okay, 
		// if yes, book the cab
		// else, do nothing
		console.log('fareInfo', fareInfo);
		this.map.setClickable(false);
		let confirm = this.alertCtrl.create({
			title: 'Book Ride?',
			message: 'The fare for this ride would be ' + fareInfo.fare.value + ' ' + fareInfo.fare.currency_code + '.\n And it will take approximately ' + (fareInfo.trip.duration_estimate / 60) + ' mins.',
			buttons: [
				{
					text: 'No',
					handler: () => {
						this.map.setClickable(true);
					}
				},
				{
					text: 'Yes',
					handler: () => {
						this.map.setClickable(true);
						this
							.uberApi
							.requestRide(this.selectedProduct.product_id, fareInfo.fare.fare_id, this.fromGeo.latitude, this.toGeo.latitude, this.fromGeo.longitude, this.toGeo.longitude)
							.subscribe((rideInfo) => {
								this.uberApi.hideLoader();
								// console.log('rideInfo', rideInfo.json());
								// Since we are making requests to the sandbox url
								// the request will always be in processing.
								// Once the request has been submitted, we need to 
								// keep polling the getCurrentRides() API
								// to get the ride information
								// WE ARE NOT GOING TO DO THAT!
								this.isRideinProgress = true;
								this.currentRideInfo = rideInfo.json();
							});
					}
				}
			]
		});
		confirm.present();
	}

	private cancelRide() {
		this
			.uberApi
			.cancelCurrentRide()
			.subscribe((cancelInfo) => {
				this.uberApi.hideLoader();
				this.isRideinProgress = false;
				this.currentRideInfo = undefined;
			});
	}
}
