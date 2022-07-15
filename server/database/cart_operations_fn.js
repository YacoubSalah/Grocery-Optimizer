const productModel = require("../models/product")
const storeModel = require("../models/store")



async function getStores(stores, products) {
    let allStoresFinal = []
    productCart = {}
    dommyStore = {}
    productshelp = []

    for (let store in stores) {
        let s = stores[store][0]
        productCart = {}
        dommyStore = {}
        productshelp = []
        dommyStore.name = s.name
        dommyStore.location = s.location
        dommyStore.image = s.image || ""
        dommyStore.id = s.id
        dommyStore.score = s.score
        dommyStore.isComplete = true

        for (let index = 1; index < stores[store].length; index++) {
            let product = stores[store][index]
            let productData = getScoreProduct(product, s._id,stores)
            productCart[Object.keys(product)[0]] = {
                "initialPrice": Object.values(product)[0].initialPrice,
                "score": productData.score,
                "postQuantity":productData.postQuantity
            }
            productshelp.push(Object.keys(product)[0])

        }
        products.map(p => {
            if (!productshelp.includes(p)) {
                productCart[p] = {
                    "initialPrice": null,
                    "score": 0,
                    "postQuantity": 0
                }
                dommyStore.isComplete = false
            }
        })
        dommyStore.productCart = productCart
        allStoresFinal.push(dommyStore)

    }
    return allStoresFinal

}


async function getPostsProductApi(productName, storeId) {
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

 function getScoreProduct(productName, storeId,stores) {
    let posts = getPostsProduct(Object.keys(productName)[0], storeId,stores)
    let score = 0
    postQuantity = 0
    if (posts.length === 0)
        return { score, postQuantity }
    posts.map(p => {
        score += p.score
        postQuantity += 1
    })
    score = Math.round((score / postQuantity) * 100) / 100
    return { score, postQuantity }
}

async function getStoresByCart(cart) {
    let products = Object.keys(cart)
    let productsData = await productModel.find({ 'name': { $in: products } })
        .populate("stores.store")
        .exec()

    let allStores = {}
    let productData = {}
    for (let product of productsData) {
        product.stores.map(s => {
            productData = {}
            if (allStores[s.store.id]) {
                productData[product.name] = {
                    "initialPrice": s.initialPrice,
                    "posts": s.posts
                }

                allStores[s.store.id].push(productData)
            } else {
                productData[product.name] = {
                    "initialPrice": s.initialPrice,
                    "posts": s.posts
                }
                allStores[s.store.id] = [s.store, productData]
            }
        })
    }
    return allStores

}

function getPostsProduct(productName, storeId, stores) {
    for (let index = 1; index < stores[storeId].length; index++) {
        if(Object.keys(stores[storeId][index])[0] === productName)
            return Object.values(stores[storeId][index])[0].posts
    }

}
module.exports = {
    getStoresByCart,
    getStores,
    getPostsProduct,
    getPostsProductApi
}