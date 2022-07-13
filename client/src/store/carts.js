import { observable, makeObservable, action } from 'mobx'
import axios from 'axios'

export class Carts {

    constructor() {

        this.storesCartsList = [];  //more accurate name : storesDataFromServer
        this.itemToShow = null;
        this.feedBack = [];
        this.totalPrice = 0

        makeObservable(this, {
            storesCartsList: observable,
            itemToShow: observable,
            feedBack: observable,
            totalPrice: observable,
            updateStoresCartList: action,
            addItemToShow: action,
            updateFeedBack: action,
            calculateTotalPrices: action
        })

    }

    getStoresByProducts = (cart) => {

        axios.post(`http://localhost:3020/cartPrices`, { cart })
            .then((response) => {
                this.updateStoresCartList(response.data)
                this.calculateTotalPrices(cart)
            })
            .catch((error) => alert(error))

    }

    calculateTotalPrices = (productsCart) => {

        let cart = productsCart

        if (this.storesCartsList.length !== 0) {
            this.storesCartsList.forEach(store => {
                Object.keys(store.productCart).forEach(key => {
                    store.productCart[key]['totalPrice'] = store.productCart[key].initialPrice * cart[key]
                })
            })

        }
    }

    updateStoresCartList = (storesList) => {
        this.storesCartsList = storesList
    }

    addItemToShow = (id) => {
        this.itemToShow = this.storesCartsList.find(item => item.id === id)
    }

    getFeedBack = (itemName, id) => {

        axios.get(`http://localhost:3020/postsProduct/?productName=${itemName}&&storeId=${id}`)
            .then((response) => {
                this.updateFeedBack(response.data)
            })
            .catch((error) => alert(error))

    }

    updateFeedBack = (posts) => {
        this.feedBack = posts
    }

    sumTotalPriceForStore = (itemsCart) => {

        let sum = 0

        Object.keys(itemsCart).forEach(key => {
            sum += Math.round(itemsCart[key].totalPrice * 100) / 100
        })

        return sum

    }
}
