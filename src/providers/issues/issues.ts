import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { config } from '../../app/config';
import { Issue } from '../../models/issue';


/*
  Generated class for the IssuesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IssuesProvider {

 constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(config.apiUrl + '/issues' ).pipe();
  }
	
  getIssue(id :string): Observable<Issue> {
    return this.http.get<Issue>(config.apiUrl + '/issue/' + id);
  }
}
