const route = require("express")
const api = route()
const database = require("../database/database_admin_operations")


api.put("/store", async function (req, res) {

    let storeData = req.body
    let feedback = await database.addStore(storeData)
    res.send(feedback)

})

api.post("/product" , async function(req,res){

    let productData = req.body
    let feedback = await database.addProduct(productData)
    res.send(feedback)

})

api.post("/productToStore" , async function(req,res){
    
    let storeProductData = req.body
    let feedback = await database.addStoreToProduct(storeProductData)
    res.send(feedback.message)

})


module.exports = api