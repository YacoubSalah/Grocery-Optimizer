const productModel = require("../models/product")
const storeModel = require("../models/store")

async function getProductsNamesList(filter) {

    let stores = []
    if (filter.storeNameFilter || filter.storeLocationFilter) {
        if (filter.storeNameFilter && filter.storeLocationFIlter) {
            stores = await storeModel.find({ name: filter.storeNameFilter, location: filter.storeLocationFilter }).exec()
        } else {
            if (filter.storeNameFilter) {
                stores = await storeModel.find({ name: filter.storeNameFilter }).exec()
            }
            if (filter.storeLocationFilter) {
                stores = await storeModel.find({ location: filter.storeLocationFilter }).exec()
            }
        }
    }

    let storesId = stores.map(s => s.id)

    let productsNamesList = []
    for (let storeId of storesId) {
        let newProducts = await productModel.find({ 'stores.storeId': storeId }).exec()
        let newProductsNames = newProducts.map(p => p.name)
        productsNamesList = productsNamesList.concat(newProductsNames)
    }

    return productsNamesList

}

module.exports = { getProductsNamesList }