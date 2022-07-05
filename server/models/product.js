const mongoose = require('mongoose')
const configuration = require('../configuration')

const Schema = mongoose.Schema

let postSchema = new Schema({
    //user: { type: Schema.Types.ObjectId, ref: "user", default: "Anonymous" },
    imageURL: { type: String, default: configuration.productNoImageUrl },
    price: { type: Number, default: null },
    score: { type: Number, default: null },
    note: { type: String, default: "User didnt leave a note" }
}, { timestamps: { createdAt: true, updatedAt: false } })

let storeSchema = new Schema({
    storeId: String,
    initialPrice: { type: Number, default: null },
    calculatedPrice: { type: Number, default: null },
    posts: [postSchema]
}, { _id: false })

let productSchema = new Schema({
    name: String,
    imageUrl: { type: String, default: configuration.productNoImageUrl },
    description: { type: String, default: "No product Description" },
    mainCategory: { type: String, default: "Unknown" },
    subCategory: { type: String, default: "unknown" },
    stores: [storeSchema]
})

let productModel = mongoose.model('product', productSchema)


module.exports = productModel