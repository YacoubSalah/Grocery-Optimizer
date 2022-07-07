const storeModel = require("../models/store")
const productModel = require("../models/product")

function validateStoreData(storeData, feedback) {
    if (!storeData.name || !storeData.location) {
        feedback.message = `
            Missing mandatory data request.
                Request body structure:
                *name	//Mandatory
                *location		//Optional`
        feedback.status = false
    } else {
        feedback.message = `Data is valid`
    }
}

async function validateStoreDoesntAlreadyExists(name, location, feedback) {
    let store = await storeModel.findOne({ name: name, location: location }).exec()
    if (store) {
        feedback.message = `Product with the name: ${name} and location: ${location} exists in the database, please chose a different name`
        feedback.status = false
    } else {
        feedback.message = `Product with the name: ${name} and location: ${location} doesn't exist in database`
    }
}

async function createAndSaveStoreModelInstance(storeData, feedback) {
    let store = new storeModel(storeData)
    await store.save()
        .then(() => {
            feedback.message = "store was added"
        })
        .catch(() => {
            feedback.message = "Adding store failed"
        })
}

async function validateStoreExists(name, location, feedback) {
    let store = await storeModel.findOne({ name: name, location: location }).exec()
    if (store) {
        feedback.message = `Product with the name: ${name} and location: ${location} exists in the database, please chose a different name`
    } else {
        feedback.message = `Product with the name: ${name} and location: ${location} doesn't exist in database`
        feedback.status = false
    }
    return store
}

async function getStoresByProductNameAndStoreLocation(productNameFilter, storeLocationFilter) {
    let product = await productModel.findOne({
        name: productNameFilter,
        stores: { $elemMatch: { "stores.store.location": storeLocationFilter } }
    })
        .populate('stores.store')
        .exec()
    let stores = product.stores.filter(s => s.store.location === storeLocationFilter).map(s => s.store)
    return stores
}

async function getStoresByProductName(productNameFilter) {
    let product = await productModel.findOne({
        name: productNameFilter
    })
        .populate('stores.store')
        .exec()
    let stores = product.stores.map(s => s.store)
    return stores
}

async function getStoresByStoreLocation(storeLocationFilter) {
    let stores = await storeModel.find({
        location: storeLocationFilter
    })
        .exec()
    return stores
}

async function getAllStores() {
    let stores = await storeModel.find({})
        .exec()
    return stores
}

async function getStoresByProductNameAndStoreName(productNameFilter, storeNameFilter) {
    let product = await productModel.findOne({
        name: productNameFilter,
        stores: { $elemMatch: { "stores.store.name": storeNameFilter } }
    })
        .populate('stores.store')
        .exec()
    let stores = product.stores.filter(s => s.store.name === storeNameFilter).map(s => s.store)
    return stores
}

async function getStoresByStoreName(storeNameFilter) {
    let stores = await storeModel.find({
        name: storeNameFilter
    })
        .exec()
    return stores
}

module.exports = {
    validateStoreData,
    validateStoreDoesntAlreadyExists,
    createAndSaveStoreModelInstance,
    validateStoreExists,
    getStoresByProductNameAndStoreLocation,
    getStoresByProductName,
    getStoresByStoreLocation,
    getAllStores,
    getStoresByProductNameAndStoreName,
    getStoresByStoreName
}