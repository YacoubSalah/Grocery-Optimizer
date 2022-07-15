const route = require("express")
const cartOperations = require("../database/cart_operations")


const api = route()


api.post("/cartPrices", async function (req, res) {
    const cart = req.body.cart
    let stores = await cartOperations.getStoresPrices(cart)
    res.send(stores)
})

api.get("/postsProduct", async function (req, res) {
    const param = req.query
    let posts = await cartOperations.getPostsProduct(param.productName, param.storeId)
    res.send(posts)
})

module.exports = api
