import { observable, makeObservable, action, computed } from 'mobx'
import axios from 'axios'


export class Products {
  constructor() {

    this.products = {}
    this.productsNameList = []
    this.categories = {}
    this.searchWord = ''
    this.cart = JSON.parse(localStorage.cart || "{}")
    this.prices = {}


    makeObservable(this, {

      products: observable,
      productsNameList: observable,
      categories: observable,
      searchWord: observable,
      cart: observable,
      prices: observable,
      cartAveragePrice: computed,

      handelInputChange: action,
      search: action,
      checkInCartAndUpdateProducts: action,
      updateProductQuantity: action,
      updateCartItem: action,
      getCategories: action,
      updateCategories: action,
      getproductsByCategory: action,
      bindCartItemQuantity: action,
      deleteCartItem: action
    })
  }

  handelInputChange = (event) => this[event.target.name] = event.target.value

  search = () => {
    if (!this.searchWord) {
      this.searchWord = 'Initiate'
    }
    axios.get(`http://localhost:3020/products/${this.searchWord}`)
      .then((newProductsList) => this.checkInCartAndUpdateProducts(newProductsList.data))
      .catch((error) => alert(error))
  }

  checkInCartAndUpdateProducts(newProducts) {
    this.productsNameList = Object.keys(newProducts)
    for (let productName of this.productsNameList) {
      this.prices[productName] = newProducts[productName].averagePrice
      newProducts[productName].quantity = 1
      if (this.cart[productName]) {
        newProducts[productName].inCart = true
      } else {
        newProducts[productName].inCart = false
      }
    }
    this.products = newProducts
  }

  updateProductQuantity = (event) => {
    let productName = event.target.name
    let quantity = event.target.value
    this.products[productName].quantity = quantity
  }

  updateCartItem = (event) => {
    let productName = event.target.name
    if (this.cart[productName]) {
      delete this.cart[productName]
    } else {
      this.cart[productName] = this.products[productName].quantity || 0
    }
    localStorage.cart = JSON.stringify(this.cart)
  }

  get cartAveragePrice() {
    let price = 0
    let cartItems = Object.keys(this.cart)
    for (let cartItem of cartItems) {
      let cartItemQuantity = this.cart[cartItem]
      let cartItemPrice = this.prices[cartItem] ? this.prices[cartItem] : 0
      price += cartItemPrice * cartItemQuantity
    }
    return (Math.round(price * 100) / 100)
  }

  getCategories = () => {
    const response = axios.get('http://localhost:3020/categories')
      .then((response) => this.updateCategories(response.data))
      .catch((error) => alert(error))
    this.categories = response.data
  }

  updateCategories(newCategories) {
    this.categories = newCategories
  }

  getproductsByCategory = (event) => {
    let mainCategory = event.target.dataset.mainCategory || ''
    let subCategory = event.target.dataset.subCategory || ''
    axios.get(`http://localhost:3020/categoryProducts?mainCategory=${mainCategory}&subCategory=${subCategory}`)
      .then((newProducts) => this.checkInCartAndUpdateProducts(newProducts.data))
      .catch((error) => alert(error))
  }

  bindCartItemQuantity = (event) => {
    let productName = event.target.name
    let productQuantity = event.target.value
    this.cart[productName] = productQuantity
  }

  deleteCartItem = (event) => {
    let productName = event.target.textContent
    delete this.cart[productName]
  }

}