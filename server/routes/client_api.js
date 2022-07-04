const route = require("express")
const api = route()
const database = require("../database/database_user_operations")

/* api.get("/store/:id", async function (req, res) {

    let storeId = req.params.id
    let storedata = await database.getStoreById(storeId)
    if (storedata) {
        let store = {}
        store.name = storedata.name
        store.location = storedata.location
        store.score = storedata.score
        res.send(store)
    } else {
        res.status(404).send(`Store with store ID: ${storeId} was not found`)
    }

}) */

api.post("/post", async function (req, res) {

    let postData = req.body
    let feedback = await database.addPost(postData)
    res.send(feedback)

})

/* api.get("/post/:id", async function (req, res) {

    let postId = req.params.id
    let postData = await database.getStoreById(postId)
    if (postData) {
        let post = {}
        id = postData.name
        userID = postData.location
        itemID =
            post.score = postData.score
        res.send(post)
    } else {
        res.status(404).send(`Post with post ID: ${postId} was not found`)
    }

}) */




module.exports = api