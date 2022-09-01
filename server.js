const mongoose = require("mongoose")
const express = require("express")
const path = require("path")

const productApi = require('./server/routes/product_api')
const storeApi = require("./server/routes/store_api")
const cartApi = require("./server/routes/cart_api")

const app = express()

app.use(express.static('build'))
app.use(express.urlencoded())
app.use(express.json())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

app.use('/', productApi)
app.use('/', storeApi)
app.use('/', cartApi)

const port = process.env.port || 3020
app.listen(port, () => console.log(`GroceryOptimizer server is running on port: ${port}`))

mongoose.connect("mongodb+srv://GroceryOptimizer:GroceryOptimizer@cluster0.uiyjv.mongodb.net/GroceryOptimizerTesting?retryWrites=true&w=majority")
    .then(() => console.log('Atlas was connected sucessfully'))
    .catch(() => console.log('Atlas failed to connect'))
