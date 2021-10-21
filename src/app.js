//const request = require('postman-request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express');
//const { hasSubscribers } = require('diagnostics_channel');
const app = express();
const hbs = require('hbs')

// console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPaths = path.join(__dirname, '../templates/partials')
app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPaths)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Disha'
    })
})



app.get('/about', (req, res) => {
    res.render('about', {
        title: "ABOUT",
        name: "Disha"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Disha',
        title: 'HELP',
        message: 'this is a weather app build up using node js'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Please enter valid address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }
        // console.log('Error', error)
        // console.log('Data', data)

        forecast(latitude, longitude, (error, forcastdata) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forcastData: forcastdata,
                location,
                address: req.query.address
            })

        })
    })
    // res.send({
    //     location: req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        name: 'Disha',
        title: 'help page',
        message: 'this page does not exist'
    })
})


app.get('*', (req, res) => {
    res.render('error', {
        name: 'Disha',
        title: '404 page',
        message: 'Page not found!'
    })
})


app.listen(3000, () => {
    console.log('server is on')
})