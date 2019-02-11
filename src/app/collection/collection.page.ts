import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, PopoverController, Events } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudService } from '../provider/crud.service';
import { Router } from '@angular/router';
import { PopoverComponent } from '../popover/popover.component';

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
    private navCtrl: NavController,
    private popoverController: PopoverController,
    private events: Events,
  ) {
    this.getCollection();
    this.events.subscribe('delete: success', () => {
      this.getCollection();
    });
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

  async presentPopover(ev: any, todolist) {

    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      showBackdrop: false
    });
    popover.onWillDismiss().then(data => {
      if (data.data.isDelete) {
        console.log('delete mo na to');
        this.crud.deleteTodoList(todolist);
      }
    });
    return await popover.present();

  }
}
