import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';
import { IssuePage } from '../issue/issue';
import { IssuesProvider} from '../../providers/issues/issues';
import { Issue } from '../../models/issue';
import { FiltersPage } from '../filters/filters';
import { CreateIssuePage } from '../create-issue/create-issue';

import { SearchIssueRequest } from '../../models/searchIssues-request';

/**
 * Generated class for the IssueListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-issue-list',
  templateUrl: 'issue-list.html',
})
export class IssueListPage {

  searchIssueRequest: SearchIssueRequest;
  issues: Issue[];
  public navigation: string[];
  public linkFirst: string;
  public linkPrev: string;
  public linkNext: string;
  public linkLast: string;
  public linkParse: string;

  @ViewChild(NgForm)
  form: NgForm;  

  constructor(
    private auth: AuthProvider,
    public issueProvider: IssuesProvider,
	  public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.searchIssueRequest = new SearchIssueRequest();
  }


  ionViewDidLoad() {
    //Ici il serait judicieux d'aller chercher directement la premiere appel a lapi via une methode mais trop la flemme
    this.linkFirst = "https://comem-appmob-2018b.herokuapp.com/api/issues/?page=1&pageSize=20&include=creator&include=issueType";
    this.getMoreIssues(this.linkFirst);
    console.log('ionViewDidLoad IssueListPage');
  }
  getMoreIssues(link: string){
    console.log(link);
    this.issueProvider.getMoreIssuesLink(link).subscribe(httpResponse =>{
      this.issues = httpResponse.body;
      this.navigation = null;
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
    }, err => {
      console.warn('Could not get more comments', err);
    })
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

  goToFilters(issuesFiltered: Issue[]) {
    this.navCtrl.push(FiltersPage, {
      issuesFiltered: issuesFiltered
    });
  }



  onSubmit($event) {

    // Prevent default HTML form behavior.
    $event.preventDefault();

    // Do not do anything if the form is invalid.
    if (this.form.invalid) {
      return;
    }
    this.issueProvider.postSearchIssue(this.searchIssueRequest).subscribe(issue =>{
      console.log(issue);
      this.goToFilters(issue);
    });

  }
}
