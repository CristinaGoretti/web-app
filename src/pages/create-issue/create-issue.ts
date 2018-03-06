import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';

/**
 * Generated class for the CreateIssuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-issue',
  templateUrl: 'create-issue.html',
})

export class CreateIssuePage {

  constructor(
    private auth: AuthProvider,
	public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }
  
  ionViewDidLoad() {
  	const url = `${config.apiUrl}/issueTypes`;
    this.http.get(url).subscribe(issueTypes => {
      console.log(`Issue types loaded`, issueTypes);
    });
  }
  
  logOut() {
    this.auth.logOut();
  }

}
