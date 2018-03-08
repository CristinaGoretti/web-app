import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';
import { FiltersPage } from '../filters/filters';
import { CreateIssuePage } from '../create-issue/create-issue';

import { Geolocation } from '@ionic-native/geolocation';




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
    public navParams: NavParams,
	private geolocation: Geolocation
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssueMapPage');
	  
	const geolocationPromise = this.geolocation.getCurrentPosition();
    geolocationPromise.then(position => {
      const coords = position.coords;
      console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    });
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
