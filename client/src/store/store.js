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
    this.productsNameList = []

    makeObservable(this, {
      productName: observable,
      storeName: observable,
      storeLocation: observable,
      price: observable,
      score: observable,
      note: observable,
      storesLocationList: observable,
      storesNameList: observable,
      productsNameList: observable,
      handelInputs: action,
      handelScore: action,
      handelAddClick: action,
      updateProductsNameList: action,
      updateStoresLocationList: action,
      updateStoresNameList: action

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
      //image
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  getProductsNameList = () => {
    axios.get(`http://localhost:3020/productsNameList?storeNameFilter=${this.storeName}&storeLocationFilter=${this.storeLocation}`)
      .then((response) => this.updateProductsNameList(response.data))
      .catch((error) => alert(error))
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