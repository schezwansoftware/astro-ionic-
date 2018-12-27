import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {LoginProvider} from "../../providers/login/login";
import {JWT_TOKEN_KEY} from "../../constants";
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  account: any = {};
  constructor(
    private loginService: LoginProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    ) {
  }

  ionViewDidLoad() {}

  login() {
    const loadingBar = this.loadingCtrl.create({
      'content': 'Please wait...'
    });
    loadingBar.present();
    this.loginService.login(this.account).then(() => {
      loadingBar.dismiss();
      this.navCtrl.setRoot(HomePage);
    }).catch( err => {
      const alert = this.alertCtrl.create();
      alert.addButton({
        text: 'OK',
        role: 'cancel'
      });
      if (err.status === 401) {
        alert.setTitle('Incorrect Username/Password');
        alert.setMessage('The username/password you entered is incorrect. Please check your credentials and try again');
      }else {
        alert.setTitle('Unable to login');
        alert.setMessage('OOpss!!..Something went terribly wrong.');
      }
      alert.present();
      loadingBar.dismiss();
    });
  }

}
