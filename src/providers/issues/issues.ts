import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { config } from '../../app/config';
import { Issue } from '../../models/issue';
import { Comment } from '../../models/comment';
import { CommentRequest } from '../../models/comment-request';
import { IssueRequest } from '../../models/issue-request';
import { IssueType } from '../../models/issueType';


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


  //Les basiques sont récupération des headers
  getIssue(id :string): Observable<Issue> {
    return this.http.get<Issue>(config.apiUrl + '/issues/' + id);

  }
  getCommentsIssue(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(config.apiUrl + '/issues/' + id + '/comments');
  }
  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(config.apiUrl + '/issues?include=creator&include=issueType' );
  }


  //Les complexes avec récupération des headers
  getIssuesLink(): Observable<HttpResponse<Issue[]>> {
    return this.http.get<Issue[]>(config.apiUrl + '/issues?include=creator&include=issueType', {observe: 'response' } );
  }
  getCommentsIssueLink(id: string): Observable<HttpResponse<Comment[]>> {
    //const options = { observe:  'response' };
    return this.http.get<Comment[]>(config.apiUrl + '/issues/' + id + '/comments', {observe: 'response'});
  }


  getMoreCommentsIssueLink(id: string, link: string): Observable<HttpResponse<Comment[]>> {
    return this.http.get<Comment[]>(link + "include=creator&include=issueType", {observe: 'response'});
  }
  getMoreIssuesLink(link: string): Observable<HttpResponse<Issue[]>> {
    return this.http.get<Issue[]>(link, {observe: 'response'});
  }
  postCommentsIssue(commentRequest: CommentRequest, id: string): Observable<Comment> {
    return this.http.post<Comment>(config.apiUrl + '/issues/' + id + '/comments', commentRequest).pipe();
    
  }
  postIssue(issueRequest: IssueRequest): Observable<Issue> {
    return this.http.post<Issue>(config.apiUrl + '/issues', issueRequest).pipe();
  }
  getIssueTypes(): Observable<IssueType[]> {
    return this.http.get<IssueType[]>(config.apiUrl + '/issueTypes');
  }
  
}
