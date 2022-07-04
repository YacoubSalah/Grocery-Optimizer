const mongoose = require('mongoose')
const configuration = require('../configuration')

const Schema = mongoose.Schema

let productSchema = new Schema({
    name: String,
    imageUrl: { type: String, default: configuration.productNoImageUrl },
    description: { type: String, default: "No product Description" },
    mainCategory: { type: String, default: "Unknown" },
    subCategory: { type: String, default: "unknown" },
    stores: [{ type: Schema.Types.ObjectId, ref: "store", default: [] }]
})

let productModel = mongoose.model('product', productSchema)

module.exports = productModel