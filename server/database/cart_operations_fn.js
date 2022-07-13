const productModel = require("../models/product")
const storeModel = require("../models/store")

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
        dommyStore.score = s.score
        dommyStore.isComplete = true
        
        for (let product of stores[store]) {
            let p = await productModel.findOne({'name':Object.keys(product)[0]})
            .populate("stores.store")
            .exec()
            
            productCart[Object.keys(product)[0]] = {
                "initialPrice": Object.values(product)[0],
                "score":await getScoreProduct(Object.keys(product)[0], s.id)
            }
            productshelp.push(Object.keys(product)[0])
            
        }
        products.map(p => {
            
            if (!productshelp.includes(p)) {
                productCart[p] = {
                    "initialPrice": null,
                    "score": 0
                }
                
                dommyStore.isComplete = false
            }
        })
        dommyStore.productCart = productCart
        allStoresFinal.push(dommyStore)
        
    }
    return allStoresFinal
}


async function getScoreProduct(productName, storeId) {
    let posts = await getPostsProduct(productName, storeId)
    let score = 0
    count = 0
    if (posts.length === 0)
        return 0
    posts.map(p => {
        score += p.score
        count += 1
    })
    return Math.round((score / count) * 100) / 100
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
module.exports = {
    getStoresByCart,
    getProductsByCart,
    getStores,
    getPostsProduct
}