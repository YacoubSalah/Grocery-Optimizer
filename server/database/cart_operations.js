const productModel = require("../models/product")
const storeModel = require("../models/store")

async function getStoresPrices(cart) {
    let stores = await getStoresByCart(cart)
    let products = await getProductsByCart(cart)
    let allStores = await getStores(stores, products)
    return allStores
}



async function getStores(stores, products) {
    let allStoresFinal = []
    productCart = {}
    dommyStore = {}
    productshelp = []
    for (let store in stores) {
        productCart = {}
        dommyStore = {}
        productshelp = []
        let s = await storeModel.findById(store).exec()
        dommyStore.name = s.name
        dommyStore.location = s.location
        dommyStore.id = s.id
        totalPrice = 0
        dommyStore.isComplete = true
        for (let product of stores[store]) {
            productCart[Object.keys(product)[0]] = Object.values(product)[0]
            totalPrice += Object.values(product)[0]
            productshelp.push(Object.keys(product)[0])
        }
        dommyStore.totalPrice = totalPrice
        products.map(p => {
            if (!productshelp.includes(p)) {
                productCart[p] = null
                dommyStore.isComplete = false
            }
        })
        dommyStore.productCart = productCart
        allStoresFinal.push(dommyStore)
    }
    return allStoresFinal
}

async function getPostsProduct(productName, storeId) {
    let posts = {}
    let product = await productModel.findOne({ name: productName })
        .populate("stores.store")
        .exec()
    product.stores.map(s => {
        if (s.store.id === storeId) {
            posts = s.posts
        }
    })
    return posts

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
