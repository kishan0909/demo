import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsumerAddComponent } from './consumer-add/consumer-add.component';
import { ConsumerListComponent } from './consumer-list/consumer-list.component';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.css']
})
export class ConsumerComponent implements OnInit {
  @ViewChild(ConsumerAddComponent) consumAdd:any=ConsumerAddComponent;
  @ViewChild(ConsumerListComponent)consumList:any=ConsumerListComponent;
  constructor() { }

  ngOnInit(): void {
    console.log(this.consumAdd.isNewAdd)
  }

}
