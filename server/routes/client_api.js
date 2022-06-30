const route = require("express")
const dbTestingAPI = route()
const database = require("../database/database")

dbTestingAPI.get("/store/:id", async function (req, res) {
    let storeId = req.params.id
    let store = await database.getStoreById(storeId)
    //format store the way we need it
    res.send(store)
})

dbTestingAPI.post("/store", async function (req, res) {
    let storeData = req.body
    let feedback = await database.addStore(storeData)
    res.send(feedback)
})

module.exports = dbTestingAPI