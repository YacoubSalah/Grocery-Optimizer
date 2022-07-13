import { action, makeObservable, observable } from 'mobx'
import axios from 'axios'

import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { async } from '@firebase/util';

export class Store {
  constructor() {
    this.productName = '';
    this.storeName = '';
    this.storeLocation = '';
    this.price = 0;
    this.score = 50;
    this.note = '';
    this.imageUrl = '';
    this.image = null;
    this.storesNameList = [];
    this.storesLocationList = [];
    this.productsNameList = [];
    this.addPostStatus = false;
    this.clickOnAddPost = false;

    makeObservable(this, {
      productName: observable,
      storeName: observable,
      storeLocation: observable,
      price: observable,
      score: observable,
      note: observable,
      imageUrl: observable,
      image: observable,
      addPostStatus: observable,
      storesLocationList: observable,
      storesNameList: observable,
      productsNameList: observable,
      handelInputs: action,
      handelScore: action,
      handelAddClick: action,
      updateProductsNameList: action,
      updateStoresLocationList: action,
      updateStoresNameList: action,
      updateAddPostStatus: action,
      handleImageChange: action,
      handleSubmit: action

    })
  }


  handleImageChange = (e) => {
    if (e.target.files[0]) {
      this.image = e.target.files[0];
      this.handleSubmit()
    }
  };
  handleSubmit = () => {
    const imageRef = ref(storage, "image");
    uploadBytes(imageRef, this.image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((newURL) => {
            this.imageUrl = newURL
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        this.image = null
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


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
      "note": this.note,
      "imageUrl":this.imageUrl
    })
      .then((response) => this.updateAddPostStatus(true))
      .catch((error) => this.updateAddPostStatus(false))
  }

  updateAddPostStatus(value) {
    this.addPostStatus = value
    this.clickOnAddPost = true
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
