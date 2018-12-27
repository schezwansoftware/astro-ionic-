import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {SERVER_API_URL} from "../../constants";

/*
  Generated class for the AccountProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccountProvider {

  constructor(public http: HttpClient) {
  }

  getAccount(): Observable<HttpResponse<any>> {
    return this.http.get(SERVER_API_URL + 'api/account', {observe: 'response'});
  }
}
