import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';
import { NgForm } from '@angular/forms';
import { IssuesProvider } from '../../providers/issues/issues';
import { IssueRequest } from '../../models/issue-request';
import { IssueType } from '../../models/issueType';

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

  public issueMessage: string;
  issueRequest: IssueRequest;
  public issueTypes: IssueType[];

  @ViewChild(NgForm)
  form: NgForm;  

  constructor(
    private auth: AuthProvider,
	  public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
    public issuesProvider: IssuesProvider
  ) {

    this.issueRequest = new IssueRequest;
  }

  onChange() {
		console.log('@@@', this.issueRequest);
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

    this.createIssue();

  }

  createIssue(){
    this.issuesProvider.postIssue(this.issueRequest).subscribe(issue => {
      this.issueMessage = "Issue bien ajoutée";
    });
  }

  getIssueTypes(){
    this.issuesProvider.getIssueTypes().subscribe(issueTypes => {
      this.issueTypes = issueTypes;
      console.log(this.issueTypes);
    });
  }
  
  ionViewDidLoad() {
  	const url = `${config.apiUrl}/issueTypes`;
    //this.http.get(url).subscribe(issueTypes => {
      //console.log(`Issue types loaded`, issueTypes);
    //});
    this.getIssueTypes();

  }
  
  logOut() {
    this.auth.logOut();
  }


}
