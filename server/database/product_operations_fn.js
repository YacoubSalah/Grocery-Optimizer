const productModel = require("../models/product")
const storeModel = require("../models/store")

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

async function getProductStore(productName, storeName, storeLocation) {
    let store = await storeModel.findOne({ name: storeName, location: storeLocation }).exec()
    let storeId = store.id
    let product = await productModel.findOne({
        name: productName,
        stores: { $elemMatch: { store: storeId } }
    })
        .populate('stores.store')
        .exec()
    return product
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

//need cleaning
async function getProductsByStoreNameAndLocation(storeNameFilter, storeLocationFilter) {
    let stores = await storeModel.find({ name: storeNameFilter, location: storeLocationFilter }).exec()
    let storesId = stores.map(s => s.id)
    let products = await productModel.find({
        stores: { $elemMatch: { store: { $in: storesId } } }
    })
        .exec()
    return products
}

//need cleaning
async function getProductsByStoreName(storeNameFilter) {
    let stores = await storeModel.find({ name: storeNameFilter }).exec()
    let storesId = stores.map(s => s.id)
    let products = await productModel.find({
        stores: { $elemMatch: { store: { $in: storesId } } }
    })
        .exec()
    return products
}

async function getProductsNyStoreLocation(storeLocationFilter) {
    let products = await productModel.find({
        stores: { $elemMatch: { "stores.store.location": storeLocationFilter } }
    })
        .exec()
    return products
}

async function getAllProducts() {
    let products = await productModel.find({})
        .populate('stores.store')
        .exec()
    return products
}

function prepareCategoryObject(products) {
    let categories = {}
    for (let product of products) {
        let mainCategory = product.mainCategory
        let subCategory = product.subCategory
        if (!categories[mainCategory]) {
            categories[mainCategory] = [subCategory]
        } else {
            if (!categories[mainCategory].includes(subCategory)) {
                categories[mainCategory].push(subCategory)
            }
        }
    }
    return categories
}

async function getProductsByCategory(mainCategory, subCategory) {
    let products
    if (subCategory) {
        products = await productModel.find({ mainCategory: mainCategory, subCategory: subCategory }).exec()
    } else {
        products = await productModel.find({ mainCategory: mainCategory }).exec()
    }
    return products
}

async function getProductsBySearchWord(searchWord) {
    let products = await productModel.find({ 'name': { $regex: `${searchWord}.*` } })
        .exec()
    return products
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
    getProductStore,
    createProductStorePost,
    addProductStorePostAndSave,
    avergeProductPrice,
    getProductsByStoreNameAndLocation,
    getProductsByStoreName,
    getProductsNyStoreLocation,
    getAllProducts,
    prepareCategoryObject,
    getProductsByCategory,
    getProductsBySearchWord
}