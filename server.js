var bodyParser = require('body-parser')
var express = require('express')
const api = require('./server/routes/api')
const path = require('path')
var app = express()
var request = require('request')
var mongoose = require('mongoose')
var City = require("./models/City")
mongoose.connect("mongodb://localhost/WeatherApp")


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'));


app.use('/', api)

app.listen(3000, function() {
    console.log("Server up and running on port 3000")
  })
  
  
