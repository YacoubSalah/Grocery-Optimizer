const mongoose = require("mongoose")
const express = require("express")
const productApi = require('./routes/product_api')
const storeApi = require("./routes/store_api")

const app = express()

app.use(express.urlencoded())
app.use(express.json())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

app.use( '/' , productApi)
app.use( '/' , storeApi)

const port = 3020
app.listen(port, () => console.log(`GroceryOptimizer server is running on port: ${port}`))

mongoose.connect("mongodb+srv://GroceryOptimizer:GroceryOptimizer@cluster0.uiyjv.mongodb.net/GroceryOptimizerTesting?retryWrites=true&w=majority")
    .then(() => console.log('Atlas was connected sucessfully'))
    .catch(() => console.log('Atlas failed to connect'))
