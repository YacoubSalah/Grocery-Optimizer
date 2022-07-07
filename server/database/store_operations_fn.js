const storeModel = require("../models/store")

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

module.exports = {
    validateStoreData,
    validateStoreDoesntAlreadyExists,
    createAndSaveStoreModelInstance,
    validateStoreExists
}