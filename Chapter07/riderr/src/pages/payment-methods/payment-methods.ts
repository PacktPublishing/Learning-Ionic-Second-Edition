import { Component } from '@angular/core';
import { UberAPI } from '../../services/uber.service';

@Component({
  selector: 'page-payment-methods',
  templateUrl: 'payment-methods.html'
})
export class PaymentMethodsPage {
  payment_methods;

  constructor(private uberApi: UberAPI) { }

	ngAfterViewInit() {
		this.uberApi.getPaymentMethods().subscribe((data) => {
			// console.log(data.json());
			this.payment_methods = data.json().payment_methods;
			// need a clean way to fix this!
			this.uberApi.hideLoader();
		}, (err) => {
			console.log(err);
			this.uberApi.hideLoader();
		});
	}
}
