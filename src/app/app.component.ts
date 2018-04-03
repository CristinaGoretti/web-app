import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

 constructor(
  private auth: AuthProvider,
  platform: Platform,
  statusBar: StatusBar,
  splashScreen: SplashScreen
  ) {

  // Direct the user to the correct page depending on whether he or she is logged in.
  this.auth.isAuthenticated().subscribe(authenticated => {
    if (authenticated) {
      this.rootPage = HomePage;
    } else {
      this.rootPage = LoginPage;
    }
  });
}
}
