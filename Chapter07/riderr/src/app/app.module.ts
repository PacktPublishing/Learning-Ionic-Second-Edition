import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { BookRidePage } from '../pages/book-ride/book-ride';
import { AutocompletePage } from '../pages/auto-complete/auto-complete';
import { ProfilePage } from '../pages/profile/profile';
import { HistoryPage } from '../pages/history/history';
import { PaymentMethodsPage } from '../pages/payment-methods/payment-methods';

import { UberAPI } from '../services/uber.service';
import { Storage } from '@ionic/storage';

export function provideStorage() {
  return new Storage(); 
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    BookRidePage,
    AutocompletePage,
    ProfilePage,
    HistoryPage,
    PaymentMethodsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    BookRidePage,
    AutocompletePage,
    ProfilePage,
    HistoryPage,
    PaymentMethodsPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
    UberAPI,
    {provide: Storage, useFactory: provideStorage}
  ]
})
export class AppModule { }
