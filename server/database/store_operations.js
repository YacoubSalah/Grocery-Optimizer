const storeModel = require("../models/store")
const productModel = require("../models/product")

async function getStoresNamesList(filter) {

    let storesList = []

    if (filter.storeLocationFilter) {
        storesList = await storeModel.find({ location: filter.storeLocationFilter }).exec()
    } else {
        storesList = await storeModel.find({}).exec()
    }

    let StoresNameList = []

    if (filter.productNameFilter) {
        for (let store of storesList) {
            let product = await productModel.findOne({ name: filter.productNameFilter, 'stores.storeId': store.id }).exec()
            if (product) {
                StoresNameList.push(store.name)
            }
        }
    } else {
        StoresNameList = storesList.map(s => s.name)
    }

    return StoresNameList
}

async function getStoresLocationsList(filter) {

    let storesList = []

    if (filter.storeNameFilter) {
        storesList = await storeModel.find({ name: filter.storeNameFilter }).exec()
    } else {
        storesList = await storeModel.find({}).exec()
    }

    let StoresLocationList = []

    if (filter.productNameFilter) {
        for (let store of storesList) {
            let product = await productModel.findOne({ name: filter.productNameFilter, 'stores.storeId': store.id }).exec()
            if (product) {
                StoresLocationList.push(store.location)
            }
        }
    } else {
        StoresLocationList = storesList.map(s => s.location)
    }

    return StoresLocationList
}

module.exports = { getStoresNamesList, getStoresLocationsList }