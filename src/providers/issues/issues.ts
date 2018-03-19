import { HttpClient } from '@angular/common/http';
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

  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(config.apiUrl + '/issues?include=creator&include=issueType' );
  }
	
  getIssue(id :string): Observable<Issue> {
    return this.http.get<Issue>(config.apiUrl + '/issues/' + id);

  }
  getCommentsIssue(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(config.apiUrl + '/issues/' + id + '/comments');
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
