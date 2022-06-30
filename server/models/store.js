const mongoose = require('mongoose')

let StoreSchema = new mongoose.Schema({
    storeId: String,
    storeName: String,
    storeLocation: String,
    StoreScore: {type: Number , default : 0}
})

let storeModel = mongoose.model('Store' , StoreSchema)

module.exports = storeModel