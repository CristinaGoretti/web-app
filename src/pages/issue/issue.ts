import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';
import { CreateCommentPage } from '../create-comment/create-comment';
import { IssuesProvider } from '../../providers/issues/issues';
import { Issue } from '../../models/issue';
import { Comment } from '../../models/comment'

/**
 * Generated class for the IssuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-issue',
  templateUrl: 'issue.html',
})
export class IssuePage {
  issue: Issue;
  public idIssue;
  public comments: Comment[];
  items = [];
  public linkMoreComment: string;

  constructor(
    private auth: AuthProvider,
	  public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
    public issuesProvider: IssuesProvider
  ) {

    this.idIssue = navParams.get('id');

    for (var i = 0; i < 30; i++) {
      this.items.push( this.items.length );
    }
  }

/*  doInfinite(): Promise<any> {
    console.log('Begin async operation');

    return new Promise((resolve) => {
      setTimeout(() => {
        for (var i = 0; i < 10; i++) {
          this.items.push( this.items.length );
        }
        console.log('Async operation has ended');
        resolve();
      }, 500);
    })
  }*/
  

  getIssue(){
    this.issuesProvider.getIssue(this.idIssue).subscribe(issue => {
      this.issue = issue;
      console.log(this.issue);
    }, err => {
      console.warn('Could not get issue' , err);
    });
  }

  getCommentaireIssue(){
    this.issuesProvider.getCommentsIssueLink(this.idIssue).subscribe(httpResponse => {
      this.comments = httpResponse.body;

      console.log(httpResponse);
      console.log("-----------------");
      console.log(httpResponse.body);
      console.log("-----------------");
      console.log(httpResponse.headers.get("Link"));
      if(httpResponse.headers.get("Link") != null){
        this.linkMoreComment = httpResponse.headers.get("Link").substring(1, httpResponse.headers.get("Link").indexOf(">"));
      }
      
      console.log("-----------------");
    }, err => {
      console.warn('Could not get comments', err);
    })
  }
  getMoreComment(){
    this.issuesProvider.getMoreCommentsIssueLink(this.idIssue, this.linkMoreComment).subscribe(httpResponse =>{
      this.comments = httpResponse.body;
      this.linkMoreComment = httpResponse.headers.get("Link").substring(1, httpResponse.headers.get("Link").indexOf(">"));
    }, err => {
      console.warn('Could not get more comments', err);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssuePage');
    this.getIssue();
    this.getCommentaireIssue();
  }
  
   logOut() {
    this.auth.logOut();
  }
  
  goToCreateComment(id){
  this.navCtrl.push(CreateCommentPage, {
    id: this.idIssue
  });
  }

}
