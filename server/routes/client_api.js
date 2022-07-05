const route = require("express")
const api = route()
const database = require("../database/database_user_operations")

api.post("/post", async function (req, res) {

    let postData = req.body
    let feedback = await database.addPost(postData)
    res.send(feedback)

})




module.exports = api