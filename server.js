const express = require('express')

const product = require('./product')

const app = express()

const bodyParser = require('body-parser')

const db = require('./queries_product')
const dbCustomer = require('./queries_customer')
app.use(bodyParser.json())
product.init()

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log('Start server at port 3000.')
})

app.get("/vnapi/roof/brand?:brandID",db.getRoofProductByBrand)

app.get("/vnapi/roof/product?:productName",db.getRoofProductByName)

app.get("/vnapi/steel/brand?:brandID", db.getSteelProductByBrand)

app.get("/vnapi/steel/product?:productName",db.getSteelProductByName)

app.get("/vnapi/doorandsky/brand?:brandID",db.getDoorProductByBrand)

app.get("/vnapi/doorandsky/product?:productName",db.getDoorProductByName)

app.post("/vnapi/user",dbCustomer.createUser)

app.post("/vnapi/login",dbCustomer.validateLogin)


app.post("/vnapi/warranty/createwarranty",dbCustomer.createWarranty)

app.post("/vnapi/warranty/inquirywarranty",dbCustomer.inqueryWarranty)