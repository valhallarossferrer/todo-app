import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudService } from '../provider/crud.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public todoList: any = [];

  constructor(private alertController: AlertController, private firestore: AngularFirestore, private crud: CrudService) {
    this.todoList.map(todo => {
      todo['icon'] = this.icons[Math.floor(Math.random() * this.icons.length)];
    });
    this.getTodoList();
  }

  async getTodoList() {
    this.todoList = await this.crud.getTodoList();
    console.log('list here', this.todoList);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'New Item',
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
            this.crud.createTodo({
              title: data.title,
              isChecked: false,
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
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
