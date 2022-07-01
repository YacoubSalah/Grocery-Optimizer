const mongoose = require('mongoose')

let StoreSchema = new mongoose.Schema({
    id: String,
    name: String,
    location: String,
    score: {type: Number , default : 0}
})

let storeModel = mongoose.model('Store' , StoreSchema)

module.exports = storeModel