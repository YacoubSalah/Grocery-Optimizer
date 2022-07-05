const storeModel = require("../models/store")

async function getStores() {

    let stores = await storeModel.find().exec()
    stores = stores.map(s => {
        return ({ storeName: s.name, storeLocation: s.location })
    })
    return stores

}



module.exports = { getStores }