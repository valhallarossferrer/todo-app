import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudService } from '../provider/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {
  public collection: any = [];

  constructor(
    private alertController: AlertController,
    private firestore: AngularFirestore,
    private crud: CrudService,
    private navCtrl: NavController
  ) {
    this.getCollection();
  }

  async getCollection() {
    const data = await this.crud.getCollection();
    this.collection = data;
    console.log('colletion', this.collection);
  }

  async newTodoList() {
    const alert = await this.alertController.create({
      header: 'Create New Todo List',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Title'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok');
            this.crud.createTodoList({
              title: data.title,
              isCompleted: false,
            }).then(() => {
              this.getCollection();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  navigate(item) {
    this.navCtrl.navigateForward('/list', { queryParams: { item } });
  }
}
