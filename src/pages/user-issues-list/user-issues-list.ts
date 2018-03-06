import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';
import { IssuePage } from '../issue/issue';

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

 constructor(
    private auth: AuthProvider,
	public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserIssuesListPage');
  }
  
   logOut() {
    this.auth.logOut();
  }
  
  goToIssue(){
  	this.navCtrl.push(IssuePage);
  }

}
