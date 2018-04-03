import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { IssuesProvider } from '../../providers/issues/issues';
import { IssueRequest } from '../../models/issue-request';
import { IssueType } from '../../models/issueType';
import { Geolocation } from '@ionic-native/geolocation';
import { User } from '../../models/user';
import { IssueListPage } from '../issue-list/issue-list';
import { PictureProvider } from '../../providers/picture/picture';

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
  issueMessage: string;
  issueRequest: IssueRequest;
  issueTypes: IssueType[];
  profil: User;
  pictureData: string;
  coords: Coordinates;
  checkSubmit: boolean;

  @ViewChild(NgForm)
  form: NgForm;  

  constructor(
    private auth: AuthProvider,
	public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
    public issuesProvider: IssuesProvider,
    public geolocation: Geolocation,
    private camera: PictureProvider
  ) {
		//gestion localisation
        const geolocationPromise = this.geolocation.getCurrentPosition();
        geolocationPromise.then(position => {
        this.coords = position.coords; 
        this.issueRequest.location.coordinates[0] = this.coords.longitude;
        this.issueRequest.location.coordinates[1] = this.coords.latitude;
        }).catch(err => {
          console.warn(`Could not retrieve user position because: ${err.message}`);
        });
		
    //initialisation des données de base d'une issue
    this.issueRequest = new IssueRequest();
    this.issueRequest.location = {
      "coordinates": [0,0],
      "type": "Point"
    };
  }
	
//prendre une photo	
takePicture() {
    this.camera.takeAndUploadPicture().subscribe(pictureData => {
      this.pictureData = pictureData.url;
    }, err => {
      console.warn('Could not take picture', err);
    });
  }
	
  onChange() {
		console.log('@@@', this.issueRequest);
	}
  onSubmit($event) {

    // Prevent default HTML form behavior.
    $event.preventDefault();

    // Do not do anything if the form is invalid.
    if (this.form.invalid) {
	  this.checkSubmit = false;
    }

    //gestion user
    this.getUser();

    //gestion tags
    if(this.form.controls.tags.value != undefined){
      const tags: string = this.form.controls.tags.value;
      const tabTags: string[] = tags.split(',').map(tag => {
        return tag.trim();
      });
      this.issueRequest.tags = tabTags;      
    }

    this.issueRequest.location.coordinates[0] = this.coords.longitude;
    this.issueRequest.location.coordinates[1] = this.coords.latitude;



    //gestion author
    this.issueRequest.creatorHref = "/api/users/" + this.profil.id;
    this.createIssue();
    this.goToIssueListPage();
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
