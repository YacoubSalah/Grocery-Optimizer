import { observable, makeObservable, action } from 'mobx'
import axios from 'axios'

export class Carts {
    constructor() {

        this.storesCartsList = [];
        this.itemToShow = null ; 
        this.feedBack = 0 ; 
        this.totalPrice = 0

        makeObservable(this, {
            storesCartsList: observable,
            itemToShow: observable,
            feedBack : observable ,
            totalPrice : observable ,
            updateStoresCartList: action,
            addItemToShow: action ,
            updateFeedBack: action ,
            gettotalPrice : action
        })
    }

    getStoresByProducts = (cart) => {

        console.log(cart)

        axios.post(`http://localhost:3020/cartPrices`, { cart })
            .then((response) => this.updateStoresCartList(response.data))
            .catch((error) => alert(error))

    }

    updateStoresCartList = (storesList) => {
        this.storesCartsList = storesList
    }

    addItemToShow = (id) => {
        this.itemToShow = this.storesCartsList.find(item => item.id === id)
    }

    getFeedBack = (itemName, id) => {

        axios.get(`http://localhost:3020/postsProduct/?productName=Baby Cucumber&&storeId=62c7df3cce122ba23a5c46f2`)
            .then((response) =>  this.updateFeedBack(response.data.length) )
            .catch((error) => alert(error))

    }

    updateFeedBack = (value) => {
          this.feedBack = value
    }

    gettotalPrice = () => {

        let sumTotal = 0

        for(let key in this.itemToShow.productCart){
            sumTotal += this.itemToShow.productCart[key].initialPrice * this.itemToShow.productCart[key].quentity
        }

        this.totalPrice = Math.round(sumTotal * 100 ) / 100 
    }
}
