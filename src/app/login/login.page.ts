import { Component, OnInit } from '@angular/core';
import { NavController, Events } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form = {
    email: '',
    password: ''
  };

  constructor(
    private navCtrl: NavController,
    private fireAuth: AngularFireAuth,
    private events: Events
  ) { }

  login() {
    this.fireAuth.auth.signInWithEmailAndPassword(this.form.email, this.form.password)
      .then((data) => {
        console.log('success', data);
        this.events.publish('login: success');
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  ngOnInit() {
  }

  loginWithFacebook() {
    console.log('pressed fb');
  }

  loginWithGoogle() {
    console.log('pressed fb');
  }

  register() {
    console.log('pressed fb');
    this.navCtrl.navigateForward('/register');
  }

}
