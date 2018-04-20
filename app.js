require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.port || 8000

const bodyParser = require('body-parser')
const cors = require('cors')

const {availableDataSeries, seriesCallbacks} = require('./seriesObjectGenerator.js')

app.disable('x-powered-by')
app.use(cors())
app.use(bodyParser.json())

app.get(`/api/:seriesName`, availabilityCheck, retrieveSpecificSeries)

app.get('/', (req, res) => res.send(
    {
        server: {
            name: 'API Starter Server',
            apiVersion: '0.1'
        },
        availableDataSeries
    }
))


function availabilityCheck (req, res, next) {
    let seriesName = req.params.seriesName

    if (!availableDataSeries[seriesName]) return next({ status: 404, message: `series ${seriesName} not found.` })

    next()
}


function retrieveSpecificSeries (req, res, next) {
    let seriesName = req.params.seriesName

    seriesCallbacks[seriesName](req, res, next)
}


app.use((req, res, next) => {
    next({ status: 404, message: 'Not Found' })
})

app.use((err, req, res, next) => {
    let message = err.message || 'Something went wrong!'
    let status = err.status || 500
    res.status(status).json({ status, message })
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))