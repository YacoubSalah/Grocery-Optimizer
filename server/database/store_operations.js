const storeModel = require("../models/store")
const productModel = require("../models/product")

async function getStoresNamesList(filter) {
    let storesList = []
    if (filter.storeLocationFilter) {
        storesList = await storeModel.find({ location: filter.storeLocationFilter }).exec()
    } else {
        storesList = await storeModel.find({}).exec()
    }

    let storesNameList = []

    if (filter.productNameFilter) {
        for (let store of storesList) {
            let product = await productModel.findOne({ name: filter.productNameFilter, 'stores.storeId': store.id }).exec()
            if (product) {
                storesNameList.push(store.name)
            }
        }
    } else {
        storesNameList = storesList.map(s => s.name)
    }

    let storeSet = new Set()
    for (let store of storesNameList) {
        storeSet.add(store)
    }
    storesNameList = Array.from(storeSet)

    return storesNameList
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

    let storeSet = new Set()
    for (let store of StoresLocationList) {
        storeSet.add(store)
    }
    StoresLocationList = Array.from(storeSet)

    return StoresLocationList
}

module.exports = { getStoresNamesList, getStoresLocationsList }