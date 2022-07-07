const productModel = require("../models/product")

function validateProductData(productData, feedback) {
    if (!productData.name) {
        feedback.message = `
            Missing mandatory data request.
                Request body structure:
                *productName	//Mandatory
                *imageUrl		//Optional
                *description	//Optional
                *mainCategory	//Optional
                *subCategory	//Optional`
        feedback.status = false
    } else {
        feedback.message = `Data is valid`
    }
}

async function validateProductDoesntAlreadyExists(name, feedback) {
    let product = await productModel.findOne({ name: name }).exec()
    if (product) {
        feedback.message = `Product with the name: ${name} exists in the database, please chose a different name`
        feedback.status = false
    } else {
        feedback.message = `Product with the name: ${name} doesn't exist in database`
    }
}

async function createAndSaveProductModelInstance(productData, feedback) {
    let product = new productModel(productData)
    await product.save()
        .then(() => {
            feedback.message = "Product was added"
        })
        .catch(() => {
            feedback.message = "Adding product failed"
        })
}

function validateProductStoreData(productStoreData, feedback) {
    if (productStoreData.productName && typeof (productStoreData.productInitialPrice) == 'number' && productStoreData.storeName && productStoreData.storeLocation) {
        feedback.message = "Data is valid"
    } else {
        feedback.message = `Missing or invalid mandatory data, request body should be:
                    productName: String,
                    productInitialPrice: Number,
                    storeName: String,
                    storeLocation: String`
        feedback.status = false
    }
}

async function validateProductExists(name, feedback) {
    let product = await productModel.findOne({ name: name })
        .populate('stores.store')
        .exec()
    if (product) {
        feedback.message = `Product with the name: ${name} exists in the database, please chose a different name`
    } else {
        feedback.message = `Product with the name: ${name} doesn't exist in database`
        feedback.status = false
    }
    return product
}

function validateProductStoreDoesntExist(product, store, feedback) {
    let productStore = product.stores.find(s => s.store.id === store.id)
    if (productStore) {
        feedback.message = `${store.name} store of ${store.location} already exists in ${product.name} product stores`
        feedback.status = false
        return feedback
    }
}

async function addProductStoreAndSave(product, storeId, initialPrice, feedback) {
    let newStore = {
        store: storeId,
        initialPrice: initialPrice,
    }
    product.stores.push(newStore)

    await product.save()
        .then(() => {
            feedback.message = "Product was added to store"
        })
        .catch(() => {
            feedback.message = "Adding product to store failed"
            feedback.status = false
        })
}

function validatePostData(postData, feedback) {
    if (postData.productName && postData.storeName && postData.storeLocation) {
        feedback.message = "Data is valid"
    } else {
        feedback.message = `
            Missing mandatory data request.
                Request body structure:
                    *productName	//Mandatory
                    *StoreName		//Mandatory
                    *StoreLocation	//Mandatory
                    *price	        //Optional
                    *score	        //Optional
                    *note           //Optional
                    *imageUrl       //Optional`
        feedback.status = false
    }
}

async function validateProductStoreExists(productName, storeName, storeLocation, feedback) {
    let product = await productModel.findOne({ name: productName, stores: { $elemMatch: { "stores.store.name": storeName } }, stores: { $elemMatch: { "stores.store.location": storeLocation } } })
        .populate('stores.store')
        .exec()
    if (product) {
        feedback.message = `productStore exists`
        return product

    } else {
        feedback.message = `Product: ${productName} doesn't have a store with name: ${storeName} and location: ${storeLocation}`
        feedback.status = false
    }
}

function createProductStorePost(postData) {
    let newPost = {}
    if (postData.price) {
        newPost.price = postData.price
    }
    if (postData.score) {
        newPost.score = postData.score
    }
    if (postData.imageUrl) {
        newPost.imageUrl = postData.imageUrl
    }
    if (postData.note) {
        newPost.note = postData.note
    }
    return newPost
}

async function addProductStorePostAndSave(productStorePost, product, storeName, storeLocation, feedback) {

    let productStore = product.stores.find(s => {
        return s.store.name === storeName && s.store.location === storeLocation
    })

    productStore.posts.push(productStorePost)

    await product.save()
        .then(() => {
            feedback.message = "Product Store post was added"
        })
        .catch((err) => {
            feedback.message = "Product store post was not added"
            feedback.status = false
        })
}

function avergeProductPrice(product) {
    let stores = product.stores
    sumPrices = 0
    index = 0
    if (stores.length === 0)
        return null
    for (index = 0; index < stores.length; index++) {
        sumPrices += stores[index].initialPrice
    }
    return sumPrices / index
}

module.exports = {
    validateProductData,
    validateProductDoesntAlreadyExists,
    createAndSaveProductModelInstance,
    validateProductStoreData,
    validateProductExists,
    validateProductStoreDoesntExist,
    addProductStoreAndSave,
    validatePostData,
    validateProductStoreExists,
    createProductStorePost,
    addProductStorePostAndSave,
    avergeProductPrice
}