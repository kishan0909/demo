import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConsumerComponent } from './consumer.component';
import { ProductComponent } from './product/product.component';
import { ProductChangeComponent } from './product-change/product-change.component';
import { ConsumerListComponent } from './consumer-list/consumer-list.component';
import { ConsumerAddComponent } from './consumer-add/consumer-add.component';
import { FormsModule } from '@angular/forms';

const routes:Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        component:ConsumerComponent
      },
      {
        path:'consumer',
        component:ConsumerListComponent
      },
      {
        path:'newConsumer',
        component:ConsumerAddComponent
      },
      {
        path:'product',
        component:ProductComponent
      },
      {
        path:'product-edit',
        component:ProductChangeComponent
      }
    ]
  }
];
@NgModule({
  declarations: [
    ConsumerComponent,
    ProductComponent,
    ProductChangeComponent,
    ConsumerListComponent,
    ConsumerAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ConsumerModule { }
