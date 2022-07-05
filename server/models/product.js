const mongoose = require('mongoose')
const configuration = require('../configuration')

const Schema = mongoose.Schema

let postSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", default: "Anonymous" },
    imageURL: { type: String, default: configuration.productNoImageUrl },
    price: { type: Number, default: null },
    score: { type: Number, default: null }
}, { _id: false, timestamps: { createdAt: true } })

let storeSchema = mongoose.Schema({
    storeId: Schema.Types.ObjectId,
    initialPrice: Number,
    calculatedPrice: Number,
    posts: [postSchema]
}, { _id: false })

let productSchema = mongoose.Schema({
    name: String,
    imageUrl: { type: String, default: configuration.productNoImageUrl },
    description: { type: String, default: "No product Description" },
    mainCategory: { type: String, default: "Unknown" },
    subCategory: { type: String, default: "unknown" },
    stores: [storeSchema]
})

let productModel = mongoose.model('product', productSchema)


module.exports = productModel