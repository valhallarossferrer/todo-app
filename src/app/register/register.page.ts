import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form = {
    email: '',
    password: ''
  };

  constructor(
    private fireAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  submit() {
    console.log('submit pressed');
    this.fireAuth.auth.createUserWithEmailAndPassword(this.form.email, this.form.password)
      .then(() => {
        this.presentToast('Successful');
        this.navCtrl.navigateBack('/login');
      })
      .catch((error) => {
        // Handle Errors here.
        console.log('error', error);
        this.presentToast('Unsuccessful');
        // ...
      });
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
