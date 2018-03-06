import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';

/**
 * Generated class for the CreateCommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-comment',
  templateUrl: 'create-comment.html',
})
export class CreateCommentPage {

 constructor(
    private auth: AuthProvider,
	public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCommentPage');
  }
  
   logOut() {
    this.auth.logOut();
  }

}
