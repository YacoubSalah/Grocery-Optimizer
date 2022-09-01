import { observable, makeObservable, action } from 'mobx'
import axios from 'axios'
import { URL } from '../config'

export class Carts {

    constructor() {

        this.storesCarts = []
        this.filteredStoresCarts = []
        this.loadingStoresSnackBar = false
        this.storesNameList = []
        this.citiesNameList = []
        this.cityNameFilter = ""
        this.storeNameFilter = ""
        
        //not revised
        this.itemToShow = null

        this.feedBack = []
        this.totalPrice = 0
        this.requsetStoresStatus = true
        //not revised

        makeObservable(this, {
            storesCarts: observable,
            filteredStoresCarts: observable,
            loadingStoresSnackBar: observable,
            citiesNameList: observable,
            storesNameList: observable,
            cityNameFilter: observable,
            storeNameFilter: observable,


            //not revised
            itemToShow: observable,

            feedBack: observable,
            totalPrice: observable,
            requsetStoresStatus: observable,
            //not revised

            getStoresByProducts: action,
            updateStoresCarts: action,
            updatedFilteredStoresCarts: action,
            handleLoadinStoresSnackBar: action,
            updateCitiesNameList: action,
            updateStoresNameList: action,
            sortStores: action,

            //not revised
            addItemToShow: action,
            updateFeedBack: action,
            calculateTotalPrices: action,
            UpdateRequestStatus: action,
            //not revised
        })

    }

    getStoresByProducts = (cart) => {
        this.loadingStoresSnackBar = true
        this.cityNameFilter = ""
        this.storeNameFilter =""
        
        axios.post(`${URL}cartPrices`, { cart })
            .then((response) => {
                this.handleLoadinStoresSnackBar()
                this.updateStoresCarts(response.data)
                this.updatedFilteredStoresCarts()
                this.calculateTotalPrices(cart)
                this.sortStores()
            })
            .catch(() => {
                this.UpdateRequestStatus()
            })
    }

    updateStoresCarts = (newStoresCarts) => {
        this.storesCarts = newStoresCarts
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
        this.sortStores()
    }

    sortStores(){

        let CompleteStores = []
        let InCompleteStores = []
        let sumTotalPriceForStore = 0

        this.filteredStoresCarts.forEach(store => {
        
            Object.keys(store.productCart).forEach(keys => {
                sumTotalPriceForStore += store.productCart[keys].totalPrice
            })

            let number = sumTotalPriceForStore.toString();
            let result = Number(number.slice(0, 4));
            store['totalPrice'] = result
            sumTotalPriceForStore = 0

            store.isComplete ? CompleteStores.push(store) : InCompleteStores.push(store)
        })

        CompleteStores.sort(function (x, y) {
            console.log(x,y)
            return x.totalPrice - y.totalPrice;
        });

        InCompleteStores.sort(function (x, y) {
            return x.totalPrice - y.totalPrice;
        });

        this.filteredStoresCarts = CompleteStores.concat(InCompleteStores)

    }

    handleLoadinStoresSnackBar() {
        this.loadingStoresSnackBar = false
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

    //revised up to here

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
        this.itemToShow = this.storesCarts.find(item => item.id === id)
    }

    getFeedBack = (itemName, id) => {

        axios.get(`${URL}postsProduct/?productName=${itemName}&&storeId=${id}`)
            .then((response) => {
                this.updateFeedBack(response.data)
            })
            .catch((error) => alert(error))

    }

    updateFeedBack = (posts) => {
        this.feedBack = posts
    }

}
