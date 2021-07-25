const request = require("request")

const forecast = (latitude, longitude, callback) => {

    const url = ("http://api.weatherstack.com/current?access_key=8a5d52b82c54e626337bf1fcceae513c&query="+ latitude + "," + longitude)

    request({url, json: true}, (error, {body} = {}) =>{
        const current = body.current
        if(error){
            callback("Unable to connect to weather server!")
        } else if (body.error){
            callback("Unable to find location. Try another search")
        } else {
            callback(undefined, current.weather_descriptions[0] + ". It is currently " + current.temperature + "C°. Feels like " + current.feelslike + "C°. The UV-Index is " + current.uv_index + ".")
        }
    })
}

module.exports = forecast
