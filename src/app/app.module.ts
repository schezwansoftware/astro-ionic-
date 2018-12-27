import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HomePage} from "../pages/home/home";
import {AlertsPage} from "../pages/alerts/alerts";
import {LoginPage} from "../pages/login/login";
import { AuthProvider } from '../providers/auth/auth';
import { LoginProvider } from '../providers/login/login';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {AuthInterceptor} from "../interceptors/auth.interceptor";
import { PrincipalProvider } from '../providers/principal/principal';
import { UserProvider } from '../providers/user/user';


@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    HomePage,
    AlertsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    HomePage,
    AlertsPage,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    LoginProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    PrincipalProvider,
    UserProvider,
  ]
})
export class AppModule {}
