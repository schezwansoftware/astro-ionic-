import {Component, OnInit} from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AlertsPage} from "../alerts/alerts";
import {AuthProvider} from "../../providers/auth/auth";
import {UserProvider} from "../../providers/user/user";
import {PrincipalProvider} from "../../providers/principal/principal";
import {LoginPage} from "../login/login";

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
export class HomePage implements OnInit {
  items: Item[] = [];
  account: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authServerProvider: AuthProvider, private userService: UserProvider, private principal: PrincipalProvider, private app: App) {
  }

  ngOnInit() {
    this.principal.identity().then((account) => {
        this.account = account;
    });
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
    this.authServerProvider.logout().subscribe();
    this.principal.authenticate(null);
    this.navCtrl.setRoot(LoginPage);
  }

  loadAllUsers() {
    this.userService.findAll().subscribe(res => {
      console.log(res.body);
    });
  }

  isAuthenticated(): boolean {
    return this.principal.isAuthenticated();
  }
}

interface Item {
  title?: string,
  component?: any,
}
