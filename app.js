require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.port || 8000

const bodyParser = require('body-parser')
const cors = require('cors')
const rp = require('request-promise-native')

app.disable('x-powered-by')
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => res.send(
    {
        server: {
            name: 'API Starter Server',
            apiVersion: '0.1'
        },
        availableData: {
            topStories: {
                name: 'New York Times\' Top Stories',
                description: 'New York Times\' current top stories'
            }
        }
    }
))

app.get('/api/topStories', (req, res, next) => {
    let uri = 'https://api.nytimes.com/svc/topstories/v2/home.json'
    let qs = {
        'api-key': process.env.NYT_API_KEY
    }
    let options = {
        uri,
        qs
    }

    rp(options)
        .then(stories => {
            res.send(stories)
        })
        .catch(err => {
            if (err.response) {
                let { statusCode, body } = err.response.toJSON()
                let { message } = JSON.parse(body)
                err = {status: statusCode, message: 'NYT API Error: ' + message}
            }
            next(err)
        })
})

app.use((req, res, next) => {
    next({ status: 404, message: 'Not Found' })
})

app.use((err, req, res, next) => {
    let message = err.message || 'Something went wrong!'
    let status = err.status || 500
    res.status(status).json({ status, message })
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

module.exports = app