const productModel = require("../models/product")

async function getProducts() {

    let products = await productModel.find().exec()
    products = products.map(p => {
        return ({ name: p.name })
    })
    return products

}

module.exports = { getProducts }