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

  doInfinite(): Promise<any> {
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
  }
  

  getIssue(){
    console.log(this.idIssue);
    this.issuesProvider.getIssue(this.idIssue).subscribe(issue => {
      this.issue = issue;
      console.log(this.issue);
    }, err => {
      console.warn('Could not get issue' , err);
    });
  }

  //ICI il y a un soucis avec les commentaires qui ne veulent pas s'ajouter...
  getCommentaireIssue(){
    console.log(this.idIssue);
    this.issuesProvider.getCommentsIssue(this.idIssue).subscribe(comment => {
      this.comments = comment;
      console.log("hello" + comment);
      console.log("hello2" + this.comments);
    }, err => {
      console.warn('Could not get comments', err);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssuePage');
    this.getIssue();
    this.getCommentaireIssue();
    console.log("bonjour " + this.items);
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
