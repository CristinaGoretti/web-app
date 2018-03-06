import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';
import { CreateCommentPage } from '../create-comment/create-comment';


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

  constructor(
    private auth: AuthProvider,
	public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssuePage');
  }
  
   logOut() {
    this.auth.logOut();
  }
  
  goToCreateComment(){
  this.navCtrl.push(CreateCommentPage);
  }

}
