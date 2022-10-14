import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';
import { DeleteProduct, GetProduct } from './store/action/consumer.action';
import { ProductState } from './store/state/consumer.state';

@Component({
  selector: 'app-consumer-list',
  templateUrl: './consumer-list.component.html',
  styleUrls: ['./consumer-list.component.css']
})
export class ConsumerListComponent implements OnInit,OnDestroy {
  @ViewChild('editUsers')editUsers:any=ConsumerListComponent;
  keyStore:any;
  // @Select()
  product: Product[] = [];
  produsctSubScrip:any=Subscription;
  @Select(ProductState.getProductList)products$!: Observable<Product>;
  @Select(ProductState.getProductLoaded)productLoad$!: Observable<Product>;
  constructor(private prdService:ProductService,
    private store:Store,
    private http:HttpClient) { }
  consumers:any;
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this.produsctSubScrip = this.productLoad$.subscribe((productsLoad)=>{
      if(!productsLoad){
        this.store.dispatch(new GetProduct());
      }
    })
    this.products$.subscribe((res=>{
      console.log("value in compnent",res)
      this.consumers = res;
    }))
  }

  editConsumerDetails(consumer:any,index:any){
    console.log(consumer)
    this.keyStore = consumer.idKey;
    console.log(this.keyStore) 
    document.getElementById('EditDetails')?.classList.toggle('d-none');
    this.editUsers.form.setValue({
      name:consumer.name,
      shop:consumer.shop,
      contact:consumer.contact
    });
  }

  closeEditPopUp(){
    document.getElementById('EditDetails')?.classList.toggle('d-none');
  }

  delteConsumerDetails(index:any){
    if(confirm("Are you sure you want to delte this record")){
      this.store.dispatch(new DeleteProduct(index))
    }
  }

  saveData(editUsers:NgForm){
    this.http.put('https://shopmanage-107c5-default-rtdb.firebaseio.com/shopDb/'+this.keyStore+'/.json',editUsers).subscribe((res)=>{
      console.log(res);
      this.fetchData()
    },(err)=>{
      console.log(err);
    });
    this.editUsers.form.reset();
    document.getElementById('EditDetails')?.classList.toggle('d-none');
  }

  ngOnDestroy(): void {
    this.produsctSubScrip.unsubscribe();
  }
}
