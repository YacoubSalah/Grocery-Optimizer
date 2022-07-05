import { action, makeObservable, observable } from 'mobx'
import axios from 'axios'


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
    

        axios.post('http://localhost:3020/post' , {
            "productName": this.itemName,
            "storeName": this.storeName,
            "storeLocation": this.cityName, 
            "score" :  parseInt(this.score),
            "price" : parseInt(this.price),
            "note" : this.note
        })
        .then(function (response) {
          // handle success
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }
}