let storeModel = require('../models/store')

function getStoreById(id) {

    storeModel.findOne({ 'storeId': id }, function (err, res) {
        console.log(res)
        return res
    })

}

async function addStore(storeData) {

    let store = new storeModel(storeData)
    let feedback = await store.save()
        .then(() => "New store were added")
        .catch(() => "Adding new store failed")

    return feedback

}

module.exports = { getStoreById, addStore }