import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private prosuctSubject= new BehaviorSubject<any>(0);
  constructor(private http:HttpClient) { }


  getUsersFromDatabase():Observable<any>{
    return this.http.get('https://managment-68166-default-rtdb.firebaseio.com/productDt.json').pipe(map(res=>{
      const consumerList = [];
      const temp = JSON.stringify(res);
      const NewArr = JSON.parse(temp);
      console.log(res)
      for(const key in NewArr){
        if(res.hasOwnProperty(key)){
          consumerList.push({idKey:key,...NewArr[key]})
        }
      }
      return consumerList;
    }))
  }

  deteleFromDatabase(id:any):Observable<any>{
    return this.http.delete('https://managment-68166-default-rtdb.firebaseio.com/productDt/'+id+'/.json');
  }
}
