import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {JWT_TOKEN_KEY, SERVER_API_URL} from "../../constants";
import {Observable} from "rxjs/Observable";
import {map} from "rxjs/operators";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  private resourceUrl: string = SERVER_API_URL + 'api/authenticate';

  constructor(public http: HttpClient) {
  }

  authenticate(credentials): Observable<any> {
    return this.http.post(this.resourceUrl, credentials, {observe: 'response'}).pipe(map(authSuccess.bind(this)));

    function authSuccess(resp: HttpResponse<any>) {
      const bearerToken = resp.headers.get('Authorization');
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        const jwt = bearerToken.slice(7, bearerToken.length);
        AuthProvider.storeAuthenticationToken(jwt, credentials.rememberMe);
        return jwt;
      }
    }
  }

  static storeAuthenticationToken(jwt, rememberMe) {
    if (rememberMe) {
      sessionStorage.setItem(JWT_TOKEN_KEY, jwt);
    } else {
      localStorage.setItem(JWT_TOKEN_KEY, jwt)
    }
  }

  logout(): Observable<any> {
    return new Observable(obs => {
      localStorage.removeItem(JWT_TOKEN_KEY);
      sessionStorage.removeItem(JWT_TOKEN_KEY);
      obs.complete();
    });
  }
}

