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

api.get("/categoryProducts/", async function (req, res) {
    category = req.query
    products = await productOperations.getProductsByCategory(category)
    res.send(products)
})

api.get("/products/:searchWord", async function (req, res) {
    let searchWord = req.params.searchWord
    let products = await productOperations.productsSearch(searchWord)
    res.send(products)
})

api.get("/allProductsWithDetails" , async function (req,res){
    let allProductsWithDetails = await productOperations.getAllProductsWithDetails()
    res.send(allProductsWithDetails)
})

module.exports = api