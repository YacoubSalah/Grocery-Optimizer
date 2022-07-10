const route = require("express")
const cartOperations = require("../database/cart_operations")


const api = route()


api.post("/cartPrices", async function (req, res) {
    const cart = req.body.cart
    let stores = await cartOperations.getStoresPrices(cart)
    res.send(stores)
})
 

module.exports = api
