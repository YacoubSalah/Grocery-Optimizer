import { observable, makeObservable, action  } from 'mobx'
import axios from 'axios'


export class Products {
  constructor() {

    this.ProductsList = [];
    this.categories = null;
    this.search_Value = '';
    this.cartProducts = JSON.parse(localStorage.ItemsInCart || "[]");
    this.countForAddProducttoCart = 0


    makeObservable(this, {

      ProductsList : observable,
      categories : observable,
      search_Value:observable,
      cartProducts : observable ,
      countForAddProducttoCart : observable ,
      initializeProductsList : action ,
      initializeCategories : action ,
      filterCategoryProducts : action , 
      handelSelectEvent : action ,
      handelOnChangeEvent : action,
      AddToCart:action

    })
  }

  handelSelectEvent = async (event) => {

      let mainCategory =  event.target.name
      let subCategory =  event.target.value

      try {
      
        const response = await axios.get(`http://localhost:3020/categoryProducts?mainCategory=${mainCategory}&subCategory=${subCategory}`)
  
        this.ProductsList = response.data
  
      }
      catch (e) {
        alert(e)
      }


  }

  handelOnChangeEvent = (event) => this[event.target.name] = event.target.value

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

  filterCategoryProducts = async () => {

    try {

      const response = await axios.get(`http://localhost:3020/categoryProducts?mainCategory=${this.mainCategory}&subCategory=${this.subCategory}`)

      this.categories = response.data

    }
    catch (e) {
      alert(e)
    }

  }

  handelSearchClickEvent = async () => {

    try {

      const response = await axios.get(`http://localhost:3020/products/${this.search_Value}`)

      this.ProductsList = response.data

    }
    catch (e) {
      alert(e)
    }
        
  }

  AddToCart = (cart) => {

    this.cartProducts = [...cart]

    console.log("asas",this.cartProducts)

  }
}


