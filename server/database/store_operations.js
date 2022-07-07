const storeFunctions = require("./store_operations_fn")
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

async function getAllStores(){
    let stores = await storeModel.find({}).exec()
    return stores
}

async function getStoresNameList(filter) {

    const productNameFilter = filter.productNameFilter
    const storeLocationFilter = filter.storeLocationFilter
    let stores = []
    if (productNameFilter && storeLocationFilter) {
        product = await productModel.findOne({
            name: productNameFilter,
            stores: { $elemMatch: { "stores.store.location": storeLocationFilter } }
        })
            .populate('stores.store')
            .exec()
        stores = product.stores.filter(s => s.store.location === storeLocationFilter).map(s => s.store)
    } else if (productNameFilter) {
        product= await productModel.findOne({
            name: productNameFilter
        })
            .populate('stores.store')
            .exec()
        stores = product.stores.map(s => s.store)
    } else if (storeLocationFilter) {
        stores = await storeModel.find({
            location: storeLocationFilter
        })
            .exec()
    } else {
        stores = await storeModel.find({})
            .exec()
    }

    storesNameList = stores.map(s => s.name)
    storesNameList = miscFunctions.removeDuplication(storesNameList)

    return storesNameList
}

async function getStoresLocationList(filter) {

    const productNameFilter = filter.productNameFilter
    const storeNameFilter = filter.storeNameFilter
    let stores = []
    if (productNameFilter && storeNameFilter) {
        product = await productModel.findOne({
            name: productNameFilter,
            stores: { $elemMatch: { "stores.store.name": storeNameFilter } }
        })
            .populate('stores.store')
            .exec()
        stores = product.stores.filter(s => s.store.name === storeNameFilter).map(s => s.store)
    } else if (productNameFilter) {
        product= await productModel.findOne({
            name: productNameFilter
        })
            .populate('stores.store')
            .exec()
        stores = product.stores.map(s => s.store)
    } else if (storeNameFilter) {
        stores = await storeModel.find({
            name: storeNameFilter
        })
            .exec()
    } else {
        stores = await storeModel.find({})
            .exec()
    }

    storesLocationList = stores.map(s => s.location)
    storesLocationList = miscFunctions.removeDuplication(storesLocationList)

    return storesLocationList
}

module.exports = { addStore, getAllStores, getStoresNameList, getStoresLocationList }