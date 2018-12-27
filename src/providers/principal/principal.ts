import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {AccountProvider} from "../account/account";

/*
  Generated class for the PrincipalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrincipalProvider {

  private userIdentity: any;
  private authenticated = false;
  private authenticationState = new Subject<any>();

  constructor(public http: HttpClient, private accountService: AccountProvider) {
  }

  authenticate(identity) {
    this.userIdentity = identity;
    this.authenticated = identity !== null;
    this.authenticationState.next(this.userIdentity);
  }


  hasAnyAuthority(authorities: string[]): Promise<boolean> {
    return Promise.resolve(this.hasAnyAuthority(authorities));
  }
  hasAnyAuthorityDirective(authorities: string[]) {
    if (!this.authenticated || !this.userIdentity || !this.userIdentity.authorities) {
      return false;
    }

    for(let i = 0; i < authorities.length; i++) {
      if (this.userIdentity.authorities.includes(authorities[i])) {
        return true;
      }
    }
    return false;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  isIdentityResolved(): boolean {
    return this.userIdentity !== undefined;
  }

  getAuthenticationState(): Observable<any> {
    return this.authenticationState.asObservable();
  }

  identity(force?: boolean): Promise<any> {
    if (force) {
      this.userIdentity = undefined;
    }

    if (this.userIdentity) {
      return Promise.resolve(this.userIdentity);
    }

    return this.accountService.getAccount().toPromise()
      .then(
        response => {
         const account = response.body;
         if (account) {
           this.userIdentity = account;
           this.authenticated = true;
         } else {
           this.userIdentity = null;
           this.authenticated = false;
         }
         this.authenticationState.next(this.userIdentity);
         return this.userIdentity;
        }
    ).catch(
      error => {
        this.userIdentity = null;
        this.authenticated = false;
        this.authenticationState.next(this.userIdentity);
        return null;
      }
    )
  }

}
