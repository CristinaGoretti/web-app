import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';
import { IssuePage } from '../issue/issue';
import { IssuesProvider} from '../../providers/issues/issues';
import { Issue } from '../../models/issue';
import { FiltersPage } from '../filters/filters';

/**
 * Generated class for the IssueListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-issue-list',
  templateUrl: 'issue-list.html',
})
export class IssueListPage {

  issues: Issue[];

  constructor(
    private auth: AuthProvider,
    public issueProvider: IssuesProvider,
	  public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    this.getIssues();
    console.log('ionViewDidLoad IssueListPage');
  }

  getIssues(){
    this.issueProvider.getIssues().subscribe(issues => {
      console.log(issues);
      this.issues = issues;
    }, err => {
      console.warn('Could not get issues', err);
    });
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

  goToFilters() {
    this.navCtrl.push(FiltersPage);
  }
}
