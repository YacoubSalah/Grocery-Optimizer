const route = require("express")
const api = route()
const postOperations = require("../database/post_operations")
const storeOperations = require("../database/store_operations")
const productOperations = require("../database/product_operations")

api.post("/post", async function (req, res) {

    let postData = req.body
    let feedback = await postOperations.addPost(postData)
    res.send(feedback)

})

api.get("/storesNamesList", async function (req, res) {
    let filter = req.body
    let stores = await storeOperations.getStoresNamesList(filter)
    res.send(stores)
})

api.get("/storesLocationsList", async function (req, res) {
    let filter = req.body
    let stores = await storeOperations.getStoresLocationsList(filter)
    res.send(stores)
})

api.get("/productsNamesList", async function (req, res) {
    let filter = req.body
    let products = await productOperations.getProductsNamesList(filter)
    res.send(products)
})

module.exports = api