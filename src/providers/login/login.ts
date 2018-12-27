import { Injectable } from '@angular/core';
import {AuthProvider} from "../auth/auth";
import {HttpResponse} from "@angular/common/http";
import {PrincipalProvider} from "../principal/principal";

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(private authServerProvider: AuthProvider, private principal: PrincipalProvider) {
  }

  login (credentials, callback?) {
    const cb = callback || function () {};
    return new Promise((resolve, reject) => {
      this.authServerProvider.authenticate(credentials).subscribe((res: HttpResponse<any> ) => {
        this.principal.identity(true).then(() => {
          resolve(res);
        });
        return cb();
      }, err => {
        reject(err);
        return cb(err);
      });
    });
  }
}
