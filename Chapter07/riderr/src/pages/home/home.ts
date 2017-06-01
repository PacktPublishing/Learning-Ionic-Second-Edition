import { Component } from '@angular/core';
import { BookRidePage } from '../book-ride/book-ride';
import { ProfilePage } from '../profile/profile';
import { HistoryPage } from '../history/history';
import { PaymentMethodsPage } from '../payment-methods/payment-methods';
import { LoginPage } from '../login/login';
import { UberAPI } from '../../services/uber.service';
import { NavController, Events } from 'ionic-angular';
import { ViewChild } from '@angular/core';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	private rootPage;
	private bookRidePage;
	private profilePage;
	private historyPage;
	private paymentMethodsPage;
	
	@ViewChild(BookRidePage) bookRide : BookRidePage;

	constructor(private uberApi: UberAPI,
		private navCtrl: NavController,
		public events: Events) {
		this.rootPage = BookRidePage;

		this.bookRidePage = BookRidePage;
		this.profilePage = ProfilePage;
		this.historyPage = HistoryPage;
		this.paymentMethodsPage = PaymentMethodsPage;
	}

	// http://stackoverflow.com/a/38760731/1015046
	ionOpened() {
		this.events.publish('menu:opened', '');
	}

	ionClosed() {
		this.events.publish('menu:closed', '');
	}

	ngAfterViewInit() {
		this.uberApi.isAuthenticated().subscribe((isAuth) => {
			if (!isAuth) {
				this.navCtrl.setRoot(LoginPage);
				return;
			}
		});
	}

	openPage(p) {
		this.rootPage = p;
	}

	logout(){
		this.uberApi.logout().subscribe(() => {
			this.navCtrl.setRoot(LoginPage);
		});
	}
}
