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
            sumTotalPrice : action
        })
    }

    getStoresByProducts = (cart) => {

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

        console.log(itemName , id)

        axios.get(`http://localhost:3020/postsProduct/?productName=${itemName}&&storeId=${id}`)
            .then((response) =>  this.updateFeedBack(response.data.length) )
            .catch((error) => alert(error))

    }

    updateFeedBack = (value) => {
        console.log(value)
          this.feedBack = value
    }

    sumTotalPrice = ( count , price ) => {
        this.totalPrice += Math.round((price * count) * 100 ) / 100 
    }
}
