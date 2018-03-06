import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';
import { FiltersPage } from '../filters/filters';
import { CreateIssuePage } from '../create-issue/create-issue';



/**
 * Generated class for the IssueMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-issue-map',
  templateUrl: 'issue-map.html',
})
export class IssueMapPage {

 constructor(
    private auth: AuthProvider,
	public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssueMapPage');
  }
  
   logOut() {
    this.auth.logOut();
  }
  
  goToFilters() {
    this.navCtrl.push(FiltersPage);
  }
  
  goToCreateIssue(){
    this.navCtrl.push(CreateIssuePage);
  }
}
