const route = require("express")
const productOperations = require("../database/product_operations")

const api = route()

api.post("/product", async function (req, res) {
    const productData = req.body
    let feedback = await productOperations.addProduct(productData)
    if (!feedback.status) {
        return res.status(500).send(feedback.message)
    }
    res.send(feedback)
})

api.post("/productStore", async function (req, res) {
    const productStoreData = req.body
    let feedback = await productOperations.addProductStore(productStoreData)
    if (!feedback.status) {
        return res.status(500).send(feedback.message)
    }
    res.send(feedback)
})

api.post("/productStorePost", async function (req, res) {
    const postData = req.body
    let feedback = await productOperations.addProductStorePost(postData)
    if (!feedback.status) {
        return res.status(500).send(feedback.message)
    }
    res.send(feedback)
})

api.get("/allProducts", async function (req, res) {
    let products = await productOperations.getAllProducts()
    res.send(products)
})

api.get("/productsNameList", async function (req, res) {
    const filter = req.query
    let productsNameList = await productOperations.getProductsNameList(filter)
    res.send(productsNameList)
})

api.get("/categories", async function (req, res) {
    let categories = await productOperations.getCategories()
    res.send(categories)
})

module.exports = api

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*

api.get("/categoryProducts/", async function (req, res) {
    category = req.query
    products = await productOperations.getProductsByCategory(category)
    res.send(products)
})

api.get("/productsByName/:productName", async function (req, res) {
    let productName = req.params.productName
    let products = await productOperations.productsNamesSearch(productName)
    res.send(products)
})

 */