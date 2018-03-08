import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';
import { FiltersPage } from '../filters/filters';
import { CreateIssuePage } from '../create-issue/create-issue';

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
	private geolocation: Geolocation
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
	this.mapMarkers = [
      marker([ 46.778186, 6.641524 ]),
      marker([ 46.780796, 6.647395 ]),
      marker([ 46.784992, 6.652267 ]),
	  marker([ 46.89, 6.652267 ])
    ];
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
}
