const mongoose = require('mongoose')


const Schema = mongoose.Schema

const CitySchema= ({
    name: String,
    temparature: Number,
    condition: String,
    conditionPic: String,
    isSaved: Boolean
})
 
const City= mongoose.model('City', CitySchema)

module.exports= City