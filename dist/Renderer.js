class Renderer{

    constructor(){
        this.source = $("#cities-template").html()
        this.template = Handlebars.compile(this.source)
    }

    render(cityData){
        const cities = {cityData}
        const citiesHTML = this.template(cities)
        $('#cities-container').empty().append(citiesHTML)
    }
}


// class Renderer {

//     constructor() {
//         this.template = Handlebars.compile($('#cities-template').html())
//     }


//     render(data) {
//         const data = {data}
//         $('#cities-container').empty().append(this.template())
//     }
// }