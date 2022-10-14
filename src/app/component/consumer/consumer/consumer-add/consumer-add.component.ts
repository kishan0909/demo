import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consumer-add',
  templateUrl: './consumer-add.component.html',
  styleUrls: ['./consumer-add.component.css']
})
export class ConsumerAddComponent implements OnInit {
  isNewAdd:boolean=false;
@ViewChild('newUser')newUser:any=ConsumerAddComponent;
  constructor( private http:HttpClient) { }

  ngOnInit(): void {
  }

  newConsumer(newUser:NgForm){
    console.log(newUser)
    this.http.post('https://shopmanage-107c5-default-rtdb.firebaseio.com/shopDb.json',newUser).subscribe((res)=>{
      console.log(res);
      this.isNewAdd = true;
    },
    (err)=>{
      console.log(err)
    });
    this.newUser.form.reset();
  }

}
