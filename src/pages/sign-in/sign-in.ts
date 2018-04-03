import { Component, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';


import {AuthRequest} from '../../models/auth-request';
import {AuthProvider} from '../../providers/auth/auth';

import {UserRequest} from "../../models/user-request";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  authRequest: AuthRequest;
  userRequest: UserRequest;

  loginError: boolean;

 /**
   * The login form.
   */
  @ViewChild(NgForm)
  form: NgForm;

  constructor(
      private auth: AuthProvider,
      public userProvider : UserProvider
  ) {
    this.authRequest = new AuthRequest();
    this.userRequest = new UserRequest();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSubmit($event) {
    this.userRequest.roles = ['citizen'];
    // Prevent default HTML form behavior.
    $event.preventDefault();

    // Do not do anything if the form is invalid.
    if (this.form.invalid) {
      return;
    }

    // Hide any previous login error.
    this.loginError = false;

    this.authRequest = {name:this.userRequest.name, password:this.userRequest.password};

    this.postUser();

  }
  postUser(){
    this.userProvider.postUser(this.userRequest).subscribe(user => {
      console.log(user);
      
      this.auth.logIn(this.authRequest).subscribe(user => {
        console.log(user);
      }, err => {
        console.log(err);
  
      });
    }, err => {
      console.log(this.authRequest);
      console.warn('Could not create the user: ${err.message}');
    });
  }

}