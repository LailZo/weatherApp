class DataManager {
   
    constructor() {
        let cityData=[]
    }

    async getDataFromDB(){
         {
        const cities= await $.get('/cities')
        this.cityData = cities
        // this.cityData.forEach(e => {console.log(e)
          
        // })
    }
  }


  async getCityData(cityName){
    const city = await $.get(`/city/${cityName}`)
    console.log(city)
    this.cityData.push(city)
    this.cityData.forEach(e => {console.log(e) 
    })
  }

  // async saveCity(cityName){
  //  const city= await $.post(`/city/:${cityName}`)
  //  this.cityData.push(city)
  // }

  async saveCity(cityName){
    const city = await this.cityData.find(c => c.name == cityName)
    
    $.post(`/city`, city)
}


  async removeCity(city){
    await $.delete(`/city/:${city}`)
    this.cityData.splice(0,1)
  }

  

}