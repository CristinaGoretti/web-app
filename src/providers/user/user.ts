import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { User } from '../../models/user';
import { Issue } from '../../models/issue';
import { config } from '../../app/config';



/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(config.apiUrl + '/users?page=1&pageSize=20&sort=firstname' ).pipe();
  }

  getUser(id :string): Observable<User> {
    return this.http.get<User>(config.apiUrl + '/users/' + id);
  }
  
  //Pas de réception de l'header
  getUserIsssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(config.apiUrl + '/me/issues');
  }

  //reception de l'header
  getMoreIssuesLink(link: string): Observable<HttpResponse<Issue[]>> {
    console.log("..............");
    console.log(link);
    return this.http.get<Issue[]>(link, {observe: 'response'});
  }  

}
