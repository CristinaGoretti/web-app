import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';
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
	  this.getIssues();
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
	issues.map(issue => console.log(issue));
    }, err => {
      console.warn('Could not get issues', err);
    });
  }
}

