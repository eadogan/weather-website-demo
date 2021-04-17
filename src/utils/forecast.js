const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=4fde2c3300ec4e8cf77aaef7a0cbc0cd&query='+latitude+','+longitude

    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable toconnect to weather service!')
        } else if(body.error) {
            callback('Unable to find location!')
        } else {
            const currentWeather = body.current
            callback(undefined, currentWeather.weather_descriptions[0]
                            +'. The weather is '+ currentWeather.temperature 
                            + ' degress out. It feels like '+ currentWeather.feelslike+' degress out.')
        }
    })
}

module.exports = forecast