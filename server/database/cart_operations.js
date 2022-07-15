const cartFunctions = require("./cart_operations_fn")

async function getStoresPrices(cart) {
    let stores = await cartFunctions.getStoresByCart(cart)
    let products = Object.keys(cart)
    let allStores = await cartFunctions.getStores(stores, products)
    return allStores
} 
 

async function getPostsProductApi(productName, storeId) {
    
    return await cartFunctions.getPostsProductApi(productName,storeId)

}

module.exports = {
    getStoresPrices,
    getPostsProductApi
}
