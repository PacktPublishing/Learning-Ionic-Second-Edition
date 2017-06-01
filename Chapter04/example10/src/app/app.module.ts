import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  // imports: [
  //   IonicModule.forRoot(MyApp, {
  //       mode: 'md'
  //   })
  // ],
  // imports: [
  //   IonicModule.forRoot(MyApp, {
  //     backButtonText: 'Go Back',
  //     iconMode: 'ios',
  //     modalEnter: 'modal-slide-in',
  //     modalLeave: 'modal-slide-out',
  //     tabsPlacement: 'bottom',
  //     pageTransition: 'ios',
  //   })
  // ],
  imports: [
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'bottom',
      platforms: {
        ios: {
          tabsPlacement: 'top',
        }
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
