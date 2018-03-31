import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Issue } from '../../models/issue';
import { IssuePage } from '../issue/issue';

/**
 * Generated class for the FiltersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-filters',
  templateUrl: 'filters.html',
})
export class FiltersPage {

  public issues: Issue[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.issues = navParams.get('issuesFiltered');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltersPage');
    console.log(this.issues)
  }

  goToIssue(id){
    console.log(id);
  	this.navCtrl.push(IssuePage, {
      id: id
    });
  }
}
