import { action, makeObservable, observable } from 'mobx'

export class Store {
    constructor() {
        this.itemName = '';
        this.storeName = '';
        this.cityName = '';
        this.price = 0 ; 
        this.score = 0 ; 
        this.note = '' ;

        makeObservable(this, {
            itemName: observable ,
            storeName: observable ,
            cityName : observable ,
            price : observable ,
            score : observable , 
            note : observable ,
            handelInputs : action ,
            handelAddClick : action
        })
    }

    handelInputs = (event) => {

        typeof(event) === 'number' ?
        this.score = parseInt(event) / 20 :
        this[event.target.name] = event.target.value

    }
    

    handelAddClick = () => {
        /* handel add post here */
    }
}