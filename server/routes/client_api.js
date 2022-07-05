const route = require("express")
const api = route()
const postOperations = require("../database/post_operations")
const storeOperations = require("../database/store_operations")
const product_operations = require("../database/product_operations")

api.post("/post", async function (req, res) {

    let postData = req.body
    let feedback = await postOperations.addPost(postData)
    res.send(feedback)

})

api.get("/stores", async function (req, res) {

    let stores = await storeOperations.getStores()
    res.send(stores)
})

api.get("/products", async function (req, res) {
    ///////////////////////////////////////////////
    let products = await product_operations.getProducts()
    res.send(products)
})

module.exports = api