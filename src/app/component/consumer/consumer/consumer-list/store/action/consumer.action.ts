export class GetProduct {
    static readonly type ='[Product] Get';
}

export class EditProduct {
    static readonly type ='[Product] Edit';
    constructor(public payload: any){}
}

export class DeleteProduct {
    static readonly type ='[Product] Delete';
    constructor(public id: string){}
}