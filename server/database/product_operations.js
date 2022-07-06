const productModel = require("../models/product")
const storeModel = require("../models/store")

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
    let products = []
    if (category.mainCategory) {
        products = await productModel.find({ mainCategory: category.mainCategory }).exec()
    } else if (category.subCategory) {
        products = await productModel.find({ subCategory: category.subCategory }).exec()
    }
        return products
}

async function productsNamesSearch(productName) {
        let products = await productModel.find({ 'name': {$regex:`${productName}.*`} }).exec()
        products = products.map(p =>[{
            name:p.name,
            image:p.imageUrl,
            avergePrice:getAvergeProductPrice(p)
        }])
        return products
}

function getAvergeProductPrice(product) {
    let stores = product.stores
    sumPrices = 0
    index = 0
    if(stores.length === 0)
        return null
    for (index = 0; index < stores.length; index++) {
        sumPrices += stores[index].initialPrice
    }
    return sumPrices/index
}

module.exports = { getProductsNamesList, getCategories , getProductsByCategory , productsNamesSearch }