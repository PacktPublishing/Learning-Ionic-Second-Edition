import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'hello-modal',
  templateUrl: 'hello-modal.html'
})
export class HelloModalComponent {

  constructor(public viewCtrl: ViewController) { }

  close() {
    this.viewCtrl.dismiss({'random' : 'data'});
  }

}
