import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';
import { FiltersPage } from '../filters/filters';
import { CreateIssuePage } from '../create-issue/create-issue';
import { IssuePage } from '../issue/issue';
import { IssuesProvider } from '../../providers/issues/issues';

import { Geolocation } from '@ionic-native/geolocation';
import { latLng, MapOptions, marker, Marker, tileLayer } from 'leaflet';

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

 constructor(
    private auth: AuthProvider,
	public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
	private geolocation: Geolocation,
	private issuesProvider: IssuesProvider,
	 private zone: NgZone
  ) {
	const tileLayerUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileLayerOptions = { maxZoom: 18 };
    this.mapOptions = {
      layers: [
        tileLayer(tileLayerUrl, tileLayerOptions)
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };
	this.mapMarkers=[];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssueMapPage');
	  
	const geolocationPromise = this.geolocation.getCurrentPosition();
    geolocationPromise.then(position => {
      const coords = position.coords;
      console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    });
	  this.getIssues();
  }
  
   logOut() {
    this.auth.logOut();
  }
  
  goToFilters() {
    this.navCtrl.push(FiltersPage);
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
	
  getIssues(){
    this.issuesProvider.getIssues().subscribe(issues => {
      issues.map(i => {
        let m = marker([i.location.coordinates[1], i.location.coordinates[0]]).on('click',() => {
			this.zone.run(() => {
				
				this.goToIssuePage(i.id)
			});
		});
		this.mapMarkers.push(m);
      });
	//issues.map(issue => console.log(issue));
    }, err => {
      console.warn('Could not get issues', err);
    });
  }
}

