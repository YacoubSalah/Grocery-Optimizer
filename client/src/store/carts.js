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
            calculateTotalPrices : action
        })
    }

    getStoresByProducts = (cart) => {

        axios.post(`http://localhost:3020/cartPrices`, { cart })
            .then((response) => {
                this.updateStoresCartList(response.data)
                this.calculateTotalPrices()
            })
            .catch((error) => alert(error))

    }

    calculateTotalPrices = () => {
        
        let cart = JSON.parse(localStorage.cart || "{}")

        if(this.storesCartsList.length!==0){
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

        console.log(itemName , id)

        axios.get(`http://localhost:3020/postsProduct/?productName=${itemName}&&storeId=${id}`)
            .then((response) =>  {
                console.log(response.data)
                this.updateFeedBack(response.data.length) 
            })
            .catch((error) => alert(error))

    }

    updateFeedBack = (value) => {
          this.feedBack = value
    }

    sumTotalPriceForStore = (itemsCart) => {

        let sum = 0

        Object.keys(itemsCart).forEach(key => {
            sum += Math.round(itemsCart[key].totalPrice * 100) / 100
        })

        return sum

    }
}
