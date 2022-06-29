const mongoose = require("mongoose")
const api = require('./routes/api')
const express = require("express")
const app = express()

app.use(express.urlencoded())
app.use(express.json())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
})


const port = 3020
app.listen(port, () => console.log(`NASA server was established and is running on port: ${port}`))
// mongoose.connect("mongodb+srv://NASA:NASA@cluster0.uiyjv.mongodb.net/NASA?retryWrites=true&w=majority")
//     .then(() => console.log('Atlas was connected sucessfully'))
//     .catch(() => console.log('Atlas failed to connect'))
