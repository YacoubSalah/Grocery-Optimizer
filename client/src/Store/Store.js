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
        this.storesNamesList = [...this.getStorelist()] ;
        this.storesLocationList = this.getStoresLocationList() ;
        this.productsNameList = this.getproductsNameList()

        makeObservable(this, {
            itemName: observable ,
            storeName: observable ,
            cityName : observable ,
            price : observable ,
            score : observable , 
            note : observable ,
            storesLocationList : observable ,
            storesNamesList : observable ,
            productsNameList : observable ,
            handelInputs : action ,
            handelAddClick : action ,
            getStorelist : action
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
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    getStorelist () {
          
        axios.get('http://localhost:3020/storesNamesList' , {

            "storeLocationFilter": null,
            "productNamefilter": null,

        })
        .then(function (response) {

          return response.data

        })
        .catch(function (error) {
          alert(error);
        })

    }

    getStoresLocationList = () => {

        axios.get('http://localhost:3020/storesLocationsList' , {

            "storeNameFilter": null,
            "productNamefilter": null,

        })
        .then(function (response) {
            console.log(response.data);
          return response.data
        })
        .catch(function (error) {
          alert(error);
        })
    }

    getproductsNameList = () => {

        axios.get('http://localhost:3020/productsNameslist' , {

            "storeNameFilter": null,
            "storeLocationFilter": null,

        })
        .then(function (response) {
            console.log(response.data);
          return response.data
        })
        .catch(function (error) {
          alert(error);
        })

    }


}