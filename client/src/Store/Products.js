import { observable , makeAutoObservable } from 'mobx'

export class Products {
    constructor() {
        this.ProductsArray = [];
        makeAutoObservable(this, {
            ProductsArray : observable
        })
    } 
}