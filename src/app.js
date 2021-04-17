const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
 
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath )

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Created by Atlantis Software'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Created by Atlantis Software'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Created by Atlantis Software'
    })
})

app.get('/products', (req, res) => {
    console.log(req.query.search)
    res.send({
        products: []
    })
}) 

app.get('/weather', (req, res) => {
    let addr = req.query.address
    if(!addr) {
        return res.send({
            error: 'You must provide an address!'
        })
    } 

    geocode(addr, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return console.log(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return console.log(error)
            }
            res.send({
                location,
                forecast: forecastData
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Opps! Page not found!',
        name: 'Created by Atlantis Software'
    })
})



app.listen(3000, () => {
    console.log('Server is running on port 3000')
})