import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
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

  constructor(
    public auth: AuthProvider, 
    public userProvider: UserProvider, 
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  
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
      console.warn('Could not get user authentificated', err);
    });
  }

  getUserAuth(){
    this.auth.getUserAuth().subscribe(user => {
      console.log(user);
    }, err => {
      console.warn('Could not get user authentificated');
    });
  }

 logOut() {
    this.auth.logOut();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
    //this.getUsers();
    this.getUser();
    this.getUserAuth();

  }
}
