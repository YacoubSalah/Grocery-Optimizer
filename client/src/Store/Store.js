import { action, makeObservable, observable } from 'mobx'
import axios from 'axios'


export class Store {
    constructor() {
        this.productName = '';
        this.storeName = '';
        this.storeLocation = '';
        this.price = 0 ; 
        this.score = 0 ; 
        this.note = '' ;
        this.storesNamesList = [] ;
        this.storesLocationList = [] ;
        this.productsNameList = []

        makeObservable(this, {
            productName: observable ,
            storeName: observable ,
            storeLocation : observable ,
            price : observable ,
            score : observable , 
            note : observable ,
            storesLocationList : observable ,
            storesNamesList : observable ,
            productsNameList : observable ,
            handelInputs : action ,
            handelAddClick : action ,
            getStorelist : action ,
            getStoresLocationList : action , 
            getproductsNameList : action
        })
    }

    handelInputs = (event) => {

        typeof(event) === 'number' ?
        this.score = parseInt(event) / 20 :
        this[event.target.name] = event.target.value
    }

    handelAddClick = () => {
        axios.post('http://localhost:3020/post' , {
            "productName": this.productName,
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

    getStorelist = () => {

        let classScope = this
          
        axios.get('http://localhost:3020/storesNamesList' , {

            "storeLocationFilter": null,
            "productNamefilter": null,

        })
        .then(function (response) {
    
          classScope.storesNamesList = [...response.data] 
          classScope.storeName = response.data[0]
    
        })
        .catch(function (error) {
          alert(error);
        })

    }

    getStoresLocationList = () => {

        let classScope = this

        axios.get('http://localhost:3020/storesLocationsList' , {

            "storeNameFilter": null,
            "productNamefilter": null,

        })
        .then(function (response) {
            
            classScope.storesLocationList = [...response.data]
            classScope.storeLocation = response.data[0]
        })
        .catch(function (error) {
          alert(error);
        })
    }

    getproductsNameList = () => {

        let classScope = this

        axios.get('http://localhost:3020/productsNameslist' , {

            "storeNameFilter": null,
            "storeLocationFilter": null,

        })
        .then(function (response) {

            classScope.productsNameList = [...response.data]
            classScope.productName = response.data[0]
        })
        .catch(function (error) {
          alert(error);
        })

    }

}