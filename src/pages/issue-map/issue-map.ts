import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpClient } from '@angular/common/http';
import { CreateIssuePage } from '../create-issue/create-issue';
import { IssuePage } from '../issue/issue';
import { IssuesProvider } from '../../providers/issues/issues';
import { Geolocation } from '@ionic-native/geolocation';
import {latLng, MapOptions, marker, Marker, tileLayer } from 'leaflet';

/**
 * Generated class for the IssueMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-issue-map',
  templateUrl: 'issue-map.html',
})
export class IssueMapPage {
 mapOptions: MapOptions;
 mapMarkers: Marker[];
 issuesAll = [];

 constructor(
    private auth: AuthProvider,
	public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
	private geolocation: Geolocation,
	private issuesProvider: IssuesProvider,
	private zone: NgZone,
  ) {
	const tileLayerUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileLayerOptions = { maxZoom: 18 };
		
	const geolocationPromise = this.geolocation.getCurrentPosition();  
	geolocationPromise.then(position => {
	  this.mapOptions = {
      layers: [
        tileLayer(tileLayerUrl, tileLayerOptions)
      ],
      zoom: 15,
      center: latLng(position.coords.latitude,position.coords.longitude)
    };
	}).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    });
	this.mapMarkers=[];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssueMapPage');
	  this.getIssues(1);
  }
  
   logOut() {
    this.auth.logOut();
  }
  
  goToCreateIssue(){
    this.navCtrl.push(CreateIssuePage);
  }
	
  goToIssuePage(i){
	  console.log(i);
	 this.navCtrl.push(IssuePage, {
		id: i
	});
  }

 //get all the issues from the API
  getIssues(pageNumber){
	this.issuesProvider.getIssues(pageNumber).subscribe(issues => {
		issues.map(issue => {
			// add the issues to the array "issuesAll"
			this.issuesAll.push(issue);
		});
		//if the issues.length by page is egal 50, the function recall itself
		//else all issues have been added to the array issuesAll, so let's display them
		if(issues.length===50){
			this.getIssues(pageNumber+1);
		} else {
			this.displayIssues();
		}
	});
  }

//display the issues on the map
 displayIssues(){
	 console.log(this.issuesAll);
	 this.issuesAll.map(i => {
				let m = marker([i.location.coordinates[1], i.location.coordinates[0]]).on('click',() => {
					this.zone.run(() => {
						this.goToIssuePage(i.id)
					});
				});
				this.mapMarkers.push(m);
			}, err => {
				console.warn('Could not get issues', err);
			}); 
 }
}



