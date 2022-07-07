const productFunctions = require("./product_operations_fn")
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

    let currentProduct = await productFunctions.validateProductStoreExists(postData.productName , postData.storeName , postData.storeLocation, feedback)
    if (!feedback.status) {
        return feedback
    }

    let porductStorePost = productFunctions.createProductStorePost(postData)
    
    await productFunctions.addProductStorePostAndSave(porductStorePost, currentProduct , postData.storeName , postData.storeLocation, feedback)

    return feedback
}

module.exports = { addProduct, addProductStore , addProductStorePost }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 
async function getProductsNamesList(filter) {

    let stores = []
    let productsNamesList = []
    if (filter.storeNameFilter || filter.storeLocationFilter) {
        if (filter.storeNameFilter && filter.storeLocationFilter) {
            stores = await storeModel.find({ name: filter.storeNameFilter, location: filter.storeLocationFilter }).exec()
        } else {
            if (filter.storeNameFilter) {
                stores = await storeModel.find({ name: filter.storeNameFilter }).exec()
            }
            if (filter.storeLocationFilter) {
                stores = await storeModel.find({ location: filter.storeLocationFilter }).exec()
            }
        }
        let storesId = stores.map(s => s.id)
        for (let storeId of storesId) {
            let newProducts = await productModel.find({ 'stores.storeId': storeId }).exec()
            let newProductsNames = newProducts.map(p => p.name)
            productsNamesList = productsNamesList.concat(newProductsNames)
        }
    } else {
        let newProducts = await productModel.find({}).exec()
        productsNamesList = newProducts.map(p => p.name)
    }

    let productSet = new Set()
    for (let product of productsNamesList) {
        productSet.add(product)
    }
    productsNamesList = Array.from(productSet)

    return productsNamesList
}

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

async function getAllProducts() {
    let products = await productModel.find().exec()
    products = products.map(p => [{
        name: p.name,
        image: p.imageUrl,
        avergePrice: getAvergeProductPrice(p)
    }])
    return products
}

function getAvergeProductPrice(product) {
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
 */