import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SERVER_API_URL} from "../../constants";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
private resourceUrl: string = SERVER_API_URL + 'api/users';
  constructor(public http: HttpClient) {
  }

  findAll(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.resourceUrl, { observe: 'response'});
  }
}
