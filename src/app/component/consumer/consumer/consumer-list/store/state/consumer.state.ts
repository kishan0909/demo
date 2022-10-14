import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { ProductService } from "src/app/service/product.service";
import { DeleteProduct, GetProduct } from "../action/consumer.action";
import { Products } from "../model/consumer.model";


export class ProductStateModel {
    products : Products[] | any;
    productLoaded:boolean | any;
}

@State<ProductStateModel>({
    name:'products',
    defaults:{
        products : [],
        productLoaded:false 
    }
})

@Injectable()
export class ProductState{

    constructor(private productService:ProductService){}
    // logic of geting data
    @Selector()
    static getProductList(state:ProductStateModel){
        return state.products
    }

    //check data is loaded or not 
    @Selector()
    static getProductLoaded(state:ProductStateModel){
        return state.productLoaded;
    }

    // get-action that use from action.ts file
    // main work of this action is whenever action is dispatch then the method of this action is called and return some data  

    @Action(GetProduct)
    getProducts({getState,setState}:StateContext<ProductStateModel>){
        console.log('action performed')
        return this.productService.getUsersFromDatabase().pipe(tap(res=>{
            console.log('response',res)
            // getState = currently we have only black array
            const gState = getState(); 

            // we need to set the value in SetState 
            setState({
                ...gState,
                products:res,
                productLoaded:true
            })
        }))
    }

    // not workin proper
    @Action(DeleteProduct)
    deleteProduct({getState,setState}:StateContext<ProductStateModel>,{id}:DeleteProduct){
        return this.productService.deteleFromDatabase(id).pipe(tap(res=>{
            console.log(res)
            const state = getState();
            const filterIndex = state.products.filter((pdt:any) =>{ pdt.idKey !== id});
            setState({
                ...state,
                products:filterIndex
            })
        }))
    }
}