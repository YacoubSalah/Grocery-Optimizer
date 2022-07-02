let storeModel = require('../models/store')
let postModel = require('../models/post')

async function getStoreScoreById(id) {

    let storeData = await storeModel.findOne({ id: id })
        .exec()

    return storeData

}

async function getStoresList() {

    let storesList = await storeModel.find({})
        .exec()
    return storesList

}

async function addStore(storeData) {

    let store = new storeModel(storeData)
    let feedback = await store.save()
        .then(() => "New store were added")
        .catch(() => "Adding new store failed")

    return feedback

}

async function getPostById(id) {

    let postData = await postModel.findOne({ id: id })
        .exec()

    return postData

}

async function addPost(postData) {

    let post = new postModel(postData)
    let date = new Date()
    post.date = date
    let feedback = await post.save()
        .then(() => "New post were added")
        .catch(() => "Adding new post failed")

    return feedback

}



module.exports = { getStoreById, addStore, getPostById, addPost }