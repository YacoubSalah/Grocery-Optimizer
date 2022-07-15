const cartFunctions = require("./cart_operations_fn")

async function getStoresPrices(cart) {
    let stores = await cartFunctions.getStoresByCart(cart)
    let products = await cartFunctions.getProductsByCart(cart)
    let allStores = await cartFunctions.getStores(stores, products)
    return allStores
}


async function getPostsProduct(productName, storeId) {
    return await cartFunctions.getPostsProduct(productName,storeId)

}

module.exports = {
    getStoresPrices,
    getPostsProduct
}
