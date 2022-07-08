import { action, makeObservable, observable } from 'mobx'
import axios from 'axios'


export class Store {
  constructor() {
    this.productName = '';
    this.storeName = '';
    this.storeLocation = '';
    this.price = 0;
    this.score = 0;
    this.note = '';
    this.storesNamesList = [];
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
      storesNamesList: observable,
      productsNameList: observable,
      handelInputs: action,
      handelAddClick: action,
      getStorelist: action,
      getStoresLocationList: action,
      getproductsNameList: action,
      getFilteredProductsNames: action,
      getFilteredLocations: action,
      getFilteredStoresNames: action

    })
  }

  handelInputs = (event) => {
    
    if(typeof (event) !== 'number'){

      switch (event.target.name) {
        case 'storeName':
  
          this[event.target.name] = event.target.value
          this.getFilteredProductsNames()
          this.getFilteredLocations()
  
          break;
        case 'productName':
  
          this[event.target.name] = event.target.value
          this.getFilteredStoresNames()
          this.getFilteredLocations()
  
          break;
        case 'storeLocation':
  
          this[event.target.name] = event.target.value
          this.getFilteredStoresNames()
          this.getFilteredProductsNames()
  
          break;
        default:
          this[event.target.name] = event.target.value
          break;
      }

    } else {
      this.score = parseInt(event) / 20 
    }

  }

  handelAddClick = () => {

    axios.post('http://localhost:3020/productStorePost', {
      "productName": this.productName,
      "storeName": this.storeName,
      "storeLocation": this.cityName,
      "score": parseInt(this.score),
      "price": parseInt(this.price),
      "note": this.note
      //image
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  getStorelist = async () => {
    try {
      const response = await axios.get('http://localhost:3020/storesNameList', {

        "storeLocationFilter": null,
        "productNameFilter": null,

      })

      this.storesNamesList = response.data

    }
    catch (e) {
      alert(e)
    }

  }

  getStoresLocationList = async () => {

    try {
      const response = await axios.get('http://localhost:3020/storesLocationList', {

        "storeNameFilter": null,
        "productNameFilter": null,

      })

      this.storesLocationList = response.data

    }
    catch (error) {
      alert(error);
    }

  }

  getproductsNameList = async () => {

    try {

      const response = await axios.get('http://localhost:3020/productsNameList', {

        "storeNameFilter": null,
        "storeLocationFilter": null,

      })

      this.productsNameList = response.data

    }
    catch (error) {
      alert(error);
    }

  }

  getFilteredProductsNames = async () => {

    try {

      const response = await axios.get(`http://localhost:3020/productsNameList?storeNameFilter=${this.storeName}&productNameFilter=${this.storeLocation}`)

      this.productsNameList = response.data

    }
    catch (error) {
      alert(error);
    }
  }

  getFilteredLocations = async () => {

    try {

      const response = await axios.get(`http://localhost:3020/storesLocationList?storeNameFilter=${this.storeName}&productNameFilter=${this.productName}`)

      this.storesLocationList = response.data

    }
    catch (error) {
      alert(error);
    }

  }

  getFilteredStoresNames = async () => {

    try {

      const response = await axios.get(`http://localhost:3020/storesNameList?storeLocationFilter=${this.storeLocation}&storeNameFilter=${this.storeName}`)

      this.storesNamesList = response.data

    }
    catch (error) {
      alert(error);
    }

  }

}