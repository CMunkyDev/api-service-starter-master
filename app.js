require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.port || 8000
const bodyParser = require('body-parser')
const cors = require('cors')

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