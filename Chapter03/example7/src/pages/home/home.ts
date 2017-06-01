import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  food:String;

  constructor() {
    this.food = 'pizza';
  }
}
