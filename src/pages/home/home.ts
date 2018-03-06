import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CreateIssuePage } from '../create-issue/create-issue';
import { IssueMapPage } from '../issue-map/issue-map';
import { IssueListPage } from '../issue-list/issue-list';
import { UserIssuesListPage } from '../user-issues-list/user-issues-list';
import { UserProfilePage } from '../user-profile/user-profile';


export interface HomePageTab {
  title: string;
  icon: string;
  component: Function;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


tabs: HomePageTab[];
  constructor(public navCtrl: NavController) {
    // TODO: define some tabs.
    this.tabs = [
      { title: 'Issue Map', icon: 'map', component: IssueMapPage },
      { title: 'Issues List', icon: 'list', component: IssueListPage },
	  { title: 'User Issues List', icon: 'list-box', component: UserIssuesListPage },
	  { title: 'User', icon: 'person', component: UserProfilePage }
    ];
  }

}

      //{ title: 'New Issue', icon: 'add', component: CreateIssuePage },

