import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';
import { IssuePage } from '../issue/issue';

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

  constructor(
    private auth: AuthProvider,
	public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssueListPage');
  }
  
   logOut() {
    this.auth.logOut();
  }
  
  goToIssue(){
  	this.navCtrl.push(IssuePage);
	
  }
}
