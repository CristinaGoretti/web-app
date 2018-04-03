import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpClient } from '@angular/common/http';
import { IssuePage } from '../issue/issue';
import { Issue } from '../../models/issue';
import { UserProvider } from '../../providers/user/user';
import { CreateIssuePage } from '../create-issue/create-issue';


/**
 * Generated class for the UserIssuesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-issues-list',
  templateUrl: 'user-issues-list.html',
})
export class UserIssuesListPage {

  issues: Issue[];
  emptiness: boolean;
  public navigation: string[];
  public linkFirst: string;
  public linkPrev: string;
  public linkNext: string;
  public linkLast: string;
  public linkParse: string;

 constructor(
    private auth: AuthProvider,
	  public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider
  ) {
    this.emptiness = false;
  }

  getUserIssues(){
    this.userProvider.getUserIsssues().subscribe(issues => {
      if(issues.length == 0){
        this.emptiness = true;
      }
      this.issues = issues;
      console.log(issues);

    }, err => {
      console.warn('Could not get issues from authentificated user', err);
    });
  }

  getMoreIssues(link: string){
    console.log(link);
    this.userProvider.getMoreIssuesLink(link).subscribe(httpResponse =>{
      this.issues = httpResponse.body;
      console.log("c'est cici que tout ce passe");
      console.log(httpResponse.headers);
      this.navigation = null;
      if(httpResponse.headers.get("Link")){
        this.linkParse = httpResponse.headers.get("Link").replace(/\s+/g, '').replace(/</g, '');
        console.log(this.linkParse);
        this.navigation =  this.linkParse.split(",");
        console.log(this.navigation);
  
        this.linkFirst = null;
        this.linkPrev = null;
        this.linkNext = null;
        this.linkLast = null;
  
        this.navigation.forEach(link => {
          if(link.includes("first")){
            this.linkFirst = link.substring(0, link.indexOf(">")) + "&include=creator&include=issueType";
          }
          if(link.includes("prev")){
            this.linkPrev = link.substring(0, link.indexOf(">")) + "&include=creator&include=issueType";
          }
          if(link.includes("next")){
            this.linkNext = link.substring(0, link.indexOf(">")) + "&include=creator&include=issueType";
          }
          if(link.includes("last")){
            this.linkLast = link.substring(0, link.indexOf(">")) + "&include=creator&include=issueType";
          }
        });
      }
    }, err => {
      console.warn('Could not get more comments', err);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserIssuesListPage');
    //this.getUserIssues();
    //Ici il serait judicieux d'aller chercher directement la premiere appel a lapi via une methode mais trop la flemme
    //this.linkFirst = "https://comem-appmob-2018b.herokuapp.com/api/me/issues?page=1&pageSize=20&include=creator&include=issueType";
    //this.getMoreIssues(this.linkFirst);

    this.getUserIssues();
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

  goToCreateIssue(){
        this.navCtrl.push(CreateIssuePage);
  }


}
