const productFunctions = require("./product_operations_fn")
const miscFunctions = require("./misc_functions")
const storeFunctions = require("./store_operations_fn")
const productModel = require("../models/product")

async function addProduct(productData) {

    let feedback = {}
    feedback.message = "No feedback yet"
    feedback.status = true

    productFunctions.validateProductData(productData, feedback)
    if (!feedback.status) {
        return feedback
    }

    await productFunctions.validateProductDoesntAlreadyExists(productData.name, feedback)
    if (!feedback.status) {
        return feedback
    }

    await productFunctions.createAndSaveProductModelInstance(productData, feedback)

    return feedback
}

async function addProductStore(productStoreData) {

    let feedback = {}
    feedback.message = "No Feedback yet"
    feedback.status = true

    productFunctions.validateProductStoreData(productStoreData, feedback)
    if (!feedback.status) {
        return feedback
    }

    let currentProduct = await productFunctions.validateProductExists(productStoreData.productName, feedback)
    if (!feedback.status) {
        return feedback
    }

    let currentStore = await storeFunctions.validateStoreExists(productStoreData.storeName, productStoreData.storeLocation, feedback)
    if (!feedback.status) {
        return feedback
    }

    productFunctions.validateProductStoreDoesntExist(currentProduct, currentStore, feedback)
    if (!feedback.status) {
        return feedback
    }

    await productFunctions.addProductStoreAndSave(currentProduct, currentStore.id, productStoreData.productInitialPrice, feedback)


    return feedback

}

async function addProductStorePost(postData) {
    let feedback = {}
    feedback.status = true
    feedback.message = "No Feedback yet"

    productFunctions.validatePostData(postData, feedback)
    if (!feedback.status) {
        return feedback
    }

    let currentProduct = await productFunctions.validateProductStoreExists(postData.productName, postData.storeName, postData.storeLocation, feedback)
    if (!feedback.status) {
        return feedback
    }

    let porductStorePost = productFunctions.createProductStorePost(postData)

    await productFunctions.addProductStorePostAndSave(porductStorePost, currentProduct, postData.storeName, postData.storeLocation, feedback)

    return feedback
}

async function getAllProducts() {
    let products = await productModel.find().exec()
    products = products.map(p => [{
        name: p.name,
        image: p.imageUrl,
        avergePrice: productFunctions.avergeProductPrice(p)
    }])
    return products
}

async function getProductsNameList(filter) {

    const storeNameFilter = filter.storeNameFilter
    const storeLocationFilter = filter.storeLocationFilter
    let products = []
    if (storeNameFilter && storeLocationFilter) {
        products = await productModel.find({
            stores: { $elemMatch: { "stores.store.name": storeNameFilter } },
            stores: { $elemMatch: { "stores.store.location": storeLocationFilter } }
        })
            .exec()
    } else if (storeNameFilter) {
        products = await productModel.find({
            stores: { $elemMatch: { "stores.store.name": storeNameFilter } }
        })
            .exec()
    } else if (storeLocationFilter) {
        products = await productModel.find({
            stores: { $elemMatch: { "stores.store.location": storeLocationFilter } }
        })
            .exec()
    } else {
        products = await productModel.find({})
            .exec()
    }

    productsNameList = products.map(p => p.name)
    productsNameList = miscFunctions.removeDuplication(productsNameList)

    return productsNameList
}

module.exports = { addProduct, addProductStore, addProductStorePost, getAllProducts, getProductsNameList }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 


async function getCategories() {
    let categories = {}
    let products = await productModel.find({}).exec()
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

async function getProductsByCategory(category) {
    let mainCategory = category.mainCategory
    let subCategory = category.subCategory
    let products
    if (subCategory) {
        products = await productModel.find({ mainCategory: mainCategory, subCategory: subCategory }).exec()
    } else {
        products = await productModel.find({ mainCategory: mainCategory }).exec()
    }
    if (products) {
        products = products.map(p => [{
            name: p.name,
            image: p.imageUrl,
            avergePrice: getAvergeProductPrice(p)
        }])
    } else {
        products = []
    }
    return products
}

async function productsNamesSearch(productName) {
    let products = await productModel.find({ 'name': { $regex: `${productName}.* ` } }).exec()
    products = products.map(p => [{
        name: p.name,
        image: p.imageUrl,
        avergePrice: getAvergeProductPrice(p)
    }])
    return products
}


 */