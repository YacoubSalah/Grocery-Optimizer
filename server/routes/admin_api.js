const route = require("express")
const api = route()
const database = require("../database/database_admin_operations")


api.post("/store", async function (req, res) {

    let storeData = req.body
    let feedback = await database.addStore(storeData)
    res.send(feedback)

})

api.post("/product" , async function(req,res){

    let productData = req.body
    let feedback = await database.addProduct(productData)
    res.send(feedback)

})

api.put("/productToStore" , async function(req,res){
    
    let storeProductData = req.body
    let feedback = await database.refStoreToProduct(storeProductData)
    res.send(feedback)

})

api.post("/price" , async function (req,res){

    let priceData = req.body
    let feedback = await database.addProductPrice(priceData)
    res.send(feedback)
    
})

module.exports = api