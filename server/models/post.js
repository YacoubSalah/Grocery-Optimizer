const mongoose = require('mongoose')
const configuration = require('../configuration')

const Schema = mongoose.schema

let postSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user" , default:"Anonymous"},
    product: { type: Schema.Types.ObjectId, ref: "product" },
    store: { type: Schema.Types.ObjectId, ref: "store" },
    imageURL: { type: String, default: configuration.productNoImageUrl },
    price: { type: Number, default: null },
    score: { type: Number, default: null },
    date: Date
})

let postModel = mongoose.model('post', postSchema)

module.exports = postModel