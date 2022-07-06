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
      getproductsNameList: action
    })
  }

  handelInputs = (event) => {

    switch (event.target.name) {
      case 'storeName':
        this[event.target.name] = event.target.value
        this.filterSelectOptions()
        break;
      case 'productName':
        // code block
        break;
      case 'storeLocation':
        // code block
        break;
      default:
      // code block
    }

    /* typeof (event) === 'number' ?
    this.score = parseInt(event) / 20 :
    this[event.target.name] = event.target.value */
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
      this.storeName = response.data[0]
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
      this.storeLocation = response.data[0]

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
      this.productName = response.data[0]
    }
    catch (error) {
      alert(error);
    }

  }

  filterSelectOptions = async () => {

    try{
        
       const response = await  axios.get(`http://localhost:3020/storesLocationsList?storeNameFilter=${this.storeName}&productNameFilter=${''}`)

       this.storesLocationList = [...response.data]
       this.storeLocation = response.data[0]
    }
    catch(error){
      alert(error);
    }
  }

}