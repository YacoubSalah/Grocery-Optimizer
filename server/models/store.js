const mongoose = require('mongoose')

let StoreSchema = new mongoose.Schema({
    name: String,
    location: String,
    score: {type: Number , default : 0},
    countScore:{type: Number , default : 0}
})

let storeModel = mongoose.model('store' , StoreSchema)

module.exports = storeModel