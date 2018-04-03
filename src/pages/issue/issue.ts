import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpClient } from '@angular/common/http';
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
  public navigation: string[];
  public linkFirst: string;
  public linkPrev: string;
  public linkNext: string;
  public linkLast: string;
  public linkParse: string;

  constructor(
    private auth: AuthProvider,
	public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
    public issuesProvider: IssuesProvider
  ) {

    this.idIssue = navParams.get('id');
  }
  

  getIssue(){
    this.issuesProvider.getIssue(this.idIssue).subscribe(issue => {
      this.issue = issue;
      console.log(this.issue);
    }, err => {
      console.warn('Could not get issue' , err);
    });
  }

  /*getCommentaireIssue(){
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
  }*/
  getMoreComment(link: string){
    this.issuesProvider.getMoreCommentsIssueLink(this.idIssue, link).subscribe(httpResponse =>{
      this.comments = httpResponse.body;
      this.navigation = null;
      if(httpResponse.headers.get("Link")){
        this.linkParse = httpResponse.headers.get("Link").replace(/\s+/g, '').replace(/</g, '');
        console.log(this.linkParse);
        this.navigation =  this.linkParse.split(",");
        console.log(this.navigation);
  
        this.linkFirst = null;
        this.linkPrev = null;
        this.linkNext = null;
        this.linkLast = null;
  
        this.navigation.forEach(link => {
          if(link.includes("first")){
            this.linkFirst = link.substring(0, link.indexOf(">"));
          }
          if(link.includes("prev")){
            this.linkPrev = link.substring(0, link.indexOf(">"));
          }
          if(link.includes("next")){
            this.linkNext = link.substring(0, link.indexOf(">"));
          }
          if(link.includes("last")){
            this.linkLast = link.substring(0, link.indexOf(">"));
          }
        });        
      }
    }, err => {
      console.warn('Could not get more comments', err);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssuePage');
    this.getIssue();
    this.linkFirst = "https://comem-appmob-2018b.herokuapp.com/api/issues/" + this.idIssue + "/comments?page=1&pageSize=20>";
    this.getMoreComment(this.linkFirst);
    console.log(this.linkFirst);
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
