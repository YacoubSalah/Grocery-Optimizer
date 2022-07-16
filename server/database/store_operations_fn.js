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
    let stores = await storeModel.find({ location: storeLocationFilter }).exec()
    let storesId = stores.map(s => s.id)
    let product = await productModel.findOne({
        name: productNameFilter,
        stores: { $elemMatch: { store: { $in: storesId } } }
    })
        .populate('stores.store')
        .exec()
    let resultingStores = product.stores.filter(s => s.store.location === storeLocationFilter).map(s => s.store)
    return resultingStores
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

//need cleaning
async function getStoresByProductNameAndStoreName(productNameFilter, storeNameFilter) {
    let stores = await storeModel.find({ name: storeNameFilter }).exec()
    let storesId = stores.map(s => s.id)
    let product = await productModel.findOne({
        name: productNameFilter,
        stores: { $elemMatch: { store: { $in: storesId } } }
    })
        .populate('stores.store')
        .exec()
    let resultingStores = product.stores.filter(s => s.store.name === storeNameFilter).map(s => s.store)
    return resultingStores
}

async function getStoresByStoreName(storeNameFilter) {
    let stores = await storeModel.find({
        name: storeNameFilter
    })
        .exec()
    return stores
}

async function updateScoreStore(storeName,locationStore,score){
    let store = await storeModel.findOne({name:storeName,location:locationStore }).exec()
    store.score = (store.score*store.countScore + score)/(store.countScore+1)
    store.countScore += 1
    // let store = new storeModel(storeData)
    await store.save()

}

async function getFilteredStoresByNameOrLocation(storeName , locationName){

    let stores = []

    if( storeName !== 'null' && locationName !== 'null' ){
        stores = await storeModel.find({ location: locationName , name: storeName }).exec()
    }else if(storeName !== 'null'){
        stores = await storeModel.find({ name: storeName }).exec()
    }else if(locationName !== 'null'){
        stores = await storeModel.find({ location: locationName }).exec()
    }
    
    return stores
}
module.exports = {
    validateStoreData,
    getFilteredStoresByNameOrLocation,
    validateStoreDoesntAlreadyExists,
    createAndSaveStoreModelInstance,
    validateStoreExists,
    getStoresByProductNameAndStoreLocation,
    getStoresByProductName,
    getStoresByStoreLocation,
    getAllStores,
    getStoresByProductNameAndStoreName,
    getStoresByStoreName,
    updateScoreStore
}