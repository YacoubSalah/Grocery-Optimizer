const mongoose = require("mongoose")
const express = require("express")
const app = express()

app.use(express.urlencoded())
app.use(express.json())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

//for database testing change it to server api when needed
const dbTestingAPI = require('./routes/client_api')
app.use( '/' , dbTestingAPI)
//for database testing change it to server api when needed

const port = 3020
app.listen(port, () => console.log(`GroceryOptimizer server is running on port: ${port}`))

mongoose.connect("mongodb+srv://GroceryOptimizer:GroceryOptimizer@cluster0.uiyjv.mongodb.net/GroceryOptimizer?retryWrites=true&w=majority")
    .then(() => console.log('Atlas was connected sucessfully'))
    .catch(() => console.log('Atlas failed to connect'))
