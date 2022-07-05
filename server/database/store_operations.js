const storeModel = require("../models/store")

async function getStoresNamesList(filter) {

    let stores = await storeModel.find().exec()
    stores = stores.map(s => {
        return ({ storeName: s.name, storeLocation: s.location })
    })

    let storesNamesList = []
    return stores

}

async function getStoresLocationsList(filter){

    let storesLocationsList = []
    return stores
}



module.exports = { getStoresNamesList , getStoresLocationsList }