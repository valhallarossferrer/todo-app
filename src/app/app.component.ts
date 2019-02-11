import { Component } from '@angular/core';

import { Platform, Events, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [];

  public logInPages = [
    {
      title: 'Collection',
      url: '/collection',
      icon: 'basketball'
    }
  ];

  public logOutPages = [
    {
      title: 'Login',
      url: '/login',
      icon: 'basketball'
    },
  ];

  currentUser: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private events: Events,
    private fireAuth: AngularFireAuth,
    private navCtrl: NavController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkIfLogin();
      this.listenLogin();
    });
  }

  morePages() {
    this.appPages = this.logInPages;
  }

  listenLogin() {
    this.events.subscribe('login: success', () => {
      if (this.appPages.length < 2) {
        this.morePages();
      }
      this.navCtrl.navigateRoot('/collection');
    });
  }

  checkIfLogin() {
    this.currentUser = this.fireAuth.auth.currentUser;
    console.log('currentUser', this.fireAuth.auth.currentUser);

    if (this.currentUser) {
      this.navCtrl.navigateRoot('/collection');
      this.appPages = this.logInPages;
    } else {
      this.navCtrl.navigateRoot('/login');
      this.appPages = this.logOutPages;
    }
  }

  logout() {
    this.fireAuth.auth.signOut().then(data => {
      this.navCtrl.navigateRoot('/login');
      this.appPages = this.logOutPages;
    });
  }
}
