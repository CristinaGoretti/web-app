import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CreateIssuePage } from '../pages/create-issue/create-issue';
import { IssueListPage } from '../pages/issue-list/issue-list';
import { IssueMapPage } from '../pages/issue-map/issue-map';
import { UserIssuesListPage } from '../pages/user-issues-list/user-issues-list';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { FiltersPage } from '../pages/filters/filters';
import { SignInPage } from '../pages/sign-in/sign-in';
import { IssuePage } from '../pages/issue/issue';
import { CreateCommentPage } from '../pages/create-comment/create-comment';




import { AuthProvider } from '../providers/auth/auth';
import { LoginPage } from '../pages/login/login';
import { IonicStorageModule } from '@ionic/storage';
import { AuthInterceptorProvider } from '../providers/auth-interceptor/auth-interceptor';
import { Geolocation } from '@ionic-native/geolocation';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { IssuesProvider } from '../providers/issues/issues';
import { UserProvider } from '../providers/user/user';
import { PictureProvider } from '../providers/picture/picture';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreateIssuePage, 
    IssueListPage,
    IssueMapPage,
	LoginPage,
	UserIssuesListPage,
	UserProfilePage,
	FiltersPage,
	SignInPage,
	IssuePage,
	CreateCommentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
	HttpClientModule,
	IonicStorageModule.forRoot(),
	LeafletModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreateIssuePage, 
    IssueListPage,
    IssueMapPage,
	LoginPage,
	UserIssuesListPage,
	UserProfilePage,
	FiltersPage,
	SignInPage,
	IssuePage,
	CreateCommentPage
  ],
  
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AuthInterceptorProvider,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorProvider, multi: true },
	  Geolocation,
    AuthProvider,
    IssuesProvider,
    UserProvider,
    PictureProvider
  ]
})

export class AppModule {}
