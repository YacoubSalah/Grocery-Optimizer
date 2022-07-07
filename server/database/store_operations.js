const storeFunctions = require("./store_operations_fn")
const productFunction = require("./product_operations_fn")
const miscFunctions = require("./misc_functions")
const storeModel = require("../models/store")
const productModel = require("../models/product")

async function addStore(storeData) {

    let feedback = {}
    feedback.message = "No feedback yet"
    feedback.status = true

    storeFunctions.validateStoreData(storeData, feedback)
    if (!feedback.status) {
        return feedback
    }

    storeFunctions.validateStoreDoesntAlreadyExists(storeData.name, storeData.location, feedback)
    if (!feedback.status) {
        return feedback
    }

    await storeFunctions.createAndSaveStoreModelInstance(storeData, feedback)

    return feedback

}

async function getAllStores() {
    let stores = await storeFunctions.getAllStores()
    return stores
}

async function getStoresNameList(filter) {

    let stores = []
    if (filter.productNameFilter && filter.storeLocationFilter) {
        stores = await storeFunctions.getStoresByProductNameAndStoreLocation(filter.productNameFilter, filter.storeLocationFilter)
    } else if (filter.productNameFilter) {
        stores = await storeFunctions.getStoresByProductName(filter.productNameFilter)
    } else if (filter.storeLocationFilter) {
        stores = await storeFunctions.getStoresByStoreLocation(filter.storeLocationFilter)
    } else {
        stores = await storeFunctions.getAllStores()
    }

    storesNameList = stores.map(s => s.name)
    storesNameList = miscFunctions.removeDuplication(storesNameList)

    return storesNameList
}

async function getStoresLocationList(filter) {

    let stores = []
    if (filter.productNameFilter && filter.storeNameFilter) {
        stores = await storeFunctions.getStoresByProductNameAndStoreName(filter.productNameFilter, filter.storeNameFilter)
    } else if (filter.productNameFilter) {
        stores = await storeFunctions.getStoresByProductName(filter.productNameFilter)
    } else if (filter.storeNameFilter) {
        stores = await storeFunctions.getStoresByStoreName(filter.storeNameFilter)
    } else {
        stores = await storeFunctions.getAllStores()
    }

    storesLocationList = stores.map(s => s.location)
    storesLocationList = miscFunctions.removeDuplication(storesLocationList)

    return storesLocationList
}

module.exports = { addStore, getAllStores, getStoresNameList, getStoresLocationList }