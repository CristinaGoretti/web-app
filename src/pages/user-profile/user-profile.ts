import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user'; 

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  text: string;
  users: User[];
  profil: User;

  constructor(public auth: AuthProvider, public userProvider: UserProvider, public navCtrl: NavController, public navParams: NavParams) {
  
  }
  
  getUsers(){
    this.userProvider.getUsers().subscribe(users => {
      console.log(users);
      this.users = users;
    }, err => {
      console.warn('Could not get users', err);
    });
  }

  getUser(){
    this.auth.getUser().subscribe(user => {
      this.profil = user;
      console.log(this.profil);
    }, err => {
      console.warn('Could not get user', err);
    });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
    //this.getUsers();
    this.getUser();

  }
}
