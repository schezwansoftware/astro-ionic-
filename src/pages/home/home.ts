import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AlertsPage} from "../alerts/alerts";
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  items: Item[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private authServerProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    this.items.push(
      {
        title: 'Alerts',
        component: AlertsPage
      }
    );
  }

  onItemSelected(item: Item) {
    this.navCtrl.push(item.component);
  }

  logout() {
    this.authServerProvider.logout().subscribe(() => {});
  }

}

interface Item {
  title?: string,
  component?: any,
}
