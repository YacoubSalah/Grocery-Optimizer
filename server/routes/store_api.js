const route = require("express")
const storeOperations = require("../database/store_operations")

const api = route()

api.post("/store/", async function (req, res) {
    const storeData = req.body
    let feedback = await storeOperations.addStore(storeData)
    res.send(feedback)
})

api.get("/allStores" , async function (req ,res){
    let stores = await storeOperations.getAllStores()
    res.send(stores)
})

api.get("/storesNameList/", async function (req, res) {
    const filter = req.query
    let storesNameList = await storeOperations.getStoresNameList(filter)
    res.send(storesNameList)
})

api.get("/storesLocationList", async function (req, res) {
    const filter = req.query
    let storesLocationList = await storeOperations.getStoresLocationList(filter)
    res.send(storesLocationList)
})

api.get("/storesfiltered", async function (req, res) {
    const filter = req.query
    console.log(filter)
    res.end()
})

module.exports = api