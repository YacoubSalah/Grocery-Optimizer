const mongoose = require('mongoose')
const configuration = require('../configuration')

let productSchema = new mongoose.Schema({
    productName: String,
    productImage: { type: String, default: configuration.productNoImageUrl },
    productDescription: { type: String, default: "No product Description" },
    productMainCategory: { type: String, default: "Unknown" },
    productSubCategory: { type: String, default: "unknown" },
})

let productModel = new mongoose.model('product' , productSchema)

module.exports = productModel