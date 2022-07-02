const mongoose = require('mongoose')
const Schema = mongoose.Schema

let priceSchema = new Schema({
    store: { type: Schema.Types.ObjectId, ref: 'store' },
    product: { type: Schema.Types.ObjectId, ref: 'product' },
    originalPrice: Number,
    calculatedPrice: Number
})

let priceModel = new mongoose.model('price' , priceSchema)

module.exports = priceModel