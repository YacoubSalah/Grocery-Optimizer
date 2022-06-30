import { observable , makeAutoObservable } from 'mobx'

export class Store {
    constructor() {
        this.itemName = '';
        this.storeName = '';
        this.cityName = '';
        this.price = 0 ; 
        this.score = 0 ; 
        this.note = '' ;

        makeAutoObservable(this, {
            itemName: observable,
            storeName: observable,
            cityName : observable,
            price : observable,
            score : observable , 
            note : observable
        })
    }
}