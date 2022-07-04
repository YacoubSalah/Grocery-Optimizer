let storeModel = require('../models/store')
let productModel = require('../models/product')
let priceModel = require('../models/price')

async function addStore(storeData) {

    let store = new storeModel(storeData)
    let feedback = await store.save()
        .then(() => "New store were added")
        .catch(() => "Adding new store failed")

    return feedback

}

async function addProduct(productData) {

    let feedback = ""
    if (productData.name) {
        let productName = productData.name
        let currentProduct = await productModel.findOne({ name: productName }).exec()
        if (currentProduct) {
            feedback = `Product with the name ${productName} already exists, please chose a different name`
            return feedback
        }
        let product = new productModel(productData)
        let feedback = await product.save()
            .then(() => "Product was added")
            .catch(() => "Adding product failed")
        return feedback
    } else {
        feedback = `Missing mandatory data, request should have at least : name.
        Optional data: description , imageUrl, mainCategory , subCategory`
        return feedback
    }

}

async function refStoreToProduct(storeProductData) {

    let productName = storeProductData.productName
    let storeName = storeProductData.storeName
    let storeLocation = storeProductData.storeLocation
    let feedback = ""

    let currentProduct = await productModel.findOne({ name: productName }).exec()
    if (!currentProduct) {
        feedback = `Product with the name ${productName} doesn't exist`
        return feedback
    }

    let currentStore = await storeModel.findOne({ name: storeName, location: storeLocation }).exec()
    if (!currentStore) {
        feedback = `Store with the name ${storeName} doesn't exist`
    }

    currentProduct.stores.push(currentProduct.id)
    feedback = await currentProduct.save()
        .then(() => "Product was added to store")
        .catch(() => "Adding product to store failed")

    return feedback

}

async function addProductPrice(priceData) {
    let feedback
    let productName = priceData.productName
    let storeName = priceData.storeName
    let storeLocation = priceData.storeLocation
    let currentStore = storeModel.find({ name: storeName, location: storeLocation }).exec()
    if (!currentStore) {
        feedback = `Store doesn't exists`
        return feedback
    }
    let currentProduct = productModel.find({ name: productName }).exec()
    if (!currentProduct) {
        feedback = `Product doesn't exists`
        return feedback
    } else {
        if (!currentProduct.stores.includes(store._id)) {
            feedback = `Product is not included in the specified store, please add the store to the products list of stores first`
            return feedback
        }
    }
    let newPrice = new priceModel(priceData)
    feedback = newPrice.save()
        .then(() => `Price was saved`)
        .catch(() => `Failed to save price`)
    return feedback

}

module.exports = { addStore, addProduct, refStoreToProduct: refStoreToProduct }