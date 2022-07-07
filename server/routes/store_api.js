const route = require("express")
const storeOperations = require("../database/store_operations")

const api = route()

api.post("/store/", async function (req, res) {
    const storeData = req.body
    let feedback = await storeOperations.addStore(storeData)
    res.send(feedback)
})

module.exports = api

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

api.get("/storesNamesList/", async function (req, res) {
    let filter = req.query
    let stores = await storeOperations.getStoresNamesList(filter)
    res.send(stores)
})

api.get("/storesLocationsList", async function (req, res) {
    let filter = req.query
    let stores = await storeOperations.getStoresLocationsList(filter)
    res.send(stores)
})

*/