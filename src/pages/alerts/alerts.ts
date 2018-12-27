import { Component } from '@angular/core';
import {AlertController, IonicPage} from 'ionic-angular';

/**
 * Generated class for the AlertsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alerts',
  templateUrl: 'alerts.html',
})
export class AlertsPage {

  constructor(private alertController: AlertController) {
  }

  ionViewDidLoad() {
  }

  showAlerts() {
    let alert = this.alertController.create();
    alert.setTitle('Radio alert');
    alert.addInput({
      type: 'radio',
      label: 'Blue',
      value: 'Blue',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'Green',
      value: 'Green',
    });
    alert.addInput({
      type: 'radio',
      label: 'Red',
      value: 'Red',
    });
    alert.addInput({
      type: 'radio',
      label: 'Purple',
      value: 'Purple'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('okay',data);
      }
    });
    alert.present();
  }

  showCheckBoxAlert() {
    let alert = this.alertController.create();
    alert.setTitle('Your Favourite Places Alert');
    alert.addInput({
      type: 'checkbox',
      label: 'Bali',
      value: 'Bali',
      checked: true
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Spain',
      value: 'Spain',
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Paris',
      value: 'Paris',
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Rome',
      value: 'Rome'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('okay',data);
      }
    });
    alert.present();
  }

}
