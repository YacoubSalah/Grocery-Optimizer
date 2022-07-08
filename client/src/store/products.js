import { observable, makeObservable, action  } from 'mobx'
import axios from 'axios'


export class Products {
  constructor() {

    this.ProductsList = [];
    this.categories = null;


    makeObservable(this, {

      ProductsList : observable,
      categories : observable,
      initializeProductsList : action ,
      initializeCategories : action

    })
  }

  initializeProductsList = async () => {


    try {
      
      const response = await axios.get('http://localhost:3020/allProducts')

      this.ProductsList = response.data

    }
    catch (e) {
      alert(e)
    }

  }

  initializeCategories = async () => {

    try {

      const response = await axios.get('http://localhost:3020/categories')

      this.categories = response.data

    }
    catch (e) {
      alert(e)
    }
  }
}


