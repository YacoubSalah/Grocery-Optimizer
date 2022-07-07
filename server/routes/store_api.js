const route = require("express")
const storeOperations = require("../database/store_operations")

const api = route()

api.post("/store/", async function (req, res) {
    const storeData = req.body
    let feedback = await storeOperations.addStore(storeData)
    res.send(feedback)
})


module.exports = api