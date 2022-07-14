import { observable, makeObservable, action } from 'mobx'
import axios from 'axios'

export class Carts {

    constructor() {

        this.storesCarts = []
        this.filteredStoresCarts = []
        this.itemToShow = null
        this.feedBack = []
        this.totalPrice = 0
        this.loadingStoresSnackBar = false
        this.requsetStoresStatus = true
        this.storesNameList = []
        this.citiesNameList = []
        this.cityNameFilter = ""
        this.storeNameFilter = ""

        makeObservable(this, {
            storesCarts: observable,
            filteredStoresCarts: observable,
            itemToShow: observable,
            feedBack: observable,
            totalPrice: observable,
            loadingStoresSnackBar: observable,
            requsetStoresStatus: observable,
            citiesNameList: observable,
            storesNameList: observable,

            updateStoresCarts: action,
            updatedFilteredStoresCarts: action,
            addItemToShow: action,
            updateFeedBack: action,
            calculateTotalPrices: action,
            handleLoadinStoresSnackBar: action,
            UpdateRequestStatus: action,
            updateCitiesNameList: action,
            updateStoresNameList: action
        })

    }

    updatedFilteredStoresCarts = (event) => {
        if (event) {
            this[event.target.name] = event.target.value
        }
        this.filteredStoresCarts = []
        if (this.cityNameFilter && this.storeNameFilter) {
            this.filteredStoresCarts = this.storesCarts.filter(storecart => storecart.name === this.storeNameFilter && storecart.location === this.cityNameFilter)
        } else if (this.cityNameFilter) {
            this.filteredStoresCarts = this.storesCarts.filter(storecart => storecart.location === this.cityNameFilter)
        }
        else if (this.storeNameFilter) {
            this.filteredStoresCarts = this.storesCarts.filter(storecart => storecart.name === this.storeNameFilter)
        }
        else {
            this.filteredStoresCarts = this.storesCarts
        }
        this.updateCitiesNameList()
        this.updateStoresNameList()
    }

    getStoresByProducts = (cart) => {
        this.loadingStoresSnackBar = true
        axios.post(`http://localhost:3020/cartPrices`, { cart })
            .then((response) => {
                this.handleLoadinStoresSnackBar()
                this.updateStoresCarts(response.data)
                this.updatedFilteredStoresCarts()
                this.calculateTotalPrices(cart)
            })
            .catch(() => {
                this.UpdateRequestStatus()
            })
    }

    updateStoresCarts = (newStoresCarts) => {
        this.storesCarts = newStoresCarts
    }

    handleLoadinStoresSnackBar() {
        this.loadingStoresSnackBar = false
    }

    UpdateRequestStatus() {
        this.requsetStoresStatus = false
    }

    calculateTotalPrices = (productsCart) => {

        let cart = productsCart

        if (this.storesCarts.length !== 0) {
            this.storesCarts.forEach(store => {
                Object.keys(store.productCart).forEach(key => {
                    store.productCart[key]['totalPrice'] = store.productCart[key].initialPrice * cart[key]
                })
            })
        }
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

    updateCitiesNameList() {
        let citiesList = []
        if (this.storeNameFilter) {
            for (let storeCart of this.storesCarts) {
                if (storeCart.name === this.storeNameFilter) {
                    citiesList.push(storeCart.location)
                }
            }
        } else {
            for (let storeCart of this.storesCarts) {
                citiesList.push(storeCart.location)
            }
        }
        this.citiesNameList = this.returnArrayWithoutDuplicates(citiesList)
    }

    updateStoresNameList() {
        let storesList = []
        if (this.cityNameFilter) {
            for (let storeCart of this.storesCarts) {
                if (storeCart.location === this.cityNameFilter) {
                    storesList.push(storeCart.name)
                }
            }
        } else {
            for (let storeCart of this.storesCarts) {
                storesList.push(storeCart.name)
            }
        }
        this.storesNameList = this.returnArrayWithoutDuplicates(storesList)
    }

    returnArrayWithoutDuplicates(inputArray) {
        let inputsSet = new Set()
        for (let input of inputArray) {
            inputsSet.add(input)
        }
        let outputArray = Array.from(inputsSet)
        return outputArray
    }

}
