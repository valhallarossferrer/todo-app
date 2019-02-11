import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
  }

  delete() {
    this.popoverCtrl.dismiss({ isDelete: true });
  }

}
