import { action, makeObservable, observable } from 'mobx'
import axios from 'axios'

export class Store {
  constructor() {
    this.productName = '';
    this.storeName = '';
    this.storeLocation = '';
    this.price = 0;
    this.score = 50;
    this.note = '';
    this.storesNameList = [];
    this.storesLocationList = [];
    this.productsNameList = [] ;
    this.addPostStatus = false ;
    this.clickOnAddPost = false ;

    makeObservable(this, {
      productName: observable,
      storeName: observable,
      storeLocation: observable,
      price: observable,
      score: observable,
      note: observable,
      addPostStatus : observable ,
      storesLocationList: observable,
      storesNameList: observable,
      productsNameList: observable,
      handelInputs: action,
      handelScore: action,
      handelAddClick: action,
      updateProductsNameList: action,
      updateStoresLocationList: action,
      updateStoresNameList: action ,
      updateAddPostStatus : action

    })
  }

  handelInputs = (event) => {

    switch (event.target.name) {
      case 'storeName':
        this[event.target.name] = event.target.value
        this.getProductsNameList()
        this.getStoresLocationList()
        break;

      case 'storeLocation':
        this[event.target.name] = event.target.value
        this.getStoresNameList()
        this.getProductsNameList()
        break;

      case 'productName':
        this[event.target.name] = event.target.value
        this.getStoresNameList()
        this.getStoresLocationList()
        break;

      default:
        this[event.target.name] = event.target.value
        break;

    }

  }

  handelScore = (value) => {
    this.score = value / 20
  }

  handelAddClick = () => {

    axios.post('http://localhost:3020/productStorePost', {
      "productName": this.productName,
      "storeName": this.storeName,
      "storeLocation": this.storeLocation,
      "score": parseInt(this.score),
      "price": parseInt(this.price),
      "note": this.note
    })
      .then((response) =>  this.updateAddPostStatus(true))
      .catch((error) => this.updateAddPostStatus(false))
  }

  updateAddPostStatus (value){
       this.addPostStatus = value
       this.clickOnAddPost = true
  }

  getProductsNameList = () => {
    axios.get(`http://localhost:3020/productsNameList?storeNameFilter=${this.storeName}&storeLocationFilter=${this.storeLocation}`)
      .then((response) => this.updateProductsNameList(response.data))
      .catch((error) => alert(error))
  }
  handleImageChange = (e) => {
    var settings = {
      "url": "https://api.imgbb.com/1/upload?key=8d5867a9512390fb5e5dc97839aa36f6",
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false,
      "data": form
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      var jx = JSON.parse(response);
      console.log(jx.data.url);
    })
    axios.post(`https://api.imgbb.com/1/upload?key=7257e4d65326de019d7f13b2ca0550fd&name=+${e.target.value}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error))
  }
  updateProductsNameList(newProductsNameList) {
    this.productsNameList = newProductsNameList
  }

  getStoresLocationList = () => {
    axios.get(`http://localhost:3020/storesLocationList?storeNameFilter=${this.storeName}&productNameFilter=${this.productName}`)
      .then((response) => this.updateStoresLocationList(response.data))
      .catch((error) => alert(error))
  }

  updateStoresLocationList(newStoresLocationList) {
    this.storesLocationList = newStoresLocationList
  }

  getStoresNameList = () => {
    axios.get(`http://localhost:3020/storesNameList?storeLocationFilter=${this.storeLocation}&productNameFilter=${this.productName}`)
      .then((response) => this.updateStoresNameList(response.data))
      .catch((error) => alert(error))
  }

  updateStoresNameList(newStoresNameList) {
    this.storesNameList = newStoresNameList
  }

}