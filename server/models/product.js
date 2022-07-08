const mongoose = require('mongoose')
const configuration = require('../configuration')

let postSchema = new mongoose.Schema({
    imageURL: { type: String, default: configuration.productNoImageUrl },
    price: { type: Number, default: null },
    score: { type: Number, default: null },
    note: { type: String, default: "" }
}, { _id: false, timestamps: { createdAt: true, updatedAt: false } })

const storesSchema = new mongoose.Schema({
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'store' },
    initialPrice: { type: Number, default: null },
    calculatedPrice: { type: Number, default: null },
    posts: [postSchema]
}, { _id: false })

const productSchema = new mongoose.Schema({
    name: String,
    imageUrl: { type: String, default: configuration.productNoImageUrl },
    description: { type: String, default: "No product Description" },
    mainCategory: { type: String, default: "Unknown" },
    subCategory: { type: String, default: "Unknown" },
    stores: [storesSchema]
})

const productModel = mongoose.model('product', productSchema)

module.exports = productModel