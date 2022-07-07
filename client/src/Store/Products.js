import { observable , makeObservable, action } from 'mobx'
import axios from 'axios'


export class Products {
    constructor() {
        this.ProductsList = [];


        makeObservable(this, {
            ProductsList : observable ,
            initializeProductsList : action
        })
    } 

    initializeProductsList = async () => {


        try {
            const response = await axios.get('http://localhost:3020/allProducts')
      
            console.log(response.data)
      
          }
          catch (e) {
            alert(e)
          }

    }
}


