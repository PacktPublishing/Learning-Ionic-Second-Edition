import { Component } from '@angular/core';
import { Config } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(private config : Config) {
  	config.set('ios', 'themePref', 'dark');
  	// later on...
  	// ...
  	// ...
  	config.get('themePref');
  }
}
