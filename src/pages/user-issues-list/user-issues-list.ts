import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';
import { IssuePage } from '../issue/issue';
import { Issue } from '../../models/issue';
import { UserProvider } from '../../providers/user/user';
import { CreateIssuePage } from '../create-issue/create-issue';


/**
 * Generated class for the UserIssuesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-issues-list',
  templateUrl: 'user-issues-list.html',
})
export class UserIssuesListPage {

  issues: Issue[];

 constructor(
    private auth: AuthProvider,
	  public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider
  ) {
  }

  getUserIssues(){
    this.userProvider.getUserIsssues().subscribe(issues => {
      this.issues = issues;
      console.log(issues);
    }, err => {
      console.warn('Could not get issues from authentificated user', err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserIssuesListPage');
    this.getUserIssues();
  }
  
   logOut() {
    this.auth.logOut();
  }
  
  goToIssue(id){
    console.log(id);
  	this.navCtrl.push(IssuePage, {
      id: id
    });
  }

  goToCreateIssue(){
        this.navCtrl.push(CreateIssuePage);
  }


}
