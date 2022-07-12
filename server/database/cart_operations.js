const productModel = require("../models/product")
const cartFunctions = require("./cart_operations_fn")

async function getStoresPrices(cart) {
    let stores = await cartFunctions.getStoresByCart(cart)
    let productsQuentity = await cartFunctions.getProductsByCart(cart)
    let quentity = productsQuentity.quentity
    products = productsQuentity.products
    let allStores = await cartFunctions.getStores(stores, products,quentity)
    return allStores
}


async function getPostsProduct(productName, storeId) {
    return await cartFunctions.getPostsProduct(productName,storeId)

}

module.exports = {
    getStoresPrices,
    getPostsProduct
}
