import { observable, makeObservable, action } from 'mobx'
import axios from 'axios'

export class Carts {

    constructor() {

        this.storesCartsList = [];  //more accurate name : storesDataFromServer
        this.itemToShow = null;
        this.feedBack = [];
        this.totalPrice = 0;
        this.loadingStoresSnackBar = false;
        this.requsetStoresStatus = true
        this.storesNameList = [];
        this.storesLocationList = [];
        this.selectedCityName= "";
        this.selectedStoreName =""

        makeObservable(this, {
            storesCartsList: observable,
            itemToShow: observable,
            feedBack: observable,
            totalPrice: observable,
            loadingStoresSnackBar: observable,
            requsetStoresStatus: observable,
            storesLocationList: observable,
            storesNameList: observable,
            updateStoresCartList: action,
            addItemToShow: action,
            updateFeedBack: action,
            calculateTotalPrices: action,
            handleLoadinStoresSnackBar: action,
            UpdateRequestStatus: action,
            updateStoresLocationList: action,
            updateStoresNameList: action
        })

    }

    getStoresByProducts = (cart) => {

        this.loadingStoresSnackBar = true

        axios.post(`http://localhost:3020/cartPrices`, { cart })
            .then((response) => {
                this.handleLoadinStoresSnackBar()
                this.updateStoresCartList(response.data)
                this.calculateTotalPrices(cart)
            })
            .catch((error) => {
                this.UpdateRequestStatus()
            })
    }

    handleLoadinStoresSnackBar() {
        this.loadingStoresSnackBar = false
    }

    UpdateRequestStatus() {
        this.requsetStoresStatus = false
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

    getStoresLocationList = () => {
        axios.get(`http://localhost:3020/storesLocationList`)
            .then((response) => this.updateStoresLocationList(response.data))
            .catch((error) => alert(error))
    }

    updateStoresLocationList(newStoresLocationList) {
        this.storesLocationList = newStoresLocationList
    }

    getStoresNameList = () => {
        axios.get(`http://localhost:3020/storesNameList`)
            .then((response) => this.updateStoresNameList(response.data))
            .catch((error) => alert(error))
    }

    updateStoresNameList(newStoresNameList) {
        this.storesNameList = newStoresNameList
    }

}
