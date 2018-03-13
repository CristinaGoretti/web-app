import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';
import { CreateCommentPage } from '../create-comment/create-comment';
import { IssuesProvider } from '../../providers/issues/issues';
import { Issue } from '../../models/issue';

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

  constructor(
    private auth: AuthProvider,
	  public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
    public issuesProvider: IssuesProvider
  ) {
    this.idIssue = "5a9d2b0402a4c00014176b9d";
    //this.idIssue = navParams.get('id');

  }
  

  getIssue(){
    this.issuesProvider.getIssue(this.idIssue).subscribe(issue => {
      this.issue = issue;
      console.log(this.issue);
    }, err => {
      console.warn('Could not get issue' , err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssuePage');
    this.getIssue();
  }
  
   logOut() {
    this.auth.logOut();
  }
  
  goToCreateComment(){
  this.navCtrl.push(CreateCommentPage);
  }

}
