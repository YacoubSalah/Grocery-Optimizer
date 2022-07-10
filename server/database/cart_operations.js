const productModel = require("../models/product")
const storeModel = require("../models/store")

async function getStoresPrices(cart) {
    let stores = await getStoresByCart(cart)
    let products =await  getProductsByCart(cart)
    let allS = await getStores(stores,products)
    return allS
}



async function getStores(stores,products) {
    let allStoresFinal = []
    productCart = {}
    st = {}
    productshelp  = []
    for(let store in stores){
        productCart = {}
        st = {}
        productshelp  = []
        let s =await storeModel.findById(store).exec()
        st.name = s.name
        st.location = s.location
        totalPrice = 0
        st.isComplete = true
        for(let product of stores[store]){
            productCart[Object.keys(product)[0]] = Object.values(product)[0]
            totalPrice += Object.values(product)[0]
            productshelp.push(Object.keys(product)[0])
        }
        st.totalPrice = totalPrice
       products.map(p => {
            if(!productshelp.includes(p)){
                productCart[p]=null
                st.isComplete = false
            }
        })
        st.productCart = productCart
        allStoresFinal.push(st)
    }
    return allStoresFinal
}


async function getProductsByCart(cart) {
    let products = []
    for (let item in cart) {
        products.push(item)
    }
    return products
}

async function getStoresByCart(cart) {
    let allStores = {}
    productInitialPriceObj = {}
    for (let item in cart) {
        let product = await productModel.findOne({ 'name': `${item}` }).exec()
        product.stores.map(s => {
            productInitialPriceObj = {}
            if (allStores[s.store]) {
                productInitialPriceObj[product.name] = s.initialPrice
                allStores[s.store].push(productInitialPriceObj)
            } else {
                productInitialPriceObj[product.name] = s.initialPrice
                allStores[s.store] = [productInitialPriceObj]
            }
        })
    }
    return allStores
}










module.exports = {
    getStoresPrices
}
