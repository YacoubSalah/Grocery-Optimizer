import { action, makeObservable, observable } from 'mobx'
import axios from 'axios'


export class Store {
  constructor() {
    this.productName = null;
    this.storeName = null;
    this.storeLocation = null;
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

    switch (event.target.name) {
      case 'storeName':

        this[event.target.name] = event.target.value
        this.getFilteredProductsNames()
        this.getFilteredLocations()

        break;
      case 'productName':

        console.log(event.target.name)
        console.log(event.target.value)
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
        typeof (event) === 'number' ?
          this.score = parseInt(event) / 20 :
          this[event.target.name] = event.target.value
    }


  }

  handelAddClick = () => {

    axios.post('http://localhost:3020/post', {
      "productName": this.productName,
      "storeName": this.storeName,
      "storeLocation": this.cityName,
      "score": parseInt(this.score),
      "price": parseInt(this.price),
      "note": this.note
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
      const response = await axios.get('http://localhost:3020/storesNamesList', {

        "storeLocationFilter": null,
        "productNamefilter": null,

      })

      this.storesNamesList = [...response.data]

    }
    catch (e) {
      alert(e)
    }

  }

  getStoresLocationList = async () => {

    try {
      const response = await axios.get('http://localhost:3020/storesLocationsList', {

        "storeNameFilter": null,
        "productNamefilter": null,

      })

      this.storesLocationList = [...response.data]

    }
    catch (error) {
      alert(error);
    }

  }

  getproductsNameList = async () => {

    try {

      const response = await axios.get('http://localhost:3020/productsNameslist', {

        "storeNameFilter": null,
        "storeLocationFilter": null,

      })

      this.productsNameList = [...response.data]

    }
    catch (error) {
      alert(error);
    }

  }

  getFilteredProductsNames = async () => {

    try {

      const response = await axios.get(`http://localhost:3020/productsNameslist?storeNameFilter=${this.storeName}&productNamefilter=${this.storeLocation}`)

      this.productsNameList = [...response.data]

    }
    catch (error) {
      alert(error);
    }
  }

  getFilteredLocations = async () => {

    try {

      const response = await axios.get(`http://localhost:3020/storesLocationsList?storeNameFilter=${this.storeName}&productNamefilter=${this.productName}`)

      this.storesLocationList = [...response.data]

    }
    catch (error) {
      alert(error);
    }

  }

  getFilteredStoresNames = async () => {

    try {

      console.log("a", this.storeLocation)
      console.log("d", this.productName)

      const response = await axios.get(`http://localhost:3020/storesNamesList?storeLocationFilter=${this.storeLocation}&productNamefilter=${this.productName}`)

      this.storesNamesList = [...response.data]

    }
    catch (error) {
      alert(error);
    }

  }

}