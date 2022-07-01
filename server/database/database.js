let storeModel = require('../models/store')

async function getStoreById(id) {

    let storeData = await storeModel.findOne({ id: id })
        .exec()

    return storeData

}

async function addStore(storeData) {

    let store = new storeModel(storeData)
    let feedback = await store.save()
        .then(() => "New store were added")
        .catch(() => "Adding new store failed")

    return feedback

}

module.exports = { getStoreById, addStore }