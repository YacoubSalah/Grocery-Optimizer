import { observable, makeObservable, action } from 'mobx'
import axios from 'axios'

export class Carts {
    constructor() {

        this.storesCartsList = [] ;

        makeObservable(this, {
            storesCartsList : observable ,
            updateStoresCartList : action ,
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
}
