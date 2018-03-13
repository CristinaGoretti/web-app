import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';
import { CommentRequest } from '../../models/comment-request';
import { NgForm } from '@angular/forms';

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

  commentRequest: CommentRequest;

  @ViewChild(NgForm)
  form: NgForm;

 constructor(
    private auth: AuthProvider,
	  public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.commentRequest = new CommentRequest();
  }

  onSubmit($event) {

    // Prevent default HTML form behavior.
    $event.preventDefault();

    // Do not do anything if the form is invalid.
    if (this.form.invalid) {
      return;
    }

    // Hide any previous login error.
    //this.loginError = false;

    this.createComment();
}
  createComment(){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCommentPage');
  }
  
   logOut() {
    this.auth.logOut();
  }

}
