const route = require("express")
const api = route()
const postOperations = require("../database/post_operations")
const storeOperations = require("../database/store_operations")
const productOperations = require("../database/product_operations")

api.post("/post", async function (req, res) {
    let postData = req.body
    let feedback = await postOperations.addPost(postData)
    if (!feedback.status) {
        return res.status(400).send(feedback.message)
    }
    res.send(feedback)

})

api.get("/storesNamesList/", async function (req, res) {
    let filter = req.query
    let stores = await storeOperations.getStoresNamesList(filter)
    res.send(stores)
})

api.get("/storesLocationsList", async function (req, res) {
    let filter = req.query
    let stores = await storeOperations.getStoresLocationsList(filter)
    res.send(stores)
})

api.get("/productsNamesList", async function (req, res) {
    let filter = req.query
    let products = await productOperations.getProductsNamesList(filter)
    res.send(products)
})

api.get("/productsNamesSearch", async function (req, res) {
    let productName = req.body.productName
    let products = await productOperations.productsNamesSearch(productName)
    res.send(products)
})

api.get("/categories", async function (req, res) {
    let categories = await productOperations.getCategories()
    res.send(categories)
})

api.get("/categoryProducts", async function (req, res) {
    category = req.body
    products = await productOperations.getProductsByCategory(category)
    res.send(products)
})

module.exports = api