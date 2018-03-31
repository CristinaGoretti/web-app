import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';
import { CommentRequest } from '../../models/comment-request';
import { NgForm } from '@angular/forms';
import { IssuesProvider } from '../../providers/issues/issues';
import { IssuePage } from '../issue/issue';

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
  public idIssue;
  public commentMessage: string;

  commentRequest: CommentRequest;

  @ViewChild(NgForm)
  form: NgForm;

 constructor(
    private auth: AuthProvider,
	  public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
    public issuesProvider: IssuesProvider
  ) {
		console.log('@@@ created page CreateCommentPage');
    this.idIssue = navParams.get('id');
    this.commentRequest = new CommentRequest();
  }
	
	onChange() {
		console.log('@@@', this.commentRequest);
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
    this.goToIssue(this.idIssue);

  }
  createComment(){
    this.issuesProvider.postCommentsIssue(this.commentRequest, this.idIssue).subscribe(comment => {
      this.commentMessage = "Commentaire bien ajouté";
      console.log(comment);
    }, err => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCommentPage');
    this.commentRequest = new CommentRequest();
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

}
