const express = require('express')
const router = express.Router()
const urllib = require('urllib')
const kelvinToCelsius = require('kelvin-to-celsius');
const City = require('../../models/City');
const { route } = require('express/lib/application');



let ourData= { cities:[]}
router.get('/sanity', (req, res) => {
  res.send('All good!')
})


// router.get('/city/:cityName', function(req,res){
// const cityName= req.params.cityName
// urllib.request(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=46adb1b3f42a639a6f82a6a45fa221b7`, function (err, data,response) {
// if(err){
//   console.log('API request error')
//   throw err
// }
// var result = JSON.parse(data)
// var Weather={
//   name: result.name,
//   temperature: result.main.temp,
//   condition: result.weather[0].description,
//   conditionPic: `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`
// }
// res.send(Weather)
// console.log(Weather)
// })})



router.get('/city/:cityName', (req, res) => {
  urllib.request(`api.openweathermap.org/data/2.5/weather?q=${req.params.cityName}&appid=484da5e921c1d538aee222ffd65ca2da`, (err, data, response) => {
    if (err) {
      console.log('API request error')
      throw err;
    }
    const weatherData = JSON.parse(data)
    const weather = {
      name: weatherData.name,
      temperature: kelvinToCelsius(weatherData.main.temp),
      condition: weatherData.weather[0].description,
      conditionPic: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
      isSaved: false
    }
    res.send(weather)
  })
})


// router.get('/cities', async (req, res) => {
//   try {
//     const cities = await City.find({})
//     res.send(cities)
//   } catch (error) {
//     res.send(error)
//   }
// })

router.get('/cities', function(req,res){
  City.find({}, function(err, cities){
    res.send(cities)
  })
})

router.post('/city', async function(req,res){
  
    const city = new City({
      name: req.body.name,
      temperature: req.body.temperature,
      condition: req.body.condition,
      conditionPic: req.body.conditionPic,
      isSaved: true
    })
    const saved = await city.save()
    res.send(saved)
  })

//   router.delete('/apocalypse', function(req, res) {
    

//     Person.find({}, function(err, people) {
//         people.forEach(p => p.remove())
//     })


//     res.end()
// })

  router.delete('/city/:cityName', function(req, res){
    const cityName = req.params.cityName
     City.find({
       name: `${cityName}`
     }, function(err, cities){}
    ).update({isSaved: false}).remove()
    res.end()
  } )

  // router.delete('/city/:cityName', async (req, res) => {
  //   const name = req.params.cityName
  //   try {
  //     const city = await City.remove({name})
  //     res.send(city)
  //   } catch (error) {
  //     res.send(error)
  //   }
  // })


// router.post('/city', async function(req, res){
//   try {
//     const city = new City({...req.body, isSaved: true}) 
//     const saved = await city.save()
//     res.send(saved)
//   } catch (error) {
//     res.send(error)
//   }
// })



module.exports = router;