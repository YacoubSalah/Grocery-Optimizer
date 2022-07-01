const route = require("express")
const dbTestingAPI = route()
const database = require("../database/database")

dbTestingAPI.get("/store/:id", async function (req, res) {
    let storeId = req.params.id
    let storedata = await database.getStoreById(storeId)
    if (storedata) {
        let store ={}
        store.id = storedata.id
        store.name = storedata.name
        store.location = storedata.location
        store.score = storedata.score
        res.send(store)
    } else {
        res.status(404).send(`Store with store ID: ${storeId} was not found`)
    }
})

dbTestingAPI.post("/store", async function (req, res) {
    let storeData = req.body
    let feedback = await database.addStore(storeData)
    res.send(feedback)
})

module.exports = dbTestingAPI