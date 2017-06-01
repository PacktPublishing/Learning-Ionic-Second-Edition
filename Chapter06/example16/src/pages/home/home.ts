import { Component } from '@angular/core';
import { Device } from 'ionic-native';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	cordova: String;
	model: String;
	platform: String;
	uuid: String;
	version: String;
	manufacturer: String;
	isVirtual: Boolean;
	serial: String;


	constructor() {
		this.cordova = Device.cordova;
		this.model = Device.model;
		this.platform = Device.platform;
		this.uuid = Device.uuid;
		this.version = Device.version;
		this.manufacturer = Device.manufacturer;
		this.isVirtual = Device.isVirtual;
		this.serial = Device.serial;

	}

}
