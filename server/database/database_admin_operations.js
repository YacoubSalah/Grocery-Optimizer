let storeModel = require('../models/store')
let productModel = require('../models/product')

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

// 1. Find product by product_name
// 2. Find store by store_name
// 3. Check if product exists in store
// 4. [doesn't exist] Create ProductStoreSchema (currentStoreId, Price metrics)
// 5. Add to currentProduct.stores array
// 6. Update model
async function addStoreToProduct(storeProductData) {

    let feedback = {}
    feedback.message = "No Feedback yet"
    feedback.status = true

    validateStoreProductData(storeProductData, feedback)
    if (!feedback.status) {
        return feedback
    }

    let productName = storeProductData.productName,
        productInitialPrice = storeProductData.productInitialPrice,
        storeName = storeProductData.storeName,
        storeLocation = storeProductData.storeLocation

    let currentProduct = await productModel.findOne({ name: productName }, {stores: 1}).lean()
    if (!currentProduct) {
        feedback.message = `Product with the name ${productName} doesn't exist`
        feedback.status = false
        return feedback
    }

    let currentStore = await storeModel.findOne({ name: storeName, location: storeLocation }).exec()
    if (!currentStore) {
        feedback.message = `Store with the name ${storeName} doesn't exist`
        feedback.status = false
        return feedback
    }

    let currentStoreId = currentStore.id
    if (currentProduct.stores.includes(s => {
         return s.storeId === currentStoreId
        })) {
        feedback.message = `Store ${storeName} already exists in ${productName}`
        feedback.status = false
        return feedback
    }
   
    let newStoreProduct = {
        storeId: currentStoreId,
        initialPrice: productInitialPrice,
        calculatedPrice: 0,
        posts: []
    }
    currentProduct.stores.push(newStoreProduct)

    await currentProduct.save()
        .then(() => {
            feedback.message = "Product was added to store"
        })
        .catch(() => {
            feedback.message = "Adding product to store failed"
            feedback.status = false
        })

    return feedback

}

function validateStoreProductData(storeProductData, feedback) {
    if (storeProductData.productName && typeof (storeProductData.productInitialPrice) == 'number' && storeProductData.storeName && storeProductData.storeLocation) {
        feedback.message = "Data is valid"
        feedback.status = true
    } else {
        feedback.message = `Missing or invalid mandatory data, request body should be:
                    productName: String,
                    productInitialPrice: Number,
                    storeName: String,
                    storeLocation: String`
        feedback.status = false
    }
}

module.exports = { addStore, addProduct, addStoreToProduct: addStoreToProduct }