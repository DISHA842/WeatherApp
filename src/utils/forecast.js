const request = require('postman-request')
const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/9840fa711eb1f96e6c5713500c3192d7/${latitude},${longitude}`
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (body.error) {
            console.log('unable to find loacation', undefined)
        }
        else {
            callback(undefined, `There is currently ${body.currently.temperature} degrees, and a ${body.currently.precipProbability}% chance of rain. Is a pretty ${body.currently.summary} day TBH.`)


        }
        //console.log(response)
        // const data = JSON.parse(response.body)

    })
}

module.exports = forecast