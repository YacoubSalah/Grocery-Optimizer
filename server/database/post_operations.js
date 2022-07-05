let storeModel = require('../models/store')
let productModel = require('../models/product')

async function addPost(postData) {

    let feedback = {}
    feedback.status = true
    feedback.message = "No Feedback yet"

    validatePostData(postData, feedback)
    if (!feedback.status) {
        return feedback
    }

    let productName = postData.productName,
        storeName = postData.storeName,
        storeLocation = postData.storeLocation

    let currentStore = await retriveCurrentStore(storeName, storeLocation, feedback)
    if (!feedback.status) {
        return feedback
    }

    console.log(currentStore)
    let currentProduct = await retriveCurrentProduct(productName, feedback)
    if (!feedback.status) {
        return feedback
    }

    let newPost = createPost(postData)

    let currentStoreId = currentStore.id
    currentProduct.stores.find(s => s.storeId === currentStoreId).posts.push(newPost)

    await saveProduct(currentProduct, feedback)

    return feedback.message

}

function validatePostData(postData, feedback) {
    if (postData.productName && postData.storeName && postData.storeLocation) {
        feedback.message = "Data is valid"
        return true
    } else {
        feedback.message = `Missing or invalid mandatory data, request body should be:
                    productName: String,
                    storeName: String,
                    storeLocation: String`
        feedback.status = false
        return false
    }
}

async function retriveCurrentStore(storeName, storeLocation, feedback) {
    {
        let currentStore = await storeModel.findOne({ name: storeName, location: storeLocation }).exec()
        if (currentStore) {
            feedback.message = 'Current store was found'
            return currentStore
        } else {
            feedback.message = `Store with the name ${storeName} in ${storeLocation} doesn't exist`
            feedback.status = false
        }
    }
}

async function retriveCurrentProduct(productName, feedback) {
    let currentProduct = await productModel.findOne({ name: productName }).exec()
    if (currentProduct) {
        feedback.message = `Product was found`
        return currentProduct
    } else {
        feedback.message = `Product with the name ${productName} doesn't exist`
        feedback.status = false
        return feedback
    }
}

function createPost(postData) {
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

async function saveProduct(currentProduct, feedback) {
    await currentProduct.save()
        .then(() => {
            feedback.message = "Post was added to product store"
        })
        .catch((err) => {
            feedback.message = "Adding post to product store failed"
            feedback.status = false
        })
}

module.exports = { addPost }