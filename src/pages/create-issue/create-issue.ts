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
import { Geolocation } from '@ionic-native/geolocation';
import { User } from '../../models/user';
import { IssueListPage } from '../issue-list/issue-list';

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
  public profil: User;

  @ViewChild(NgForm)
  form: NgForm;  

  constructor(
    private auth: AuthProvider,
	  public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
    public issuesProvider: IssuesProvider,
    public geolocation: Geolocation
  ) {

    //initialisation des données de base d'une issue
    this.issueRequest = new IssueRequest();
    this.issueRequest.location = {
      "coordinates": [
        2.3,
        2.3
      ],
      "type": "Point"
    };
    //Ici il faudrait faire en sorte de l'upload enfaite dans le form
    this.issueRequest.imageUrl = "http://example.com/image.png";

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

    //gestion user
    this.getUser();

    //gestion tags
    const tags: string = this.form.controls.tags.value;
		const tabTags: string[] = tags.split(',').map(tag => {
			return tag.trim();
		});
		this.issueRequest.tags = tabTags;

    //gestion localisation
    const geolocationPromise = this.geolocation.getCurrentPosition();
    geolocationPromise.then(position => {
      const coords = position.coords;
      
      console.log(this.issueRequest);
      this.issueRequest.location.coordinates[0] = coords.latitude;
      this.issueRequest.location.coordinates[1] = coords.longitude;

    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    });


    //gestion author
    this.issueRequest.creatorHref = "/api/users/" + this.profil.id;

    // Hide any previous login error.
    //this.loginError = false;
    console.log('---');
    console.log(this.issueRequest.location.coordinates);
    console.log('---');
    this.createIssue();
    this.goToIssueListPage();
  }

  createIssue(){
    this.issuesProvider.postIssue(this.issueRequest).subscribe(issue => {
      this.issueMessage = "Issue bien ajoutée";
    });
  }
  /*createComment(){
    this.issuesProvider.postCommentsIssue(this.commentRequest, this.idIssue).subscribe(comment => {
      this.commentMessage = "Commentaire bien ajouté";
      console.log(comment);
    });
  }*/

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
    this.getUser();

  }
  getUser(){
    this.auth.getUser().subscribe(user => {
      this.profil = user;
      console.log(this.profil);
    }, err => {
      console.warn('Could not get user authentificated', err);
    });
  }
  
  goToIssueListPage(){
    this.navCtrl.push(IssueListPage);
  }

  logOut() {
    this.auth.logOut();
  }


}
