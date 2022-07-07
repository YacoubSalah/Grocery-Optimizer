const productFunctions = require("./product_operations_fn")
const miscFunctions = require("./misc_functions")
const storeFunctions = require("./store_operations_fn")

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

    let products = await productFunctions.getAllProducts()

    products = products.map(p => [{
        name: p.name,
        image: p.imageUrl,
        avergePrice: productFunctions.avergeProductPrice(p)
    }])

    return products
}

async function getProductsNameList(filter) {

    let products = []

    if (filter.storeNameFilter && filter.storeLocationFilter) {
        products = await productFunctions.getProductsByStoreNameAndLocation(filter.storeNameFilter, filter.storeLocationFilter)
    } else if (filter.storeNameFilter) {
        products = await productFunctions.getProductsByStoreName(filter.storeNameFilter)
    } else if (filter.storeLocationFilter) {
        products = await productFunctions.getProductsNyStoreLocation(filter.storeLocationFilter)
    } else {
        products = await productFunctions.getAllProducts()
    }

    productsNameList = products.map(p => p.name)

    productsNameList = miscFunctions.removeDuplication(productsNameList)

    return productsNameList

}

async function getCategories() {

    let products = await productFunctions.getAllProducts()

    let categories = productFunctions.prepareCategoryObject(products)

    return categories

}

async function getProductsByCategory(category) {

    let products = await productFunctions.getProductsByCategory(category.mainCategory, category.subCategory)

    if (products) {
        products = products.map(p => [{
            name: p.name,
            image: p.imageUrl,
            avergePrice: productFunctions.avergeProductPrice(p)
        }])
    } else {
        products = []
    }

    return products

}

async function productsSearch(searchWord) {

    let products = await productFunctions.getProductsBySearchWord(searchWord)

    products = products.map(p => [{
        name: p.name,
        image: p.imageUrl,
        avergePrice: productFunctions.avergeProductPrice(p)
    }])

    return products
}

module.exports = {
    addProduct,
    addProductStore,
    addProductStorePost,
    getAllProducts,
    getProductsNameList,
    getCategories,
    getProductsByCategory,
    productsSearch
}